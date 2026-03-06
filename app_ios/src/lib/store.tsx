import { createContext, useContext, type ReactNode } from 'react';

type Settings = {
  isFirstTime: boolean;
};

type AppState = {
  settings: Settings;
};

const AppContext = createContext<AppState>({
  settings: { isFirstTime: false },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={{ settings: { isFirstTime: false } }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
