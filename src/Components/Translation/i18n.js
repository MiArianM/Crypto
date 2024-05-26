import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./ENtranslation.json";
import translationFA from "./Farsitranslation.json";
import translationDE from "./Germanytranslation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fa: {
    translation: translationFA,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
