import { appsInToss } from '@apps-in-toss/framework/plugins';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'pangpang-cat',
  plugins: [
    appsInToss({
      brand: {
        displayName: '궁디팡팡 고양이',
        primaryColor: '#3182F6',
        icon: "https://static.toss.im/appsintoss/40719/94b54110-41c2-4115-8216-820a4d17312e.png",
      },
      permissions: [],
    }),
  ],
});
