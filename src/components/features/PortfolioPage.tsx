'use client'

import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { Navigation } from './Navigation'
import { HeroSection } from './HeroSection'
import { ProjectGrid } from './ProjectGrid'
import { ExperienceList } from './ExperienceList'
import { ContactForm } from './ContactForm'

export function PortfolioPage({
  locale,
  messages
}: {
  locale: string
  messages: any
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Sao_Paulo"
    >
      <Navigation locale={locale} />
      <PortfolioContent locale={locale} />
    </NextIntlClientProvider>
  )
}

function PortfolioContent({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col min-h-screen pt-16 pb-20 md:pb-0 md:pl-72 w-full">
      <div className="w-full max-w-360 mx-auto px-4 md:px-12 flex flex-col gap-24 relative z-10">
        <HeroSection locale={locale} />

        <div id="projects" className="scroll-mt-24">
          <ProjectGrid locale={locale} />
        </div>

        <div id="experience" className="scroll-mt-24">
          <ExperienceList locale={locale} />
        </div>

        <div id="contact" className="scroll-mt-24">
          <ContactForm />
        </div>

        <footer className="py-8 text-center border-t border-white/5 mt-12 mb-12 md:mb-0">
          <p className="text-xs font-mono text-on-surface-variant/50">
            © {new Date().getFullYear()} Rodrigo Belarmino. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
