'use client'

import { useState, useTransition, useEffect } from 'react'
import { saveClientAction } from '@/app/admin/actions/client.actions'
import { formatDocumentMask, formatPhoneMask } from '@/lib/masks'

interface ClientData {
  id?: string
  name: string
  company?: string | null
  document?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  projectTypes?: string[] | null
  notes?: string | null
}

interface ClientModalProps {
  isOpen: boolean
  onClose: () => void
  clientToEdit?: ClientData | null
}

const AVAILABLE_PROJECT_TYPES = [
  'Website Institucional',
  'Sistema Web / SaaS',
  'E-Commerce',
  'Plataforma de Agendamento',
  'Landing Page',
  'API & Integrações',
  'Manutenção & Consultoria'
]

export function ClientModal({
  isOpen,
  onClose,
  clientToEdit
}: ClientModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [documentVal, setDocumentVal] = useState('')
  const [phoneVal, setPhoneVal] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (clientToEdit) {
      setDocumentVal(
        clientToEdit.document ? formatDocumentMask(clientToEdit.document) : ''
      )
      setPhoneVal(clientToEdit.phone ? formatPhoneMask(clientToEdit.phone) : '')
      setSelectedTypes(clientToEdit.projectTypes || [])
    } else {
      setDocumentVal('')
      setPhoneVal('')
      setSelectedTypes([])
    }
  }, [clientToEdit, isOpen])

  if (!isOpen) return null

  function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatDocumentMask(e.target.value)
    setDocumentVal(formatted)
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneMask(e.target.value)
    setPhoneVal(formatted)
  }

  function toggleType(type: string) {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    const payload = {
      id: clientToEdit?.id,
      name: formData.get('name')?.toString() || '',
      company: formData.get('company')?.toString() || '',
      document: documentVal.trim() || undefined,
      email: formData.get('email')?.toString() || '',
      phone: phoneVal.trim() || undefined,
      address: formData.get('address')?.toString() || '',
      projectTypes: selectedTypes,
      notes: formData.get('notes')?.toString() || ''
    }

    startTransition(async () => {
      const res = await saveClientAction(payload)
      if (res?.error) {
        setError(res.error)
      } else {
        onClose()
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#0d1117] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <span className="material-symbols-outlined">
                {clientToEdit ? 'edit_square' : 'person_add'}
              </span>
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                {clientToEdit ? 'Editar Cadastro do Cliente' : 'Novo Cliente'}
              </h2>
              <p className="text-xs text-slate-400">
                Informações para emissão de recibos e gestão de projetos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-rose-400">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Nome do Cliente / Responsável *
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={clientToEdit?.name || ''}
                placeholder="Ex: João da Silva"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Empresa / Razão Social
              </label>
              <input
                name="company"
                type="text"
                defaultValue={clientToEdit?.company || ''}
                placeholder="Ex: Tech Solutions Ltda"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>CPF ou CNPJ</span>
                <span className="text-[10px] text-cyan-400/80 font-normal">
                  Máscara automática
                </span>
              </label>
              <input
                name="document"
                type="text"
                value={documentVal}
                onChange={handleDocumentChange}
                placeholder="00.000.000/0001-00 ou 000.000.000-00"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                E-mail para Envio de Recibos{' '}
                <span className="text-slate-500 font-normal">(Opcional)</span>
              </label>
              <input
                name="email"
                type="email"
                defaultValue={clientToEdit?.email || ''}
                placeholder="cliente@empresa.com"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Telefone / WhatsApp</span>
                <span className="text-[10px] text-cyan-400/80 font-normal">
                  Máscara automática
                </span>
              </label>
              <input
                name="phone"
                type="text"
                value={phoneVal}
                onChange={handlePhoneChange}
                placeholder="(11) 98765-4321"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Endereço Completo (para Recibo)
              </label>
              <input
                name="address"
                type="text"
                defaultValue={clientToEdit?.address || ''}
                placeholder="Av. Paulista, 1000 - São Paulo, SP"
                className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>
          </div>

          {/* Project Types Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              Tipos de Serviços / Sistemas Contratados
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PROJECT_TYPES.map(type => {
                const isSelected = selectedTypes.includes(type)
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-[#161b22] text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {type}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Anotações Internas
            </label>
            <textarea
              name="notes"
              rows={2}
              defaultValue={clientToEdit?.notes || ''}
              placeholder="Observações sobre o cliente, contrato, prazos ou especificidades..."
              className="w-full px-3.5 py-2 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending && (
                <span className="material-symbols-outlined animate-spin text-sm">
                  progress_activity
                </span>
              )}
              <span>
                {clientToEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
