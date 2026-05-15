import { Button, Top } from "@toss/tds-mobile";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styleSheet/gamePage.styles";
import startCatImage from "../../../img/startCat.png";
import happyCatImage from "../../../img/happyCat.png";
import goodCatImage from "../../../img/goodCat.png";

interface GamePageProps {
  onClose?: () => void;
  onFinish?: (tapCount: number) => void;
}

const GAME_DURATION_MS = 5000;

export default function GamePage({ onClose, onFinish }: GamePageProps) {
  const [status, setStatus] = useState<"ready" | "playing" | "finished">("ready");
  const [tapCount, setTapCount] = useState(0);
  const [remainingMs, setRemainingMs] = useState(GAME_DURATION_MS);
  const [tapped, setTapped] = useState(false);

  const tapCountRef = useRef(0);
  const endAtRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusRef = useRef<"ready" | "playing" | "finished">("ready");

  const remainingSeconds = useMemo(() => Math.ceil(remainingMs / 1000), [remainingMs]);

  const stopLoop = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startGame = useCallback((initialTapCount: number) => {
    stopLoop();
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);

    tapCountRef.current = initialTapCount;
    setTapCount(initialTapCount);
    setRemainingMs(GAME_DURATION_MS);
    setStatus("playing");
    statusRef.current = "playing";
    endAtRef.current = Date.now() + GAME_DURATION_MS;

    const loop = () => {
      const endAt = endAtRef.current;
      if (endAt == null) return;
      const msLeft = Math.max(0, endAt - Date.now());
      setRemainingMs(msLeft);
      if (msLeft <= 0) {
        setStatus("finished");
        statusRef.current = "finished";
        stopLoop();
        finishTimeoutRef.current = setTimeout(() => {
          onFinish?.(tapCountRef.current);
        }, 600);
        return;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
  }, [stopLoop, onFinish]);

  useEffect(() => {
    return () => {
      stopLoop();
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [stopLoop]);

  const handleTap = useCallback(() => {
    if (statusRef.current === "finished") return;

    // 탭 애니메이션 효과
    setTapped(true);
    setTimeout(() => setTapped(false), 100);

    if (statusRef.current === "ready") {
      startGame(1);
      return;
    }
    tapCountRef.current += 1;
    setTapCount(tapCountRef.current);
  }, [startGame]);

  const catImage = status === "ready" ? startCatImage : status === "playing" ? happyCatImage : goodCatImage;

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
          activeOpacity={1}
          style={styles.catButton}
        >
          <Image
            source={catImage}
            style={[styles.catImage, tapped && styles.catImageTapped]}
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
