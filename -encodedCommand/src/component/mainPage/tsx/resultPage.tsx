import { Button, Top } from "@toss/tds-mobile";
import { useEffect, useRef } from "react";
import "../scss/resultPage.scss";
import doneCatImage from "../../../img/doneCat.png";

interface ResultPageProps {
  tapCount: number;
  points: number;
  bestScore: number;
  earnedPoints: number;
  isNewBest: boolean;
  onRestart?: () => void;
  onClose?: () => void;
}

export default function ResultPage({
                                     tapCount,
                                     points,
                                     bestScore,
                                     earnedPoints,
                                     isNewBest,
                                     onRestart,
                                     onClose,
                                   }: ResultPageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.className = `rp-point-toast ${isNewBest ? "rp-point-toast--best" : ""}`;
    el.textContent = isNewBest ? "최고점수 달성기념 3포인트" : `${earnedPoints}포인트 받았어요.`;
    document.body.appendChild(el);

    const t = window.setTimeout(() => {
      el.classList.add("rp-point-toast--hide");
      window.setTimeout(() => el.remove(), 220);
    }, 1500);

    return () => {
      window.clearTimeout(t);
      el.remove();
    };
  }, [earnedPoints, isNewBest]);

  return (
      <div className="rp-container">
        <div className="rp-navbar">
          <button className="rp-nav-btn rp-nav-btn--back" aria-label="뒤로가기" onClick={onClose}>
            ‹
          </button>

          <div className="rp-nav-center">
            <img
                className="rp-app-icon"
                src="https://static.toss.im/appsintoss/40719/e4bb596d-724a-4eac-a233-7dd810da4adc.png"
                alt=""
            />
            <span className="rp-app-title">궁디팡팡 고양이</span>
          </div>

          <div className="rp-nav-actions" aria-label="상단 메뉴">
            <button className="rp-nav-btn" aria-label="좋아요">♥</button>
            <button className="rp-nav-btn" aria-label="더보기">···</button>
            <div className="rp-nav-divider" aria-hidden="true" />
            <button className="rp-nav-btn" aria-label="닫기" onClick={onClose}>✕</button>
          </div>
        </div>

        <main className="rp-content">
          <Top
              upperGap={16}
              lowerGap={8}
              title={
                <Top.TitleParagraph size={22}>
                  {`5초 동안\n${tapCount}번 터치했어요`}
                </Top.TitleParagraph>
              }
          />

          <div className="rp-frame" ref={ref}>
            <div className="rp-frame-inner">
              <img className="rp-done-cat" src={doneCatImage} alt="완료 고양이" />
            </div>
          </div>

          <div className="rp-spacer" aria-hidden="true" />

          <div className="rp-chip">
            <div className="rp-chip-item">
              <div className="rp-chip-left">
                <span className="rp-chip-icon">❤️</span>
                <span className="rp-chip-label">점수</span>
                <span className="rp-chip-reddot" aria-label="새 업데이트 있음" />
              </div>
              <div className="rp-chip-right">{tapCount}</div>
            </div>

            <div className="rp-chip-divider" aria-hidden="true" />

            <div className="rp-chip-item rp-chip-item--compact">
              <div className="rp-chip-left">
                <span className="rp-chip-icon rp-chip-icon--point">P</span>
              </div>
              <div className="rp-chip-right">{points}</div>
            </div>

            <div className="rp-chip-divider" aria-hidden="true" />

            <div className="rp-chip-item">
              <div className="rp-chip-left">
                <img
                    className="rp-chip-avatar"
                    src="https://static.toss.im/illusts/img-profile-01.png"
                    alt=""
                />
                <span className="rp-chip-label">최고 점수</span>
              </div>
              <div className="rp-chip-right">{bestScore}</div>
            </div>
          </div>
        </main>

        <div className="rp-bottom">
          <Button className="rp-primary" onClick={onRestart}>
            한번 더?
          </Button>
        </div>
      </div>
  );
}