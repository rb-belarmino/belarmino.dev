import { getMessages } from '@/i18n/config'
import { PortfolioPage } from '@/components/features/PortfolioPage'

export default async function Page() {
  const locale = 'pt'
  const messages = await getMessages(locale)

  return <PortfolioPage locale={locale} messages={messages} />
}
