type Language = {
  keywords: string[];
  langCode: 'en' | 'ja' | 'ko';
};

type SupportLanguagesI = {
  english: Language;
  japanese: Language;
  korean: Language;
  getLocale: (value: string) => Language['langCode'];
};

const supportLanguages: SupportLanguagesI = {
  english: {
    keywords: ['english', 'en', 'en-us', 'us'],
    langCode: 'en',
  },
  japanese: {
    keywords: ['japanese', 'ja', 'ja-jp', 'jp'],
    langCode: 'ja',
  },
  korean: {
    keywords: ['korean', 'ko', 'ko-kr', 'kr'],
    langCode: 'ko',
  },
  getLocale(value: string) {
    const lowerValue = value.toLowerCase();
    let locale = this.english.langCode;

    [this.english, this.japanese].forEach((lang) => {
      if (lang.keywords.includes(lowerValue)) {
        locale = lang.langCode;
      }
    });

    return locale;
  },
};

export default supportLanguages;
