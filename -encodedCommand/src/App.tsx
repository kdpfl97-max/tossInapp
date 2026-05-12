import { useEffect, useState } from "react";

import GamePage from "./component/gamePage/tsx/gamePage.tsx";
import LoginPage from "./component/loginPage/tsx/loginPage.tsx";
import ResultPage from "./component/mainPage/tsx/resultPage.tsx";
import StartPage from "./component/startPage/tsx/startPage.tsx";
import { getAccountStorageKey } from "./lib/persist";
import { getPoints, addPoints } from "./lib/pointApi";

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

      // 포인트 조회 API
      const pointResult = await getPoints();
      setPoints(pointResult.balance);

      // 최고점수는 localStorage에서 가져오기
      const savedBest = Number(localStorage.getItem(`lucky-catch:bestScore:${key}`) ?? 0);
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
          onFinish={async (tapCount) => {
            setLastTapCount(tapCount);
            const isNewBest = tapCount > bestScore;
            const earnedPointsThisGame = 1 + (isNewBest ? 3 : 0);
            setLastEarnedPoints(earnedPointsThisGame);
            setLastIsNewBest(isNewBest);

            // 포인트 적립 API 호출
            const result = await addPoints(earnedPointsThisGame);
            setPoints(result.balance);

            // 최고점수 갱신
            if (isNewBest && accountKey) {
              setBestScore(tapCount);
              localStorage.setItem(`lucky-catch:bestScore:${accountKey}`, String(tapCount));
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
