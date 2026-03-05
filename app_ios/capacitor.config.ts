import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.routinely.app',
  appName: 'روتيني',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      style: 'default',
      overlaysWebView: true,
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
  ios: {
    contentInset: 'always',
    preferredContentMode: 'mobile',
    scrollEnabled: true,
  },
};

export default config;
