import { Button, Top } from "@toss/tds-mobile";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styleSheet/mainPage.styles";

interface MainPageProps {
  onStart?: () => void;
}

function MainPage({ onStart }: MainPageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>‹</Text></TouchableOpacity>
        <View style={styles.navTitle}>
          <Text>🐱</Text>
          <Text style={styles.navTitleText}>궁디팡팡 고양이</Text>
        </View>
        <View style={styles.navActions}>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>♥</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>···</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>✕</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Top
          upperGap={16}
          lowerGap={16}
          title={
            <Top.TitleParagraph size={22}>
              {"고양이가 궁디팡팡을\n기달리고 있어요"}
            </Top.TitleParagraph>
          }
        />

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>❤️</Text>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>점수</Text>
              <Text style={styles.statValue}>1230</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIconPoint}>P</Text>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>120</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.avatar} />
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>최고 점수</Text>
              <Text style={styles.statValue}>200</Text>
            </View>
          </View>
        </View>

        <View style={styles.contextBox}>
          <Text style={styles.subtitle}>빠르게 눌러서 최고 점수에 도전해요</Text>
          <Text style={styles.context}>
            최대한 빠르게 궁디팡팡 해주세요! 신기록을 세울수록 포인트를 더 받을 수 있어요.
          </Text>
        </View>

        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>✉️</Text>
            <Text>친구에게 공유</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnToss]}>
            <Text style={styles.actionIcon}>💙</Text>
            <Text style={{ color: "#fff" }}>토스 포인트 환전</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.btnBox}>
        <Button onClick={onStart}>시작하기</Button>
      </View>
    </View>
  );
}

export default MainPage;
