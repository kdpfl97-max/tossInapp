import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "@react-native-async-storage/async-storage": path.resolve(__dirname, "src/lib/async-storage-stub.ts"),
      "@tds/react-native": path.resolve(__dirname, "src/lib/tds-react-native-stub.ts"),
      "@toss/tds-mobile": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
      "@toss/tds-mobile-ait": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
    }
  }
});
