import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Button 컴포넌트
export function Button({
  children,
  onClick,
  disabled,
  className,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

// Top.TitleParagraph
function TitleParagraph({
  children,
  size = 20,
}: {
  children?: React.ReactNode;
  size?: number;
}) {
  return (
    <Text style={[styles.titleParagraph, { fontSize: size }]}>
      {children}
    </Text>
  );
}

// Top 컴포넌트
export function Top({
  title,
  upperGap = 0,
  lowerGap = 0,
}: {
  title?: React.ReactNode;
  upperGap?: number;
  lowerGap?: number;
}) {
  return (
    <View style={{ paddingTop: upperGap, paddingBottom: lowerGap }}>
      {title}
    </View>
  );
}

Top.TitleParagraph = TitleParagraph;

// TDSMobileAITProvider stub
export function TDSMobileAITProvider({
  children,
}: {
  children?: React.ReactNode;
  brandPrimaryColor?: string;
}) {
  return <>{children}</>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3182F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#c2d4f8",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  titleParagraph: {
    fontWeight: "700",
    color: "#191F28",
    whiteSpace: "pre-line",
  } as any,
});
