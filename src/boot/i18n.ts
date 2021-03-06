import {boot} from "quasar/wrappers";
import messages from "src/i18n";
import Vue from "vue";
import VueI18n from "vue-i18n";

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n);
export const languages = [
  {
    lang: "es-mx",
    name: "es",
    icon: "language"
  },
  {
    lang: "en-us",
    name: "en",
    icon: "language"
  }
];
export const i18n = new VueI18n({
  locale: "en-us",
  fallbackLocale: "en-us",
  messages
});
export type LanguagesActives = "es-mx" | "en-us";

export function translateMessage(message: string) {
  return i18n.t(message).toString();
}

export function setLanguage(lang: LanguagesActives) {
  i18n.locale = lang;
  document.querySelector("html")?.setAttribute("lang", lang);
}

export default boot(({app}) => {
  // Set i18n instance on app
  app.i18n = i18n;
});
