import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize Capacitor plugins
async function initApp() {
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    // Make status bar overlay the webview
    await StatusBar.setOverlaysWebView({ overlay: true });
    // Set style based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    await StatusBar.setStyle({ style: prefersDark ? Style.Dark : Style.Light });
  } catch {
    // Not running in Capacitor (web browser), ignore
  }

  try {
    const { Keyboard } = await import('@capacitor/keyboard');
    await Keyboard.setAccessoryBarVisible({ isVisible: false });
  } catch {
    // Not running in Capacitor, ignore
  }
}

initApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
