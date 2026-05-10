
import { useEffect, useState } from "react";

import GamePage from "./component/gamePage/tsx/gamePage.tsx";
import LoginPage from "./component/loginPage/tsx/loginPage.tsx";
import ResultPage from "./component/mainPage/tsx/resultPage.tsx";
import StartPage from "./component/startPage/tsx/startPage.tsx";
import { getAccountStorageKey, persistGetNumber, persistSetNumber } from "./lib/persist";

function App() {
  const [screen, setScreen] = useState<"start" | "login" | "game" | "result">("start");
  const [lastTapCount, setLastTapCount] = useState(0);
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0);
  const [lastIsNewBest, setLastIsNewBest] = useState(false);
  const [accountKey, setAccountKey] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    (async () => {
      const key = await getAccountStorageKey();
      setAccountKey(key);

      const savedPoints = (await persistGetNumber(`lucky-catch:points:${key}`)) ?? 0;
      const savedBest = (await persistGetNumber(`lucky-catch:bestScore:${key}`)) ?? 0;
      setPoints(savedPoints);
      setBestScore(savedBest);
    })();
  }, []);

  return (
    <>
      {screen === "start" ? (
        <StartPage onStart={() => setScreen("login")} />
      ) : screen === "game" ? (
        <GamePage
          onClose={() => setScreen("start")}
          onFinish={(tapCount) => {
            setLastTapCount(tapCount);
            const isNewBest = tapCount > bestScore;
            const earnedPointsThisGame = 1 + (isNewBest ? 3 : 0);
            setLastEarnedPoints(earnedPointsThisGame);
            setLastIsNewBest(isNewBest);
            if (accountKey) {
              // 게임 1회당 +1 포인트 적립
              const nextPoints = points + 1;
              setPoints(nextPoints);
              void persistSetNumber(`lucky-catch:points:${accountKey}`, nextPoints);

              // 최고 점수 갱신 시 추가 +3 포인트
              if (isNewBest) {
                const nextBest = tapCount;
                setBestScore(nextBest);
                void persistSetNumber(`lucky-catch:bestScore:${accountKey}`, nextBest);

                const bonusPoints = nextPoints + 3;
                setPoints(bonusPoints);
                void persistSetNumber(`lucky-catch:points:${accountKey}`, bonusPoints);
              }
            }
            setScreen("result");
          }}
        />
      ) : screen === "result" ? (
        <ResultPage
          tapCount={lastTapCount}
          points={points}
          bestScore={bestScore}
          earnedPoints={lastEarnedPoints}
          isNewBest={lastIsNewBest}
          onClose={() => setScreen("start")}
          onRestart={() => setScreen("game")}
        />
      ) : (
        <LoginPage
          onAgree={() => {
            setScreen("game");
          }}
        />
      )}
    </>
  );
}

export default App;
