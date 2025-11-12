import 'server-only'

export const locales = ['en', 'ko'] as const

export type Locale = (typeof locales)[number]

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import('./locales/en.json').then((module) => module.default),
  ko: () => import('./locales/ko.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const loadDictionary = dictionaries[locale]

  if (!loadDictionary) {
    throw new Error(`Unsupported locale "${locale}"`)
  }

  return loadDictionary()
}
