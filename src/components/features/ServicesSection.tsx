'use client'

import { useTranslations } from 'next-intl'

export function ServicesSection() {
  const t = useTranslations('Services')

  return (
    <section id="services" className="mt-32 relative scroll-mt-24">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-primary-container/5 blur-[120px] rounded-full z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-primary-container">
            business_center
          </span>
          <h2 className="font-mono text-xl font-bold text-on-background tracking-widest uppercase">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-primary-container/30 transition-all duration-300 group flex flex-col gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                web
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mt-2">{t('systems')}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed mb-2">
              {t('systemsDesc')}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                ⚡ E-commerce / Lojas
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                📅 Sistemas de Agendamento
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                💼 Portais & Dashboards
              </span>
            </div>
            <a
              href="#contact"
              className="mt-auto font-mono text-xs text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>{t('ctaContact')}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Service 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-primary-container/30 transition-all duration-300 group flex flex-col gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                api
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mt-2">{t('apis')}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed mb-2">
              {t('apisDesc')}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                💳 Gateway de Pagamento (Pix/Stripe)
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                🔗 ERP & CRM Sync
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                🤖 Automações & Webhooks
              </span>
            </div>
            <a
              href="#contact"
              className="mt-auto font-mono text-xs text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>{t('ctaContact')}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Service 3 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-primary-container/30 transition-all duration-300 group flex flex-col gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                cloud_done
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mt-2">{t('cloud')}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed mb-2">
              {t('cloudDesc')}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                🚀 Deploy Alta Disponibilidade
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                🛡️ Segurança & CDN
              </span>
              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded-md">
                📊 Monitoramento Serverless
              </span>
            </div>
            <a
              href="#contact"
              className="mt-auto font-mono text-xs text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>{t('ctaContact')}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
