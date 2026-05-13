import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingHorizontal: 24 },
  bell: { fontSize: 32, marginTop: 40 },
  titleBox: { marginTop: 24, alignSelf: "flex-start" },
  subtitle: { fontSize: 14, color: "#6b7684", marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "700", color: "#191f28", lineHeight: 32 },
  img: { width: 200, height: 200, marginTop: 32 },
  btnBox: { position: "absolute", bottom: 16, left: 24, right: 24 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  bottomsheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    maxHeight: "70%",
  },
  sheetContent: { paddingHorizontal: 24 },
  sheetTitle: { fontSize: 18, fontWeight: "700", color: "#191f28", lineHeight: 26, marginBottom: 24 },
  groupLabel: { fontSize: 13, color: "#6b7684", marginTop: 16, marginBottom: 8 },
  consentItem: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f2f4f6",
  },
  check: { color: "#3182f6", marginRight: 8, fontSize: 16 },
  consentText: { flex: 1, fontSize: 14, color: "#191f28" },
  arrow: { fontSize: 18, color: "#b0b8c1" },
  error: { color: "#f04452", fontSize: 13, marginTop: 12 },
  sheetBtnBox: { padding: 16 },
  laterBtn: { alignItems: "center", paddingVertical: 12 },
  laterBtnText: { fontSize: 14, color: "#6b7684" },
});
