import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import enLocale from './en';
import mmLocale from './mm';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementMmLocale from 'element-ui/lib/locale/lang/en'; // FIXME: is this OK?

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  mm: {
    ...mmLocale,
    ...elementMmLocale,
  },
};

export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'en';
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
});

export default i18n;
