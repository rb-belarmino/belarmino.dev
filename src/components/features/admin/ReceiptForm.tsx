'use client'

import { useState, useTransition, useEffect } from 'react'
import { createReceiptAction } from '@/app/admin/actions/receipt.actions'
import { formatBRL, numberToWordsBRL } from '@/lib/currency'
import { formatDocumentMask } from '@/lib/masks'

interface ClientOption {
  id: string
  name: string
  company: string | null
  document: string | null
  email: string | null
  address: string | null
}

interface ProviderData {
  fullName: string
  document: string
  pixKey: string | null
  cityState: string
  bankName?: string | null
  bankAgency?: string | null
  bankAccount?: string | null
  bankAccountType?: string | null
}

interface ReceiptFormProps {
  clients: ClientOption[]
  provider: ProviderData | null
  preSelectedClientId?: string
}

export function ReceiptForm({
  clients,
  provider,
  preSelectedClientId
}: ReceiptFormProps) {
  const [documentType, setDocumentType] = useState<'receipt' | 'boleto'>(
    'boleto'
  )
  const [selectedClientId, setSelectedClientId] = useState<string>(
    preSelectedClientId || ''
  )
  const [clientName, setClientName] = useState('')
  const [clientDocument, setClientDocument] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientAddress, setClientAddress] = useState('')

  const [amount, setAmount] = useState<number>(0)
  const [serviceDescription, setServiceDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Boleto / PIX')
  const [issueDate, setIssueDate] = useState(
    () => new Date().toISOString().split('T')[0]
  )
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().split('T')[0]
  })
  const [instructions, setInstructions] = useState(
    'Pague preferencialmente via PIX para compensação instantânea da prestação de serviços.'
  )

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (preSelectedClientId) {
      const found = clients.find(c => c.id === preSelectedClientId)
      if (found) {
        setClientName(found.name + (found.company ? ` (${found.company})` : ''))
        setClientDocument(
          found.document ? formatDocumentMask(found.document) : ''
        )
        setClientEmail(found.email || '')
        setClientAddress(found.address || '')
      }
    }
  }, [preSelectedClientId, clients])

  function handleClientSelect(clientId: string) {
    setSelectedClientId(clientId)
    if (!clientId) {
      setClientName('')
      setClientDocument('')
      setClientEmail('')
      setClientAddress('')
      return
    }

    const found = clients.find(c => c.id === clientId)
    if (found) {
      setClientName(found.name + (found.company ? ` (${found.company})` : ''))
      setClientDocument(
        found.document ? formatDocumentMask(found.document) : ''
      )
      setClientEmail(found.email || '')
      setClientAddress(found.address || '')
    }
  }

  function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setClientDocument(formatDocumentMask(e.target.value))
  }

  const bankSummary =
    provider?.bankName && provider?.bankAccount
      ? `Banco: ${provider.bankName} | Agência: ${provider.bankAgency || '—'} | Conta: ${provider.bankAccount} (${provider.bankAccountType || 'Conta Corrente'})`
      : undefined

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (amount <= 0) {
      setError('Informe um valor monetário válido maior que zero.')
      return
    }

    const payload = {
      documentType,
      clientId: selectedClientId || null,
      clientName,
      clientDocument: clientDocument.trim() || undefined,
      clientAddress: clientAddress.trim() || undefined,
      clientEmail: clientEmail.trim() || undefined,
      providerName: provider?.fullName || 'Rodrigo Belarmino',
      providerDoc: provider?.document || '000.000.000-00',
      providerPix: provider?.pixKey || '',
      providerBank: bankSummary,
      serviceDescription,
      amount: Number(amount),
      paymentMethod:
        documentType === 'boleto' ? 'Boleto Bancário / PIX' : paymentMethod,
      issueDate,
      dueDate: documentType === 'boleto' ? dueDate : undefined,
      instructions: documentType === 'boleto' ? instructions : undefined
    }

    startTransition(async () => {
      const res = await createReceiptAction(payload)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form column (2 cols) */}
      <div className="lg:col-span-2 bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <span className="material-symbols-outlined">
              {documentType === 'boleto' ? 'receipt' : 'description'}
            </span>
          </span>
          <div>
            <h2 className="text-base font-bold text-white">
              {documentType === 'boleto'
                ? 'Emitir Fatura de Cobrança com PIX'
                : 'Emitir Recibo de Quitação'}
            </h2>
            <p className="text-xs text-slate-400">
              Escolha o tipo de documento fiscal e preencha os dados do cliente.
            </p>
          </div>
        </div>

        {/* Document Type Selector Tabs */}
        <div className="mt-6 p-1 bg-[#161b22] border border-slate-800 rounded-xl grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => {
              setDocumentType('boleto')
              setPaymentMethod('PIX / Transferência')
            }}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              documentType === 'boleto'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">receipt</span>
            <span>Cobrança / Fatura + PIX</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setDocumentType('receipt')
              setPaymentMethod('PIX')
            }}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              documentType === 'receipt'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              verified
            </span>
            <span>Recibo de Quitação (Pago)</span>
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Quick Client Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Selecionar Cliente Cadastrado (Opcional - Preenchimento
              Automático)
            </label>
            <select
              value={selectedClientId}
              onChange={e => handleClientSelect(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="">
                -- Digitar dados manualmente ou selecionar --
              </option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.company ? `(${c.company})` : ''}{' '}
                  {c.email ? `— ${c.email}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              1. Identificação do Pagador / Sacado
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Nome / Razão Social *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Nome do cliente ou empresa"
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>CPF ou CNPJ</span>
                  <span className="text-[10px] text-cyan-400/80 font-normal">
                    Máscara automática
                  </span>
                </label>
                <input
                  type="text"
                  value={clientDocument}
                  onChange={handleDocumentChange}
                  placeholder="00.000.000/0001-00 ou 000.000.000-00"
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  E-mail do Cliente{' '}
                  <span className="text-slate-500 font-normal">(Opcional)</span>
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="financeiro@empresa.com"
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Endereço do Cliente
                </label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={e => setClientAddress(e.target.value)}
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              2. Detalhes dos Serviços & Cobrança
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Discriminação dos Serviços Prestados *
              </label>
              <textarea
                required
                rows={3}
                value={serviceDescription}
                onChange={e => setServiceDescription(e.target.value)}
                placeholder="Ex: Desenvolvimento e implantação de website corporativo responsivo, incluindo otimização de performance, formulários de contato e integração com CMS."
                className="w-full px-3.5 py-2 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Valor Total (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={amount || ''}
                  onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="3500.00"
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-emerald-400 font-bold font-mono text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {documentType === 'boleto'
                    ? 'Vencimento do Boleto *'
                    : 'Data de Emissão *'}
                </label>
                <input
                  type="date"
                  required
                  value={documentType === 'boleto' ? dueDate : issueDate}
                  onChange={e => {
                    if (documentType === 'boleto') setDueDate(e.target.value)
                    else setIssueDate(e.target.value)
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {documentType === 'boleto'
                    ? 'Data do Documento'
                    : 'Forma de Pagamento'}
                </label>
                {documentType === 'boleto' ? (
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={e => setIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <select
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Transferência Bancária">
                      Transferência Bancária
                    </option>
                    <option value="Boleto">Boleto</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                )}
              </div>
            </div>

            {documentType === 'boleto' && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Instruções Adicionais do Boleto (Opcional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="Instruções para o cliente / banco..."
                  className="w-full px-3.5 py-2.5 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">
                    progress_activity
                  </span>
                  <span>Gerando Documento...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">
                    check
                  </span>
                  <span>
                    {documentType === 'boleto'
                      ? 'Gerar Cobrança com PIX'
                      : 'Emitir e Salvar Recibo'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview / Info Card (1 col) */}
      <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
          <span className="material-symbols-outlined text-lg">visibility</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Resumo em Tempo Real
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-slate-500 block">Tipo:</span>
            <span className="text-cyan-400 font-bold">
              {documentType === 'boleto'
                ? 'Fatura de Cobrança com PIX'
                : 'Recibo de Quitação'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">
              Emissor / Beneficiário:
            </span>
            <span className="text-white font-medium">
              {provider?.fullName || 'Rodrigo Belarmino'}
            </span>
            <span className="text-slate-400 block text-[11px] font-mono">
              {provider?.document || '—'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Pagador:</span>
            <span className="text-white font-medium">{clientName || '—'}</span>
            {clientDocument && (
              <span className="text-slate-400 block text-[11px] font-mono">
                {clientDocument}
              </span>
            )}
          </div>

          <div className="p-3 bg-[#161b22] border border-slate-800 rounded-xl space-y-1">
            <span className="text-slate-400 text-[11px] block">
              Valor do Documento:
            </span>
            <span className="text-emerald-400 font-bold font-mono text-base block">
              {formatBRL(amount || 0)}
            </span>
            <span className="text-slate-400 text-[10px] block italic leading-tight">
              ({numberToWordsBRL(amount || 0)})
            </span>
          </div>

          {documentType === 'boleto' && (
            <div>
              <span className="text-slate-500 block">Vencimento:</span>
              <span className="text-white font-bold font-mono">{dueDate}</span>
            </div>
          )}

          {provider?.pixKey && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-1">
              <span className="text-emerald-400 text-[10px] font-bold uppercase block">
                Chave PIX:
              </span>
              <span className="text-white font-mono text-xs block select-all">
                {provider.pixKey}
              </span>
            </div>
          )}

          {bankSummary && (
            <div className="p-3 bg-[#161b22] border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">
                Dados Bancários:
              </span>
              <span className="text-slate-300 text-[11px] block leading-tight">
                {bankSummary}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800/80 text-slate-500 text-[11px]">
            O documento será gerado com número oficial, dados bancários
            completos, QR Code e estará pronto para download em PDF ou disparo
            por e-mail.
          </div>
        </div>
      </div>
    </div>
  )
}
