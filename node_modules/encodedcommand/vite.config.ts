import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tds/react-native": path.resolve(__dirname, "src/lib/tds-react-native-stub.ts"),
      "@toss/tds-mobile": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
      "@toss/tds-mobile-ait": path.resolve(__dirname, "src/lib/tds-mobile-stub.tsx"),
    }
  }
});
