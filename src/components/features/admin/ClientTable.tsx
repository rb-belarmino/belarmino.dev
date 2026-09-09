'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteClientAction } from '@/app/admin/actions/client.actions'
import { ClientModal } from './ClientModal'

export interface ClientItem {
  id: string
  name: string
  company: string | null
  document: string | null
  email: string | null
  phone: string | null
  address: string | null
  projectTypes: string[] | null
  notes: string | null
  createdAt: Date
}

export function ClientTable({
  initialClients
}: {
  initialClients: ClientItem[]
}) {
  const [search, setSearch] = useState('')
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null)
  const [isDeleting, startDelete] = useTransition()

  const filtered = initialClients.filter(c => {
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      (c.company && c.company.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.document && c.document.includes(q))
    )
  })

  function handleDelete(id: string, name: string) {
    if (confirm(`Deseja realmente remover o cliente "${name}"?`)) {
      startDelete(async () => {
        await deleteClientAction(id)
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, empresa ou documento..."
            className="w-full pl-10 pr-4 py-2 bg-[#161b22] border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={() => {
            setEditingClient(null)
            setClientModalOpen(true)
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Cadastrar Cliente</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-[#0d1117] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#161b22] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Cliente / Empresa</th>
                <th className="px-5 py-3.5">Documento</th>
                <th className="px-5 py-3.5">Contato</th>
                <th className="px-5 py-3.5">Serviços / Sistemas</th>
                <th className="px-5 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    {search
                      ? 'Nenhum cliente encontrado para esta busca.'
                      : 'Nenhum cliente cadastrado ainda.'}
                  </td>
                </tr>
              ) : (
                filtered.map(client => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-800/20 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-xs">
                        {client.name}
                      </div>
                      {client.company && (
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {client.company}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-400">
                      {client.document || '—'}
                    </td>
                    <td className="px-5 py-4 space-y-0.5">
                      {client.email ? (
                        <div className="text-cyan-400">{client.email}</div>
                      ) : (
                        <div className="text-slate-500 text-[11px]">
                          Sem e-mail
                        </div>
                      )}
                      {client.phone && (
                        <div className="text-slate-400 text-[11px]">
                          {client.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {client.projectTypes &&
                        client.projectTypes.length > 0 ? (
                          client.projectTypes.map(pt => (
                            <span
                              key={pt}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                            >
                              {pt}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 text-[11px]">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/receipts/new?clientId=${client.id}`}
                          title="Emitir Recibo para este Cliente"
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition flex items-center"
                        >
                          <span className="material-symbols-outlined text-base">
                            receipt
                          </span>
                        </Link>
                        <button
                          onClick={() => {
                            setEditingClient(client)
                            setClientModalOpen(true)
                          }}
                          title="Editar"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                        >
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(client.id, client.name)}
                          disabled={isDeleting}
                          title="Excluir"
                          className="p-1.5 rounded-lg bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-900/40 transition"
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        clientToEdit={editingClient}
      />
    </div>
  )
}
