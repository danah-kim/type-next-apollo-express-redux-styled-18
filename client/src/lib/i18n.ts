import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { updateLocale } from 'moment';
import { initReactI18next } from 'react-i18next';
import messages from 'translation';

export const fallbackLng = 'en';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    resources: {
      en: {
        translation: messages.en,
      },
      ja: {
        translation: messages.ja,
      },
      ko: {
        translation: messages.ko,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18next.on('languageChanged', (lng) => {
  updateLocale(lng.substring(0, 2), {
    week: {
      dow: 1,
    },
  });
});

export default i18next;
