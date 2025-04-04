import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import nextI18NextConfig from '../next-i18next.config.mjs'

i18n
  .use(HttpApi) // HTTP orqali tarjima yuklaymiz
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    supportedLngs: nextI18NextConfig.i18n.locales,
    // defaultNS: 'common',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Tarjima fayllarining yo‘li
    },
  })

export default i18n
