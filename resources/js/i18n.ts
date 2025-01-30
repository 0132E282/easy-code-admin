import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import SIDEBAR_VI from '@lang/vi/sidebar.json'
import PERMISSIONS_VI from '@lang/vi/permission.json'
import PAGE_VI from '@lang/vi/page.json'

export const resources = {
  vi: {
    sidebar: SIDEBAR_VI,
    permission: PERMISSIONS_VI,
    page: PAGE_VI,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    ns: ['sidebar', 'page', 'permission'],
    debug: true,
    react: {
      useSuspense: false,
    },
  })

export default i18n
