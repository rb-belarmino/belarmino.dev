export type Locale = 'pt' | 'en'
export const defaultLocale: Locale = 'pt'

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch (error) {
    return (await import(`../messages/${defaultLocale}.json`)).default
  }
}
