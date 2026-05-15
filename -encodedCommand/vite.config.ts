import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // react-native-web으로 웹 렌더링
      "react-native": "react-native-web",

      // AsyncStorage 웹 stub
      "@react-native-async-storage/async-storage": path.resolve(__dirname, "src/lib/async-storage-stub.ts"),

      // Toss 관련 stub
      "@tds/react-native": path.resolve(__dirname, "src/lib/tds-react-native-stub.ts"),
      "@toss/tds-mobile": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
      "@toss/tds-mobile-ait": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
    }
  }
});
