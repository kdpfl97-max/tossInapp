import { Top, Button } from "@toss/tds-mobile";
import '../scss/startPage.scss'

interface StartPageProps {
    onStart?: () => void;
}

function StartPage({ onStart }: StartPageProps) {
    return (
        <div className="sp-container">
            {/* Navigation Bar */}
            <div className="sp-navbar">
                <button className="sp-nav-btn sp-nav-btn--back">‹</button>
                <div className="sp-nav-title">
                    <span>🐱</span>
                    <span>굳디팡팡 고양이</span>
                </div>
                <div className="sp-nav-actions">
                    <button className="sp-nav-btn">♥</button>
                    <button className="sp-nav-btn">···</button>
                    <button className="sp-nav-btn">✕</button>
                </div>
            </div>

            {/* Title */}
            <Top
                upperGap={16}
                lowerGap={16}
                title={<Top.TitleParagraph size={22}>고양이가 궁디팡팡을{"\n"}기달리고 있어요</Top.TitleParagraph>}
            />

            {/* Cat Image */}
            <img
                className="sp-img"
                src="https://deus.toss.im/projects/10656/pages/IU2JO7zu@1?node=5CAJfuqA%401"
                alt="고양이"
            />

            {/* Stats Row */}
            <div className="sp-stats">
                <div className="sp-stat-item">
                    <span className="sp-stat-icon">❤️</span>
                    <div className="sp-stat-content">
                        <span className="sp-stat-label">점수</span>
                        <span className="sp-stat-value">1230</span>
                    </div>
                </div>
                <div className="sp-stat-divider" />
                <div className="sp-stat-item">
                    <span className="sp-stat-icon sp-stat-icon--point">P</span>
                    <div className="sp-stat-content">
                        <span className="sp-stat-value">120</span>
                    </div>
                </div>
                <div className="sp-stat-divider" />
                <div className="sp-stat-item">
                    <div className="sp-avatar" />
                    <div className="sp-stat-content">
                        <span className="sp-stat-label">최고 점수</span>
                        <span className="sp-stat-value">200</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="sp-context-box">
                <p className="sp-subtitle">빠르게 눌러서 최고 점수에 도전해요</p>
                <p className="sp-context">
                    최대한 빠르게 궁디팡팡 해주세요! 신기록을 세울수록 포인트를 더 받을 수 있어요.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="sp-action-btns">
                <button className="sp-action-btn">
                    <span className="sp-action-icon">✉️</span>
                    <span>친구에게 공유</span>
                </button>
                <button className="sp-action-btn sp-action-btn--toss">
                    <span className="sp-action-icon">💙</span>
                    <span>토스 포인트 환전</span>
                </button>
            </div>

            {/* Start Button */}
            <div className="sp-btn-box">
                <Button className="startButton" onClick={onStart}>시작하기</Button>
            </div>
        </div>
    );
}

export default StartPage;
