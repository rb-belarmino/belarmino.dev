'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('Navigation')
  const isEn = locale === 'en'

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300

      const projects = document.getElementById('projects')
      const experience = document.getElementById('experience')
      const contact = document.getElementById('contact')

      if (contact && scrollPosition >= contact.offsetTop) {
        setActiveSection('contact')
      } else if (experience && scrollPosition >= experience.offsetTop) {
        setActiveSection('experience')
      } else if (projects && scrollPosition >= projects.offsetTop) {
        setActiveSection('projects')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper para classes desktop
  const getDesktopClass = (section: string) => {
    const isActive = activeSection === section
    return `flex items-center gap-4 px-4 py-3 font-code-sm text-code-sm rounded-r-md transition-all duration-300 ease-out border-l-4 relative overflow-hidden group ${
      isActive
        ? 'bg-primary/10 text-primary border-primary translate-x-2'
        : 'text-on-surface-variant border-transparent hover:bg-white/5 hover:text-primary hover:translate-x-1'
    }`
  }

  // Helper para classes mobile
  const getMobileClass = (section: string) => {
    const isActive = activeSection === section
    return `flex flex-col items-center justify-center transition-all duration-300 ease-out w-16 p-2 rounded-xl relative ${
      isActive
        ? 'bg-primary-container/20 text-primary shadow-glow-lg -translate-y-1 scale-105'
        : 'text-on-surface-variant hover:text-primary hover:bg-white/5'
    }`
  }

  return (
    <>
      {/* TopAppBar */}
      <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl font-headline-sm text-headline-sm fixed top-0 w-full z-50 border-b border-white/10 shadow-glow-sm">
        <div className="flex justify-between items-center px-6 h-16 w-full">
          {/* Leading Icon */}
          <button data-testid="nav-menu-toggle" className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all duration-300 active:scale-95 flex items-center justify-center w-10 h-10">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              terminal
            </span>
          </button>

          {/* Headline / Brand */}
          <div className="font-label-caps text-label-caps tracking-[0.2em] text-primary dark:text-primary-container drop-shadow-glow-text">
            CMD_CENTER
          </div>

          {/* Trailing Icon (Language Switcher) */}
          <Link
            href={isEn ? '/' : '/en'}
            data-testid="lang-toggle"
            className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all duration-300 active:scale-95 flex items-center justify-center w-10 h-10"
            title="Switch Language"
          >
            <span className="font-mono text-sm uppercase">
              {isEn ? 'PT' : 'EN'}
            </span>
          </Link>
        </div>
      </header>

      {/* NavigationDrawer (Desktop SideNav) */}
      <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-72 rounded-r-xl bg-surface-container-low dark:bg-surface-container-low backdrop-blur-2xl border-r border-white/5 shadow-2xl fixed left-0 top-16 z-40 transition-all duration-200">
        {/* Profile Header */}
        <div className="p-6 border-b border-white/5 flex flex-col items-start gap-4">
          <img
            className="w-16 h-16 rounded-full border-2 border-primary/30 object-cover shadow-glow-md"
            alt="Rodrigo Belarmino"
            src="https://github.com/rb-belarmino.png"
          />
          <div>
            <h2 className="font-display-lg text-primary text-[20px] tracking-tight leading-tight">
              RODRIGO_BELARMINO
            </h2>
            <p className="font-code-sm text-code-sm text-on-surface-variant mt-1">
              Full-Stack Dev
            </p>
            <span className="inline-block mt-2 font-code-sm text-code-sm text-primary-container bg-primary-container/10 px-2 py-1 rounded">
              v2.4.0
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-2 px-2">
            <li>
              <a href="#" data-testid="desktop-nav-home" className={getDesktopClass('home')}>
                <span className="material-symbols-outlined">home</span>
                <span>{isEn ? 'ROOT' : 'INÍCIO'}</span>
              </a>
            </li>
            <li>
              <a href="#projects" data-testid="desktop-nav-projects" className={getDesktopClass('projects')}>
                <span className="material-symbols-outlined">code</span>
                <span>{isEn ? 'REPOS' : 'PROJETOS'}</span>
              </a>
            </li>
            <li>
              <a href="#experience" data-testid="desktop-nav-experience" className={getDesktopClass('experience')}>
                <span className="material-symbols-outlined">timeline</span>
                <span>{isEn ? 'LOGS' : 'EXPERIÊNCIA'}</span>
              </a>
            </li>
            <li>
              <a href="#contact" data-testid="desktop-nav-contact" className={getDesktopClass('contact')}>
                <span className="material-symbols-outlined">mail</span>
                <span>{isEn ? 'CONTACT' : 'CONTATO'}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* BottomNavBar (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 md:hidden z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-lg rounded-t-xl shadow-glow-surface border-t border-white/10 font-label-caps text-label-caps">
        <a href="#" data-testid="mobile-nav-home" className={getMobileClass('home')}>
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="text-[10px]">{isEn ? 'HOME' : 'INÍCIO'}</span>
        </a>
        <a href="#projects" data-testid="mobile-nav-projects" className={getMobileClass('projects')}>
          <span className="material-symbols-outlined mb-1">code_blocks</span>
          <span className="text-[10px]">{isEn ? 'PROJECTS' : 'PROJETOS'}</span>
        </a>
        <a href="#experience" data-testid="mobile-nav-experience" className={getMobileClass('experience')}>
          <span className="material-symbols-outlined mb-1">account_tree</span>
          <span className="text-[10px]">XP</span>
        </a>
        <a href="#contact" data-testid="mobile-nav-contact" className={getMobileClass('contact')}>
          <span className="material-symbols-outlined mb-1">send</span>
          <span className="text-[10px]">{isEn ? 'CONTACT' : 'CONTATO'}</span>
        </a>
      </nav>
    </>
  )
}
