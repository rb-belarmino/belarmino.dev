'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function UseCasesSection({ locale }: { locale: string }) {
  const isEn = locale === 'en'

  const useCases = [
    {
      icon: 'storefront',
      title: isEn ? 'E-Commerce & Digital Stores' : 'E-Commerce & Lojas Digitais',
      description: isEn
        ? 'High-conversion online stores with integrated Pix/Credit Card payments, inventory management, and fast checkout.'
        : 'Lojas virtuais de alta conversão com pagamento integrado (Pix/Cartão), controle de estoque e checkout ultra-rápido.',
      badge: isEn ? 'Sales & Products' : 'Vendas & Produtos'
    },
    {
      icon: 'calendar_month',
      title: isEn ? 'Booking & Appointment Systems' : 'Agendamento & Consultas',
      description: isEn
        ? 'Automated scheduling platforms for doctors, clinics, consultants, and service professionals with WhatsApp reminders.'
        : 'Plataforma de agendamento online para médicos, clínicas, advogados e consultores com lembretes no WhatsApp.',
      badge: isEn ? 'Services & Health' : 'Serviços & Saúde'
    },
    {
      icon: 'badge',
      title: isEn ? 'High-Impact Portfolio & Landing Pages' : 'Páginas de Divulgação & Portfólio',
      description: isEn
        ? 'Professional websites designed to build authority, showcase work, and capture qualified leads for your business.'
        : 'Páginas institucionais de alta performance para divulgar seu trabalho, construir autoridade e captar clientes.',
      badge: isEn ? 'Authority & Marketing' : 'Autoridade & Lead Gen'
    },
    {
      icon: 'dashboard_customize',
      title: isEn ? 'Member Portals & Internal Dashboards' : 'Portais de Membros & Dashboards',
      description: isEn
        ? 'Custom management systems, administrative panels, and student/client areas protected with secure authentication.'
        : 'Sistemas de gestão interna, painéis administrativos e áreas exclusivas de membros/clientes com login seguro.',
      badge: isEn ? 'Management & SaaS' : 'Gestão & SaaS'
    }
  ]

  return (
    <section id="use-cases" className="mt-20 relative scroll-mt-24">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary-container">
            rocket_launch
          </span>
          <h2 className="font-mono text-xl font-bold text-on-background tracking-widest uppercase">
            {isEn ? 'WHAT WE CAN BUILD TOGETHER' : 'O QUE PODEMOS CRIAR JUNTOS'}
          </h2>
        </div>
        <p className="font-sans text-on-surface-variant max-w-2xl">
          {isEn
            ? 'Real-world digital applications tailored to your specific business needs and goals.'
            : 'Ideias e soluções reais aplicadas ao seu negócio para atrair clientes, automatizar processos e escalar.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-7 rounded-2xl flex flex-col justify-between group hover:border-primary/40 hover:bg-white/8 transition-all"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    {item.icon}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary-container bg-primary-container/10 px-2.5 py-1 rounded-full border border-primary-container/20">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-on-surface group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-primary font-bold hover:underline"
            >
              <span>{isEn ? 'TALK ABOUT THIS IDEA' : 'DISCUTIR ESTA IDEIA'}</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
