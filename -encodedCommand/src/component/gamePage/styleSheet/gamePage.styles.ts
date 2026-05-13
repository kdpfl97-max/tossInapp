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
  content: { flex: 1, paddingHorizontal: 24 },
  stats: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#f8f9fa", borderRadius: 12,
    padding: 16, marginTop: 16,
  },
  stat: { flex: 1, alignItems: "center" },
  statLabel: { fontSize: 13, color: "#6b7684", marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: "700", color: "#191f28" },
  statDivider: { width: 1, height: 32, backgroundColor: "#e5e8eb" },
  catButton: { flex: 1, alignItems: "center", justifyContent: "center" },
  catImage: { width: 200, height: 200 },
  bottom: { padding: 16 },
});
