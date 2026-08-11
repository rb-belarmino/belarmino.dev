'use client'

import { useTranslations } from 'next-intl'

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('Hero')
  const isEn = locale === 'en'

  return (
    <>
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-20 items-center min-h-[60vh]">
        {/* Text / Info (Left Col) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="font-mono text-sm text-primary-container px-3 py-1 rounded bg-primary-container/10 border border-primary-container/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="animate-pulse">
              System.out.println("Hello, World");
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-on-background tracking-tight">
            {t('greeting')} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-container to-secondary-container">
              RODRIGO
            </span>
          </h1>

          <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('description')}
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="bg-primary-container text-on-primary hover:bg-primary-fixed hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:-translate-y-0.5 px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest transition-all flex items-center gap-2 group"
            >
              <span>{isEn ? 'VIEW PROJECTS' : 'VER PROJETOS'}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              href="#contact"
              className="bg-transparent text-primary-container border border-primary-container/50 hover:bg-primary-container/10 px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest transition-all flex items-center justify-center"
            >
              {isEn ? 'SYS_CONFIG' : 'CONFIG_SIS'}
            </a>
          </div>
        </div>

        {/* Visual / Graphic (Right Col) */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-container/20 to-secondary-container/20 blur-[100px] rounded-full z-0"></div>
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
            <img
              className="w-full h-full object-cover mix-blend-screen opacity-80"
              alt="Cube"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC_1CJI0yiLDsfbIAsaZS2YkOQ3NN5Z4NZNKksv8DdntWKr-TQ_dmp0FBhRSdabsEpLWq1V9Ts0mLNhLvRzN0gnx1oX6o-e5_xQvFEMBDuFDUgxGoH3FIgoopgCv2r2Oqb7QarIUI_lv9wvIwA4yd-OQynH1pqOk3kJDL3qF8GuX4wMLRwwPbIYEMhWCUHw0P8__TTabz8rhWRPRJB8Oqu7JvJPntxnfoCG39pXu3Vu6duweu03qw"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section (Active Modules) */}
      <section className="mt-20 pt-20 border-t border-white/5">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-primary-container">
            memory
          </span>
          <h3 className="font-mono text-xs font-bold text-on-surface-variant tracking-widest">
            {isEn ? 'ACTIVE_MODULES' : 'MÓDULOS_ATIVOS'}
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                smart_toy
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Python / AI
            </span>
          </div>
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                architecture
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Clean Architecture
            </span>
          </div>
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                cloud
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Azure / GCP / OCI
            </span>
          </div>
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                dns
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Infra / DevOps
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
