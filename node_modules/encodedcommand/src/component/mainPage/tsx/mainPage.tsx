import { Top, Button } from "@toss/tds-mobile";
import '../scss/mainPage.scss'

interface MainPageProps {
    onStart?: () => void;
}

function MainPage({ onStart }: MainPageProps) {
    return (
        <div className="mp-container">
            <div className="mp-navbar">
                <button className="mp-nav-btn mp-nav-btn--back">‹</button>
                <div className="mp-nav-title">
                    <span>🐱</span>
                    <span>굳디팡팡 고양이</span>
                </div>
                <div className="mp-nav-actions">
                    <button className="mp-nav-btn">♥</button>
                    <button className="mp-nav-btn">···</button>
                    <button className="mp-nav-btn">✕</button>
                </div>
            </div>

            <Top
                upperGap={16}
                lowerGap={16}
                title={<Top.TitleParagraph size={22}>고양이가 궁디팡팡을{"\n"}기달리고 있어요</Top.TitleParagraph>}
            />

            <img
                className="mp-img"
                src="https://deus.toss.im/projects/10656/pages/IU2JO7zu@1?node=5CAJfuqA%401"
                alt="고양이"
            />

            <div className="mp-stats">
                <div className="mp-stat-item">
                    <span className="mp-stat-icon">❤️</span>
                    <div className="mp-stat-content">
                        <span className="mp-stat-label">점수</span>
                        <span className="mp-stat-value">1230</span>
                    </div>
                </div>
                <div className="mp-stat-divider" />
                <div className="mp-stat-item">
                    <span className="mp-stat-icon mp-stat-icon--point">P</span>
                    <div className="mp-stat-content">
                        <span className="mp-stat-value">120</span>
                    </div>
                </div>
                <div className="mp-stat-divider" />
                <div className="mp-stat-item">
                    <div className="mp-avatar" />
                    <div className="mp-stat-content">
                        <span className="mp-stat-label">최고 점수</span>
                        <span className="mp-stat-value">200</span>
                    </div>
                </div>
            </div>

            <div className="mp-context-box">
                <p className="mp-subtitle">빠르게 눌러서 최고 점수에 도전해요</p>
                <p className="mp-context">
                    최대한 빠르게 궁디팡팡 해주세요! 신기록을 세울수록 포인트를 더 받을 수 있어요.
                </p>
            </div>

            <div className="mp-action-btns">
                <button className="mp-action-btn">
                    <span className="mp-action-icon">✉️</span>
                    <span>친구에게 공유</span>
                </button>
                <button className="mp-action-btn mp-action-btn--toss">
                    <span className="mp-action-icon">💙</span>
                    <span>토스 포인트 환전</span>
                </button>
            </div>

            <div className="mp-btn-box">
                <Button className="startButton" onClick={onStart}>시작하기</Button>
            </div>
        </div>
    );
}

export default MainPage;
