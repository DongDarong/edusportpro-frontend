import { ref } from 'vue'
import { LANGUAGE_OPTIONS, translations } from '../i18n/translations'

const STORAGE_KEY = 'appLanguage'
const DEFAULT_LANGUAGE = 'EN'
const language = ref(DEFAULT_LANGUAGE)

function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && LANGUAGE_OPTIONS.includes(stored)) {
    return stored
  }
  return DEFAULT_LANGUAGE
}

language.value = resolveInitialLanguage()

function setLanguage(nextLanguage) {
  if (!LANGUAGE_OPTIONS.includes(nextLanguage)) return
  language.value = nextLanguage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
  }
}

function readKey(path) {
  const dictionary = translations[language.value] ?? translations[DEFAULT_LANGUAGE]
  return path.split('.').reduce((acc, key) => acc?.[key], dictionary)
}

function format(template, params = {}) {
  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value))
  }, template)
}

function t(path, params = {}) {
  const value = readKey(path)
  if (typeof value !== 'string') return path
  return format(value, params)
}

export function useLanguage() {
  return {
    language,
    setLanguage,
    t,
  }
}
