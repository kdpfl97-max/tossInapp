import { Button, Top } from "@toss/tds-mobile";
import { useEffect, useRef } from "react";
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1, tension: 50, friction: 7, useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
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

      <ScrollView style={styles.content}>
        <Top
          upperGap={16}
          lowerGap={8}
          title={
            <Top.TitleParagraph size={22}>
              {`5초 동안\n${tapCount}번 터치했어요`}
            </Top.TitleParagraph>
          }
        />

        <Animated.View style={[styles.frame, { transform: [{ scale: scaleAnim }] }]}>
          <Image
            source={doneCatImage}
            style={styles.doneCat}
            resizeMode="contain"
          />
        </Animated.View>

        {isNewBest && (
          <View style={styles.toastBest}>
            <Text style={styles.toastText}>최고점수 달성기념 3포인트</Text>
          </View>
        )}

        <View style={styles.chip}>
          <View style={styles.chipItem}>
            <View style={styles.chipLeft}>
              <Text style={styles.chipIcon}>❤️</Text>
              <Text style={styles.chipLabel}>점수</Text>
            </View>
            <Text style={styles.chipValue}>{tapCount}</Text>
          </View>
          <View style={styles.chipDivider} />
          <View style={styles.chipItem}>
            <View style={styles.chipLeft}>
              <Text style={styles.chipIconPoint}>P</Text>
              <Text style={styles.chipLabel}>포인트</Text>
            </View>
            <Text style={styles.chipValue}>{points}</Text>
          </View>
          <View style={styles.chipDivider} />
          <View style={styles.chipItem}>
            <View style={styles.chipLeft}>
              <Image
                source={{ uri: "https://static.toss.im/illusts/img-profile-01.png" }}
                style={styles.chipAvatar}
              />
              <Text style={styles.chipLabel}>최고 점수</Text>
            </View>
            <Text style={styles.chipValue}>{bestScore}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Button onClick={onRestart}>한번 더?</Button>
      </View>
    </View>
  );
}
