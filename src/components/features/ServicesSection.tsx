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
            <p className="font-sans text-on-surface-variant leading-relaxed">
              {t('systemsDesc')}
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-primary-container/30 transition-all duration-300 group flex flex-col gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                api
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mt-2">{t('apis')}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed">
              {t('apisDesc')}
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-primary-container/30 transition-all duration-300 group flex flex-col gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                cloud_done
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-on-surface mt-2">{t('cloud')}</h3>
            <p className="font-sans text-on-surface-variant leading-relaxed">
              {t('cloudDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
