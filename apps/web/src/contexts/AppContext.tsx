"use client";

import { createContext, use, useOptimistic, useTransition } from "react";
import { useLocalStorage } from "@serviceflow/ui";

interface AppSettings {
  theme: "light" | "dark";
  language: "es" | "en";
  sidebarOpen: boolean;
  notifications: boolean;
}

interface AppState extends AppSettings {
  isLoading: boolean;
}

interface AppContextType extends AppState {
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const defaultSettings: AppSettings = {
  theme: "light",
  language: "es",
  sidebarOpen: true,
  notifications: true,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [storedSettings, setStoredSettings] = useLocalStorage<AppSettings>("appSettings", defaultSettings);
  const [isPending, startTransition] = useTransition();
  
  const [optimisticState, setOptimisticState] = useOptimistic(
    { ...storedSettings, isLoading: false },
    (state: AppState, action: { type: string; payload?: any }) => {
      switch (action.type) {
        case "UPDATE_SETTINGS":
          return { ...state, ...action.payload };
        case "TOGGLE_SIDEBAR":
          return { ...state, sidebarOpen: !state.sidebarOpen };
        case "TOGGLE_THEME":
          return { ...state, theme: state.theme === "light" ? "dark" : "light" };
        default:
          return state;
      }
    }
  );

  const updateSettings = (settings: Partial<AppSettings>) => {
    startTransition(() => {
      const newSettings = { ...optimisticState, ...settings };
      setOptimisticState({ type: "UPDATE_SETTINGS", payload: settings });
      setStoredSettings(newSettings);
    });
  };

  const toggleSidebar = () => {
    startTransition(() => {
      setOptimisticState({ type: "TOGGLE_SIDEBAR" });
      setStoredSettings({ ...optimisticState, sidebarOpen: !optimisticState.sidebarOpen });
    });
  };

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = optimisticState.theme === "light" ? "dark" : "light";
      setOptimisticState({ type: "TOGGLE_THEME" });
      setStoredSettings({ ...optimisticState, theme: newTheme });
      
      // Apply theme to document immediately
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    });
  };

  const contextValue: AppContextType = {
    ...optimisticState,
    isLoading: isPending,
    updateSettings,
    toggleSidebar,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = use(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}