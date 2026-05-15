import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Button 컴포넌트
export function Button({
  children, onClick, disabled, className,
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
function TitleParagraph({ children, size = 20 }: { children?: React.ReactNode; size?: number }) {
  return (
    <Text style={[styles.titleParagraph, { fontSize: size }]}>{children}</Text>
  );
}

// Top 컴포넌트
export function Top({ title, upperGap = 0, lowerGap = 0 }: {
  title?: React.ReactNode; upperGap?: number; lowerGap?: number;
}) {
  return (
    <View style={{ paddingTop: upperGap, paddingBottom: lowerGap }}>{title}</View>
  );
}
Top.TitleParagraph = TitleParagraph;

// TDSMobileAITProvider stub
export function TDSMobileAITProvider({ children, brandPrimaryColor }: {
  children?: React.ReactNode; brandPrimaryColor?: string;
}) {
  return <>{children}</>;
}

// ─────────────────────────────────────────────
// Toast 컴포넌트
// ─────────────────────────────────────────────
interface ToastState {
  message: string;
  icon?: string;
  visible: boolean;
}

const toastListeners: Array<(state: ToastState) => void> = [];

function notifyToast(state: ToastState) {
  toastListeners.forEach(fn => fn(state));
}

export function Toast() {
  const [state, setState] = useState<ToastState>({ message: "", visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const listener = (s: ToastState) => {
      setState(s);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, visible: false }));
      }, 2000);
    };
    toastListeners.push(listener);
    return () => {
      const idx = toastListeners.indexOf(listener);
      if (idx > -1) toastListeners.splice(idx, 1);
    };
  }, []);

  if (!state.visible) return null;

  return (
    <View style={toastStyles.container} pointerEvents="none">
      <View style={toastStyles.toast}>
        {state.icon && <Text style={toastStyles.icon}>{state.icon}</Text>}
        <Text style={toastStyles.message}>{state.message}</Text>
      </View>
    </View>
  );
}

// useToast 훅
export function useToast() {
  const openToast = useCallback((message: string, options?: {
    type?: "top" | "bottom";
    icon?: string;
    iconColor?: string;
    duration?: number;
  }) => {
    notifyToast({ message, icon: options?.icon, visible: true });
  }, []);

  const closeToast = useCallback(() => {
    notifyToast({ message: "", visible: false });
  }, []);

  return { openToast, closeToast };
}

const toastStyles = StyleSheet.create({
  container: {
    position: "absolute" as any,
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    pointerEvents: "none" as any,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#191f28",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  } as any,
  icon: { fontSize: 16 },
  message: { color: "#fff", fontSize: 14, fontWeight: "600" } as any,
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3182F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonDisabled: { backgroundColor: "#c2d4f8" },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" } as any,
  titleParagraph: {
    fontWeight: "700",
    color: "#191F28",
    whiteSpace: "pre-line",
  } as any,
});
