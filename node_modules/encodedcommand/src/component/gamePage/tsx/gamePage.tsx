import { Button, Top } from "@toss/tds-mobile";
import { useEffect, useMemo, useRef, useState } from "react";

import "../scss/gamePage.scss";
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
  const [isTapping, setIsTapping] = useState(false);

  const tapCountRef = useRef(0);
  const endAtRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<number | null>(null);
  const tappingTimeoutRef = useRef<number | null>(null);

  const remainingSeconds = useMemo(() => Math.ceil(remainingMs / 1000), [remainingMs]);

  const stopLoop = () => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  const cleanupFinishTimeout = () => {
    if (finishTimeoutRef.current != null) {
      window.clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }
  };

  const cleanupTappingTimeout = () => {
    if (tappingTimeoutRef.current != null) {
      window.clearTimeout(tappingTimeoutRef.current);
      tappingTimeoutRef.current = null;
    }
  };

  const triggerTapEffect = () => {
    setIsTapping(false);
    cleanupTappingTimeout();

    // 다음 프레임에 true로 올려서 animation이 항상 재실행되게 함
    requestAnimationFrame(() => {
      setIsTapping(true);
      tappingTimeoutRef.current = window.setTimeout(() => {
        setIsTapping(false);
        tappingTimeoutRef.current = null;
      }, 140);
    });
  };

  const startGame = (initialTapCount: number) => {
    stopLoop();
    cleanupFinishTimeout();
    cleanupTappingTimeout();
    setTapCount(initialTapCount);
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
        cleanupFinishTimeout();
        // goodCat가 잠깐 보이도록 아주 짧게 전환 딜레이
        finishTimeoutRef.current = window.setTimeout(() => {
          onFinish?.(tapCountRef.current);
        }, 900);
        return;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    tapCountRef.current = tapCount;
  }, [tapCount]);

  const handleTap = () => {
    if (status === "ready") {
      // 첫 터치로 게임 시작 + happyCat 전환
      setStatus("playing");
      startGame(1);
      triggerTapEffect();
      return;
    }
    if (status !== "playing") return;
    setTapCount((prev) => prev + 1);
    triggerTapEffect();
  };

  useEffect(() => {
    // 대기 화면 → 첫 터치로 시작
    return () => {
      stopLoop();
      cleanupFinishTimeout();
      cleanupTappingTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catImageSrc =
    status === "ready" ? startCatImage : status === "playing" ? happyCatImage : goodCatImage;
  const isHappyCatFlipped =
    status === "playing" && Math.floor(tapCount / 8) % 2 === 1;

  return (
    <div className="gp-container">
      <div className="gp-navbar">
        <button className="gp-nav-btn gp-nav-btn--back" aria-label="뒤로가기" onClick={onClose}>
          ‹
        </button>
        <div className="gp-nav-title">
          <span>🐱</span>
          <span>궁디팡팡 고양이</span>
        </div>
        <div className="gp-nav-actions">
          <button className="gp-nav-btn" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <main className="gp-content">
        <Top
          upperGap={16}
          lowerGap={8}
          title={
            <Top.TitleParagraph size={22}>
              {status === "ready"
                ? "고양이를 터치하면\n게임이 시작돼요"
                : status === "finished"
                  ? "끝! 결과로 이동 중…"
                  : `5초 동안 최대한 많이\n터치해봐요`}
            </Top.TitleParagraph>
          }
        />

        <div className="gp-stats">
          <div className="gp-stat">
            <div className="gp-stat-label">남은 시간</div>
            <div className="gp-stat-value">{status === "ready" ? "-" : `${remainingSeconds}s`}</div>
          </div>
          <div className="gp-stat-divider" aria-hidden="true" />
          <div className="gp-stat">
            <div className="gp-stat-label">터치 횟수</div>
            <div className="gp-stat-value">{tapCount}</div>
          </div>
        </div>

        <button
          type="button"
          className={`gp-cat-button ${isTapping ? "gp-cat-button--tapping" : ""}`}
          onClick={handleTap}
          aria-label="고양이 터치"
          disabled={status === "finished"}
        >
          <img
            className={`gp-cat-image ${isHappyCatFlipped ? "gp-cat-image--flipped" : ""}`}
            src={catImageSrc}
            alt="고양이"
          />
          {status === "finished" && <div className="gp-cat-overlay" />}
        </button>
      </main>

      <div className="gp-bottom">
        {status === "finished" ? (
          <Button className="gp-primary" onClick={onClose}>
            닫기
          </Button>
        ) : status === "ready" ? (
          <Button className="gp-primary" onClick={() => startGame(0)}>
            바로 시작하기
          </Button>
        ) : (
          <Button className="gp-primary" onClick={onClose}>
            그만하기
          </Button>
        )}
      </div>
    </div>
  );
}

