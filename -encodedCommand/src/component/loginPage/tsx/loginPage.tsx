import { Button } from "@toss/tds-mobile";
import '../scss/loginPage.scss';
import { useState } from "react";
import cashCatImage from "../../../img/cashCat.png";
import { loginWithToss, saveAuthToken } from "../../../lib/authApi";

interface LoginPageProps {
    onNext?: () => void;
    onAgree?: () => void;
}

function LoginPage({ onNext, onAgree }: LoginPageProps) {
    const [showConsent, setShowConsent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNext = () => {
        setShowConsent(true);
        onNext?.();
    };

    const handleAgree = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await loginWithToss();
            saveAuthToken(result);
            onAgree?.();
            console.log(sessionStorage);
        } catch (e) {
            setError("로그인에 실패했어요. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="lp-container">
            {/* 상단 벨 아이콘 */}
            <div className="lp-bell">🔔</div>

            {/* 타이틀 텍스트 */}
            <div className="lp-title-box">
                <p className="lp-subtitle">궁팡하고 포인트를 쌓아봐요</p>
                <p className="lp-title">궁디팡팡 고양이에서{"\n"}토스로 로그인할까요?</p>
            </div>

            {/* 고양이 이미지 */}
            <img
                className="lp-img"
                src={cashCatImage}
                alt="고양이"
            />

            {/* 다음 버튼 */}
            <div className="lp-btn-box">
                <Button className="lp-next-btn" onClick={handleNext}>다음</Button>
            </div>

            {/* 동의 바텀시트 */}
            {showConsent && (
                <>
                    <div className="lp-overlay" onClick={() => setShowConsent(false)} />
                    <div className="lp-bottomsheet">
                        <div className="lp-sheet-content">
                            <p className="lp-sheet-title">
                                궁디팡팡 고양이 로그인을 위해{"\n"}꼭 필요한 동의만 추렸어요
                            </p>

                            <div className="lp-consent-group">
                                <p className="lp-group-label">[서비스 이름] 동의항목</p>
                                <div className="lp-consent-item">
                                    <span className="lp-check">✓</span>
                                    <span className="lp-consent-text">동의항목은 콘솔에서 수정할 수 있어요</span>
                                    <span className="lp-arrow">›</span>
                                </div>
                                <div className="lp-consent-item">
                                    <span className="lp-check">✓</span>
                                    <span className="lp-consent-text">이 화면은 확인용으로만 사용해주세요</span>
                                    <span className="lp-arrow">›</span>
                                </div>
                            </div>

                            <div className="lp-consent-group">
                                <p className="lp-group-label">토스 동의항목</p>
                                <div className="lp-consent-item">
                                    <span className="lp-check">✓</span>
                                    <span className="lp-consent-text">[필수] 개인정보 제3자 정보 제공</span>
                                    <span className="lp-arrow">›</span>
                                </div>
                                <div className="lp-consent-item">
                                    <span className="lp-check">✓</span>
                                    <span className="lp-consent-text">[선택] 선택 제공 항목</span>
                                    <span className="lp-arrow">›</span>
                                </div>
                            </div>

                            {error && (
                                <p className="lp-error">{error}</p>
                            )}
                        </div>

                        <div className="lp-sheet-btn-box">
                            <Button
                                className="lp-agree-btn"
                                onClick={handleAgree}
                                disabled={isLoading}
                            >
                                {isLoading ? "로그인 중..." : "동의하고 시작하기"}
                            </Button>
                            <button className="lp-later-btn" onClick={() => setShowConsent(false)}>
                                다음에
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default LoginPage;
