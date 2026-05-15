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
  navCenter: { flexDirection: "row", alignItems: "center", gap: 8 },
  appIcon: { width: 24, height: 24, borderRadius: 6 },
  appTitle: { fontSize: 15, fontWeight: "600", color: "#191f28" },
  navActions: { flexDirection: "row", alignItems: "center" },
  navDivider: { width: 1, height: 16, backgroundColor: "#e5e8eb", marginHorizontal: 4 },
  content: { flex: 1, paddingHorizontal: 24 },
  frame: { alignItems: "center", marginVertical: 16 },
  doneCat: { width: 220, height: 220 },
  toastBest: {
    backgroundColor: "#3182f6", borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
    alignSelf: "center", marginBottom: 16,
  },
  toastText: { color: "#fff", fontSize: 14, fontWeight: "600" } as any,
  chip: {
    borderRadius: 16, borderWidth: 1, borderColor: "#e5e8eb",
    overflow: "hidden", marginBottom: 24,
  },
  chipItem: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 14,
  },
  chipLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  chipIcon: { fontSize: 18 },
  chipIconPoint: {
    fontSize: 13, fontWeight: "700", color: "#fff",
    backgroundColor: "#3182f6", borderRadius: 10,
    paddingHorizontal: 6, paddingVertical: 2,
  } as any,
  chipLabel: { fontSize: 14, color: "#191f28" },
  chipValue: { fontSize: 16, fontWeight: "700", color: "#191f28" } as any,
  chipDivider: { height: 1, backgroundColor: "#f2f4f6", marginHorizontal: 16 },
  chipAvatar: { width: 24, height: 24, borderRadius: 12 },
  bottom: { padding: 16, paddingBottom: 24 },
});
