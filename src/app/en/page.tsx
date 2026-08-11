import { getMessages } from "@/i18n/config";
import { PortfolioPage } from "@/components/features/PortfolioPage";

export default async function PageEN() {
  const locale = 'en';
  const messages = await getMessages(locale);
  
  return <PortfolioPage locale={locale} messages={messages} />;
}
