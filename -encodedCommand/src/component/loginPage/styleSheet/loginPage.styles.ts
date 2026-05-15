import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bell: { fontSize: 32, textAlign: "center", marginTop: 32 },
  titleBox: { paddingHorizontal: 24, marginTop: 16 },
  subtitle: { fontSize: 14, color: "#6b7684", marginBottom: 6 },
  title: { fontSize: 24, fontWeight: "700", color: "#191f28", lineHeight: 32 } as any,
  imageBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  img: { width: "100%", height: "100%", maxHeight: 360 } as any,
  btnBox: { padding: 16, paddingBottom: 24 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  bottomsheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    maxHeight: "75%",
  } as any,
  sheetContent: { paddingHorizontal: 24 },
  sheetTitle: { fontSize: 18, fontWeight: "700", color: "#191f28", lineHeight: 26, marginBottom: 24 } as any,
  groupLabel: { fontSize: 13, color: "#6b7684", marginTop: 16, marginBottom: 8 },
  consentItem: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f2f4f6",
  },
  check: { color: "#3182f6", marginRight: 10, fontSize: 16, fontWeight: "700" } as any,
  consentText: { flex: 1, fontSize: 14, color: "#191f28" },
  arrow: { fontSize: 18, color: "#b0b8c1" },
  error: { color: "#f04452", fontSize: 13, marginTop: 12 },
  sheetBtnBox: { padding: 16, paddingBottom: 24 },
  laterBtn: { alignItems: "center", paddingVertical: 14 },
  laterBtnText: { fontSize: 14, color: "#6b7684" },
});
