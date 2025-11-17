const supportedLangs = ['en', 'ko'] as const

export type SupportedLang = (typeof supportedLangs)[number]

/**
 * Normalizes a lang parameter that may contain undefined or nested paths.
 */
export function resolveLangParam(
  lang?: string | string[] | null
): SupportedLang {
  const values = Array.isArray(lang) ? lang : [lang]

  for (const value of values) {
    if (!value) continue
    const candidate = value
      .split('/')
      .map((segment) => segment.trim())
      .find((segment): segment is SupportedLang =>
        supportedLangs.includes(segment as SupportedLang)
      )

    if (candidate) {
      return candidate
    }
  }

  return 'en'
}
