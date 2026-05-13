import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "#f2f4f6",
  },
  navBtn: { padding: 8 },
  navBtnText: { fontSize: 20, color: "#191f28" },
  navTitle: { flexDirection: "row", alignItems: "center", gap: 6 },
  navTitleText: { fontSize: 16, fontWeight: "600", color: "#191f28" },
  navActions: { flexDirection: "row", alignItems: "center" },
  navDivider: { width: 1, height: 16, backgroundColor: "#e5e8eb", marginHorizontal: 4 },
  content: { flex: 1, paddingHorizontal: 24 },
  imageBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  centerImage: { width: 200, height: 200 },
  contextBox: { paddingBottom: 24 },
  subtitle: { fontSize: 14, color: "#6b7684", marginBottom: 8 },
  context: { fontSize: 14, color: "#6b7684", lineHeight: 20 },
  btnBox: { padding: 16 },
});
