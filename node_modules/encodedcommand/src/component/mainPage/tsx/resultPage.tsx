import { Button, Toast, useToast } from "@toss/tds-mobile";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styleSheet/resultPage.styles";
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
  tapCount, points, bestScore, earnedPoints, isNewBest, onRestart, onClose,
}: ResultPageProps) {
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNewBest) {
        toast.openToast("최고점수 달성기념 3포인트", { icon: "🏆" });
      } else {
        toast.openToast(`${earnedPoints}포인트 받았어요.`, { icon: "P" });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 토스트 */}
      <Toast />

      {/* 네비게이션 바 */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn} onPress={onClose}>
          <Text style={styles.navBtnText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.navCenter}>
          <Image
            source={{ uri: "https://static.toss.im/appsintoss/40719/e4bb596d-724a-4eac-a233-7dd810da4adc.png" }}
            style={styles.appIcon}
          />
          <Text style={styles.appTitle}>궁디팡팡 고양이</Text>
        </View>
        <View style={styles.navActions}>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>♥</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>···</Text></TouchableOpacity>
          <View style={styles.navDivider} />
          <TouchableOpacity style={styles.navBtn} onPress={onClose}>
            <Text style={styles.navBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 타이틀 */}
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>{`5초 동안\n${tapCount}번 터치했어요`}</Text>
      </View>

      {/* 이미지 + 오버레이 */}
      <View style={styles.content}>
        <View style={styles.frame}>
          <Image
            source={doneCatImage}
            style={styles.doneCat}
            resizeMode="contain"
            // @ts-ignore
            className="scale-bounce-cat"
          />
        </View>

        {/* 하단 점수 칩 */}
        <View style={styles.chip}>
          <View style={styles.chipItem}>
            <Text style={styles.chipIcon}>❤️</Text>
            <Text style={styles.chipLabel}>점수</Text>
            <Text style={styles.chipValue}>{tapCount}</Text>
          </View>
          <View style={styles.chipDivider} />
          <View style={styles.chipItem}>
            <Text style={styles.chipIconPoint}>P</Text>
            <Text style={styles.chipValue}>{points}</Text>
          </View>
          <View style={styles.chipDivider} />
          <View style={styles.chipItem}>
            <Image
              source={{ uri: "https://static.toss.im/illusts/img-profile-01.png" }}
              style={styles.chipAvatar}
            />
            <Text style={styles.chipLabel}>최고 점수</Text>
            <Text style={styles.chipValue}>{bestScore}</Text>
          </View>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottom}>
        <Button onClick={onRestart}>한번 더?</Button>
      </View>
    </View>
  );
}
