'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('Hero')
  const isEn = locale === 'en'

  const fullText = 'RODRIGO BELARMINO'
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentText = ''
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex]
        setDisplayText(currentText)
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 120)

    return () => clearInterval(interval)
  }, [])

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
            <span className="animate-pulse">console.log("Hello, World!");</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-on-background tracking-tight ">
            {t('greeting')} <br />
            <br />
            <span
              className="font-mono uppercase tracking-widest text-transparent bg-clip-text bg-cover bg-center inline-block min-h-[1.2em] filter drop-shadow-glow-text"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(150,250,255,0.85), rgba(0,200,255,0.85)), url('/cover.jpg')"
              }}
            >
              {displayText}
            </span>
            <span
              className={`text-primary-container font-mono opacity-80 ${isTyping ? 'animate-none' : 'animate-pulse'}`}
            >
              _
            </span>
          </h1>

          <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {t('description')}
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="#services"
              data-testid="hero-btn-solutions"
              className="bg-primary text-black hover:bg-primary-fixed hover:shadow-glow-xl hover:-translate-y-0.5 px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest transition-all flex items-center gap-2 group"
            >
              <span>{isEn ? 'MY SOLUTIONS' : 'MINHAS SOLUÇÕES'}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              href="#contact"
              data-testid="hero-btn-contact"
              className="bg-transparent text-primary border border-primary/50 hover:bg-primary/10 px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest transition-all flex items-center justify-center whitespace-nowrap"
            >
              {isEn ? 'START A PROJECT' : 'FALAR SOBRE UM PROJETO'}
            </a>
          </div>
        </div>

        {/* Visual / Graphic (Right Col) */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-container/20 to-secondary-container/20 blur-[100px] rounded-full z-0"></div>
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
            <img
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
              alt="Rodrigo Belarmino"
              src="https://github.com/rb-belarmino.png"
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
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow-lg transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                data_object
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Node.js / TS
            </span>
          </div>
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow-lg transition-all">
              <span className="material-symbols-outlined text-primary text-[32px]">
                code_blocks
              </span>
            </div>
            <span className="font-mono text-sm text-on-surface text-center leading-tight">
              Java / C#
            </span>
          </div>
          {/* Tech Item */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow-lg transition-all">
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
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow-lg transition-all">
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
