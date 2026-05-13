import { Button } from "@toss/tds-mobile";
import { useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { runTossAuth } from "../../../lib/tossAuth";
import { styles } from "../styleSheet/loginPage.styles";

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
      const result = await runTossAuth();
      if (result.success) {
        onAgree?.();
      } else {
        setError("인증에 실패했어요. 다시 시도해주세요.");
      }
    } catch (e: any) {
      setError(e?.message || "인증 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bell}>🔔</Text>

      <View style={styles.titleBox}>
        <Text style={styles.subtitle}>궁팡하고 포인트를 쌓아봐요</Text>
        <Text style={styles.title}>{"궁디팡팡 고양이에서\n토스로 로그인할까요?"}</Text>
      </View>

      <Image
        source={require("../../../img/cashCat.png")}
        style={styles.img}
        resizeMode="contain"
      />

      <View style={styles.btnBox}>
        <Button onClick={handleNext}>다음</Button>
      </View>

      <Modal visible={showConsent} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setShowConsent(false)} activeOpacity={1} />
        <View style={styles.bottomsheet}>
          <ScrollView style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>{"궁디팡팡 고양이 로그인을 위해\n꼭 필요한 동의만 추렸어요"}</Text>

            <Text style={styles.groupLabel}>[서비스 이름] 동의항목</Text>
            <ConsentItem text="동의항목은 콘솔에서 수정할 수 있어요" />
            <ConsentItem text="이 화면은 확인용으로만 사용해주세요" />

            <Text style={styles.groupLabel}>토스 동의항목</Text>
            <ConsentItem text="[필수] 개인정보 제3자 정보 제공" />
            <ConsentItem text="[선택] 선택 제공 항목" />

            {error && <Text style={styles.error}>{error}</Text>}
          </ScrollView>

          <View style={styles.sheetBtnBox}>
            <Button onClick={handleAgree} disabled={isLoading}>
              {isLoading ? "인증 중..." : "동의하고 시작하기"}
            </Button>
            <TouchableOpacity onPress={() => setShowConsent(false)} style={styles.laterBtn}>
              <Text style={styles.laterBtnText}>다음에</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ConsentItem({ text }: { text: string }) {
  return (
    <View style={styles.consentItem}>
      <Text style={styles.check}>✓</Text>
      <Text style={styles.consentText}>{text}</Text>
      <Text style={styles.arrow}>›</Text>
    </View>
  );
}

export default LoginPage;
