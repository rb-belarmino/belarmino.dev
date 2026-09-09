'use client'

import { useState, useTransition, useEffect } from 'react'
import { updateProviderSettingsAction } from '@/app/admin/actions/provider.actions'
import { formatDocumentMask, formatPhoneMask } from '@/lib/masks'

interface ProviderSettingsData {
  fullName: string
  document: string
  pixKey: string | null
  phone: string | null
  email: string | null
  cityState: string
  bankName?: string | null
  bankAgency?: string | null
  bankAccount?: string | null
  bankAccountType?: string | null
}

export function ProviderSettingsForm({
  initialData
}: {
  initialData: ProviderSettingsData | null
}) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [documentVal, setDocumentVal] = useState('')
  const [phoneVal, setPhoneVal] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (initialData) {
      setDocumentVal(
        initialData.document ? formatDocumentMask(initialData.document) : ''
      )
      setPhoneVal(initialData.phone ? formatPhoneMask(initialData.phone) : '')
    }
  }, [initialData])

  function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDocumentVal(formatDocumentMask(e.target.value))
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneVal(formatPhoneMask(e.target.value))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: formData.get('fullName')?.toString() || '',
      document: documentVal.trim(),
      pixKey: formData.get('pixKey')?.toString() || '',
      phone: phoneVal.trim(),
      email: formData.get('email')?.toString() || '',
      cityState: formData.get('cityState')?.toString() || 'São Paulo - SP',
      bankName: formData.get('bankName')?.toString() || '',
      bankAgency: formData.get('bankAgency')?.toString() || '',
      bankAccount: formData.get('bankAccount')?.toString() || '',
      bankAccountType:
        formData.get('bankAccountType')?.toString() || 'Conta Corrente'
    }

    startTransition(async () => {
      const res = await updateProviderSettingsAction(payload)
      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(true)
      }
    })
  }

  return (
    <div className="max-w-3xl bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
        <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
          <span className="material-symbols-outlined">badge</span>
        </span>
        <div>
          <h2 className="text-base font-bold text-white">
            Dados do Emissor / Prestador
          </h2>
          <p className="text-xs text-slate-400">
            Estas informações serão preenchidas automaticamente no cabeçalho,
            dados bancários e assinatura dos recibos e boletos.
          </p>
        </div>
      </div>

      {success && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-400">
            check_circle
          </span>
          <span>Configurações do prestador salvas com sucesso!</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-rose-400">
            error
          </span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Seção 1: Identificação Básica */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            1. Identificação Profissional
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Nome Completo ou Razão Social *
              </label>
              <input
                name="fullName"
                type="text"
                required
                defaultValue={initialData?.fullName || 'Rodrigo Belarmino'}
                placeholder="Ex: Rodrigo Belarmino"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>CPF ou CNPJ *</span>
                <span className="text-[10px] text-cyan-400/80 font-normal">
                  Máscara automática
                </span>
              </label>
              <input
                name="document"
                type="text"
                required
                value={documentVal}
                onChange={handleDocumentChange}
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Chave PIX para Recebimento
              </label>
              <input
                name="pixKey"
                type="text"
                defaultValue={initialData?.pixKey || ''}
                placeholder="Chave Pix (E-mail, CPF, Telefone ou Aleatória)"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Telefone / WhatsApp</span>
                <span className="text-[10px] text-cyan-400/80 font-normal">
                  Máscara
                </span>
              </label>
              <input
                name="phone"
                type="text"
                value={phoneVal}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Cidade e Estado (para data do recibo) *
              </label>
              <input
                name="cityState"
                type="text"
                required
                defaultValue={initialData?.cityState || 'São Paulo - SP'}
                placeholder="Ex: São Paulo - SP"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              E-mail Profissional
            </label>
            <input
              name="email"
              type="email"
              defaultValue={initialData?.email || ''}
              placeholder="contato@belarmino.dev"
              className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Seção 2: Dados Bancários para Depósito/Transferência */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="material-symbols-outlined text-base">
              account_balance
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              2. Dados Bancários para Pagamento / Transferência
            </h3>
          </div>
          <p className="text-xs text-slate-400 -mt-2">
            Serão impressos no recibo e boleto caso o cliente opte por TED / DOC
            / Depósito.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Banco (Nome / Código)
              </label>
              <input
                name="bankName"
                type="text"
                defaultValue={initialData?.bankName || ''}
                placeholder="Ex: Nubank (260) / Itaú (341) / Inter (077)"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Agência
              </label>
              <input
                name="bankAgency"
                type="text"
                defaultValue={initialData?.bankAgency || ''}
                placeholder="Ex: 0001"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Conta & Dígito
              </label>
              <input
                name="bankAccount"
                type="text"
                defaultValue={initialData?.bankAccount || ''}
                placeholder="Ex: 1234567-8"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Tipo de Conta
            </label>
            <select
              name="bankAccountType"
              defaultValue={initialData?.bankAccountType || 'Conta Corrente'}
              className="w-full sm:w-64 px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="Conta Corrente">Conta Corrente</option>
              <option value="Conta Pagamento">Conta Pagamento</option>
              <option value="Conta Poupança">Conta Poupança</option>
              <option value="Conta PJ">Conta PJ</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isPending && (
              <span className="material-symbols-outlined animate-spin text-sm">
                progress_activity
              </span>
            )}
            <span>Salvar Configurações</span>
          </button>
        </div>
      </form>
    </div>
  )
}
