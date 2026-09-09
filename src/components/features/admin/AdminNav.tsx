'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAdminAction } from '@/app/admin/actions/auth.actions'
import { useTransition } from 'react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Visão Geral', icon: 'dashboard' },
  { href: '/admin/clients', label: 'Clientes & Projetos', icon: 'group' },
  {
    href: '/admin/receipts',
    label: 'Cobranças & Recibos',
    icon: 'receipt_long'
  },
  { href: '/admin/settings', label: 'Configurações', icon: 'settings' }
]

export function AdminNav({ username }: { username?: string }) {
  const pathname = usePathname()
  const [isLoggingOut, startLogout] = useTransition()

  function handleLogout() {
    startLogout(async () => {
      await logoutAdminAction()
    })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand/Identity */}
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-white font-bold"
          >
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-lg">
                admin_panel_settings
              </span>
            </span>
            <span>
              belarmino<span className="text-cyan-400">.admin</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {NAV_ITEMS.map(item => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User profile & Actions */}
        <div className="flex items-center gap-3">
          {username && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{username}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 px-3 py-1.5 rounded-lg transition cursor-pointer disabled:opacity-50"
            title="Encerrar Sessão"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span className="hidden sm:inline">
              {isLoggingOut ? 'Saindo...' : 'Sair'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-[#07090e] py-2 px-1">
        {NAV_ITEMS.map(item => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-medium transition ${
                isActive ? 'text-cyan-400' : 'text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {item.icon}
              </span>
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          )
        })}
      </div>
    </header>
  )
}
