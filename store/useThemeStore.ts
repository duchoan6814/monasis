import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ColorScheme = "light" | "dark" | "system";

interface ThemeState {
  colorScheme: ColorScheme;
  _hasHydrated: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleDarkMode: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      colorScheme: "system",
      _hasHydrated: false,
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      toggleDarkMode: () => {
        const current = get().colorScheme;
        set({ colorScheme: current === "dark" ? "light" : "dark" });
      },
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "monasis-theme",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ colorScheme: state.colorScheme }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
