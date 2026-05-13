import { Button, Top } from "@toss/tds-mobile";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styleSheet/gamePage.styles";

interface GamePageProps {
  onClose?: () => void;
  onFinish?: (tapCount: number) => void;
}

const GAME_DURATION_MS = 5000;

export default function GamePage({ onClose, onFinish }: GamePageProps) {
  const [status, setStatus] = useState<"ready" | "playing" | "finished">("ready");
  const [tapCount, setTapCount] = useState(0);
  const [remainingMs, setRemainingMs] = useState(GAME_DURATION_MS);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const tapCountRef = useRef(0);
  const endAtRef = useRef<number | null>(null);
  const rafIdRef = useRef<any>(null);
  const finishTimeoutRef = useRef<any>(null);

  const remainingSeconds = useMemo(() => Math.ceil(remainingMs / 1000), [remainingMs]);

  const stopLoop = () => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  const triggerTapEffect = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 70, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start();
  };

  const startGame = (initialTapCount: number) => {
    stopLoop();
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    setTapCount(initialTapCount);
    tapCountRef.current = initialTapCount;
    setRemainingMs(GAME_DURATION_MS);
    setStatus("playing");
    endAtRef.current = Date.now() + GAME_DURATION_MS;

    const loop = () => {
      const endAt = endAtRef.current;
      if (endAt == null) return;
      const msLeft = Math.max(0, endAt - Date.now());
      setRemainingMs(msLeft);
      if (msLeft <= 0) {
        setStatus("finished");
        stopLoop();
        finishTimeoutRef.current = setTimeout(() => {
          onFinish?.(tapCountRef.current);
        }, 900);
        return;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => { tapCountRef.current = tapCount; }, [tapCount]);

  useEffect(() => {
    return () => {
      stopLoop();
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, []);

  const handleTap = () => {
    if (status === "ready") { startGame(1); triggerTapEffect(); return; }
    if (status !== "playing") return;
    setTapCount((prev) => prev + 1);
    triggerTapEffect();
  };

  const catImage =
    status === "ready"
      ? require("../../../img/startCat.png")
      : status === "playing"
        ? require("../../../img/happyCat.png")
        : require("../../../img/goodCat.png");

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn} onPress={onClose}>
          <Text style={styles.navBtnText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.navTitle}>
          <Text>🐱</Text>
          <Text style={styles.navTitleText}>궁디팡팡 고양이</Text>
        </View>
        <TouchableOpacity style={styles.navBtn} onPress={onClose}>
          <Text style={styles.navBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Top
          upperGap={16}
          lowerGap={8}
          title={
            <Top.TitleParagraph size={22}>
              {status === "ready"
                ? "고양이를 터치하면\n게임이 시작돼요"
                : status === "finished"
                  ? "끝! 결과로 이동 중…"
                  : "5초 동안 최대한 많이\n터치해봐요"}
            </Top.TitleParagraph>
          }
        />

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>남은 시간</Text>
            <Text style={styles.statValue}>{status === "ready" ? "-" : `${remainingSeconds}s`}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statLabel}>터치 횟수</Text>
            <Text style={styles.statValue}>{tapCount}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleTap}
          disabled={status === "finished"}
          activeOpacity={0.9}
          style={styles.catButton}
        >
          <Animated.Image
            source={catImage}
            style={[styles.catImage, { transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        {status === "finished" ? (
          <Button onClick={onClose}>닫기</Button>
        ) : status === "ready" ? (
          <Button onClick={() => startGame(0)}>바로 시작하기</Button>
        ) : (
          <Button onClick={onClose}>그만하기</Button>
        )}
      </View>
    </View>
  );
}
