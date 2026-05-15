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
  appTitle: { fontSize: 15, fontWeight: "600", color: "#191f28" } as any,
  navActions: { flexDirection: "row", alignItems: "center" },
  navDivider: { width: 1, height: 16, backgroundColor: "#e5e8eb", marginHorizontal: 4 },

  titleArea: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#191f28",
    textAlign: "center",
    lineHeight: 32,
  } as any,

  content: { flex: 1, position: "relative" as any },

  frame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  doneCat: {
    width: "100%" as any,
    height: "100%" as any,
  },

  toastBest: {
    position: "absolute" as any,
    top: 12,
    alignSelf: "center",
    backgroundColor: "#3182f6",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    zIndex: 10,
  },
  toastText: { color: "#fff", fontSize: 13, fontWeight: "600" } as any,

  chip: {
    position: "absolute" as any,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#f2f4f6",
  },
  chipItem: {
    flexDirection: "row", alignItems: "center", gap: 6,
  },
  chipLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  chipIcon: { fontSize: 16 },
  chipIconPoint: {
    fontSize: 11, fontWeight: "700", color: "#fff",
    backgroundColor: "#3182f6", borderRadius: 10,
    paddingHorizontal: 6, paddingVertical: 2,
  } as any,
  chipLabel: { fontSize: 13, color: "#6b7684" },
  chipValue: { fontSize: 15, fontWeight: "700", color: "#191f28" } as any,
  chipDivider: { width: 1, height: 24, backgroundColor: "#e5e8eb" },
  chipAvatar: { width: 22, height: 22, borderRadius: 11 },
  bottom: { padding: 16, paddingBottom: 24 },
});
