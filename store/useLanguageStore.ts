import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import i18n, { type Language } from "@/libs/i18n";

interface LanguageState {
  language: Language;
  _hasHydrated: boolean;
  setLanguage: (lang: Language) => void;
  setHasHydrated: (state: boolean) => void;
}

const getDeviceLanguage = (): Language => {
  const locales = getLocales();
  const code = locales[0]?.languageCode ?? "vi";
  return code === "en" ? "en" : "vi";
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getDeviceLanguage(),
      _hasHydrated: false,
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "monasis-language",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ language: state.language }),
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);
