import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import GamePage from "./component/gamePage/tsx/gamePage.tsx";
import LoginPage from "./component/loginPage/tsx/loginPage.tsx";
import ResultPage from "./component/mainPage/tsx/resultPage.tsx";
import StartPage from "./component/startPage/tsx/startPage.tsx";
import { getAccountStorageKey } from "./lib/persist";
import { addPoints, getPoints } from "./lib/pointApi";

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

      const pointResult = await getPoints();
      setPoints(pointResult.balance);

      const savedBest = await AsyncStorage.getItem(`lucky-catch:bestScore:${key}`);
      setBestScore(Number(savedBest ?? 0));
    })();
  }, []);

  return (
    <View style={styles.root}>
      {screen === "start" ? (
        <StartPage onStart={() => setScreen("login")} />
      ) : screen === "login" ? (
        <LoginPage
          onAgree={() => setScreen("game")}
          onClose={() => setScreen("start")}  // 다음에 버튼 → start 페이지로
        />
      ) : screen === "game" ? (
        <GamePage
          onClose={() => setScreen("start")}
          onFinish={async (tapCount) => {
            setLastTapCount(tapCount);
            const isNewBest = tapCount > bestScore;
            const earnedPointsThisGame = 1 + (isNewBest ? 3 : 0);
            setLastEarnedPoints(earnedPointsThisGame);
            setLastIsNewBest(isNewBest);

            const result = await addPoints(earnedPointsThisGame);
            setPoints(result.balance);

            if (isNewBest && accountKey) {
              setBestScore(tapCount);
              await AsyncStorage.setItem(`lucky-catch:bestScore:${accountKey}`, String(tapCount));
            }

            setScreen("result");
          }}
        />
      ) : (
        <ResultPage
          tapCount={lastTapCount}
          points={points}
          bestScore={bestScore}
          earnedPoints={lastEarnedPoints}
          isNewBest={lastIsNewBest}
          onClose={() => setScreen("start")}
          onRestart={() => setScreen("game")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});

export default App;
