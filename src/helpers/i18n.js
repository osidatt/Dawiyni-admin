import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "../../public/locales/ar/ns1.json";
import translationFr from "../../public/locales/fr/ns1.json";

const env = process.env.NODE_ENV || "development";

const resources = {
  ar: {
    ns1: translationAr,
  },
  fr: {
    ns1: translationFr,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: env === "production" ? false : true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
