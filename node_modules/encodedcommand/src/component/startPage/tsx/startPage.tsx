import { Button, Top } from "@toss/tds-mobile";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styleSheet/startPage.styles";

interface StartPageProps {
  onStart?: () => void;
}

function StartPage({ onStart }: StartPageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.navTitle}>
          <Text>🐱</Text>
          <Text style={styles.navTitleText}>궁디팡팡 고양이</Text>
        </View>
        <View style={styles.navActions}>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>♥</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>···</Text></TouchableOpacity>
          <View style={styles.navDivider} />
          <TouchableOpacity style={styles.navBtn}><Text style={styles.navBtnText}>✕</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Top
          upperGap={16}
          lowerGap={0}
          title={
            <Top.TitleParagraph size={22}>
              {"고양이가 궁디팡팡을\n기달리고 있어요"}
            </Top.TitleParagraph>
          }
        />
        <View style={styles.imageBox}>
          <Image
            style={styles.centerImage}
            source={require("../../../img/mainCat.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contextBox}>
          <Text style={styles.subtitle}>빠르게 눌러서 최고 점수에 도전해요</Text>
          <Text style={styles.context}>
            최대한 빠르게 궁디팡팡 해주세요! 신기록을 세울수록 포인트를 더 받을 수 있어요.
          </Text>
        </View>
      </View>

      <View style={styles.btnBox}>
        <Button onClick={onStart}>시작하기</Button>
      </View>
    </View>
  );
}

export default StartPage;
