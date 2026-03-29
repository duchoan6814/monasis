import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

export type Language = "vi" | "en";

export const LANGUAGES: Language[] = ["vi", "en"];

export const resources = {
  vi: { translation: vi },
  en: { translation: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export default i18n;
