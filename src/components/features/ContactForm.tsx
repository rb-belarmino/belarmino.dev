'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const t = useTranslations('Contact')
  const locale = useLocale()
  const isEn = locale === 'en'
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/3 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50"></div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
          {isEn ? 'Contact Me' : 'Entre em Contato'}
        </h1>
        <p className="font-sans text-base text-on-surface-variant mb-12">
          {isEn
            ? 'Send me a message and I will get back to you as soon as possible.'
            : 'Me envie uma mensagem e retornarei o mais rápido possível.'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative group">
            <label
              className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed"
              htmlFor="name"
            >
              {isEn ? 'Name' : 'Nome'}
            </label>
            <input
              {...register('name')}
              className="w-full bg-black border border-surface-border text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-glow-md transition-all outline-none"
              id="name"
              placeholder={isEn ? 'Enter your name' : 'Insira seu nome'}
              type="text"
            />
            {errors.name && (
              <span className="text-xs text-error mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="relative group">
            <label
              className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed"
              htmlFor="email"
            >
              {isEn ? 'Email' : 'E-mail'}
            </label>
            <input
              {...register('email')}
              className="w-full bg-black border border-surface-border text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-glow-md transition-all outline-none"
              id="email"
              placeholder={isEn ? 'Enter your email' : 'Insira seu e-mail'}
              type="email"
            />
            {errors.email && (
              <span className="text-xs text-error mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative group">
            <label
              className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed"
              htmlFor="message"
            >
              {isEn ? 'Message' : 'Mensagem'}
            </label>
            <textarea
              {...register('message')}
              className="w-full bg-black border border-surface-border text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-glow-md transition-all outline-none resize-none"
              id="message"
              placeholder={isEn ? 'Enter your message' : 'Insira sua mensagem'}
              rows={4}
            ></textarea>
            {errors.message && (
              <span className="text-xs text-error mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-primary text-black font-mono text-xs font-bold tracking-widest py-4 px-6 rounded hover:shadow-glow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">send</span>
            {status === 'submitting'
              ? isEn
                ? 'SENDING...'
                : 'ENVIANDO...'
              : isEn
                ? 'SEND MESSAGE'
                : 'ENVIAR MENSAGEM'}
          </button>

          {status === 'success' && (
            <p className="text-primary text-sm text-center mt-4">
              {t('success')}
            </p>
          )}
          {status === 'error' && (
            <p className="text-error text-sm text-center mt-4">{t('error')}</p>
          )}
        </form>

        {/* OPÇÃO 2: Botão do WhatsApp na Seção de Contato */}
        <div className="mt-8">
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/50 font-mono text-xs font-bold tracking-widest py-4 px-6 rounded hover:bg-[#25D366] hover:text-black hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">forum</span>
            {isEn ? 'OR CHAT ON WHATSAPP' : 'OU CHAME NO WHATSAPP'}
          </a>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col items-center gap-6">
          <p className="font-mono text-sm text-on-surface-variant">
            {isEn
              ? 'OR CONNECT VIA SOCIAL MEDIA'
              : 'OU CONECTE VIA REDES SOCIAIS'}
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/rb-belarmino"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary hover:shadow-glow-md transition-all group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                code
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigo-belarmino/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary hover:shadow-glow-md transition-all group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                work
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
