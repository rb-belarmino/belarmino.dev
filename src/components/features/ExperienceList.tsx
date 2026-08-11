'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { experiences } from '@/lib/data/experiences'

export function ExperienceList({ locale }: { locale: string }) {
  const t = useTranslations('Experience')
  const isEn = locale === 'en'

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-primary mb-4">
          {isEn ? 'EXPERIENCE LOG' : 'REGISTRO_EXPERIÊNCIA'}
        </h1>
        <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
          {isEn
            ? 'Tracing the operational history and skill acquisition protocols across multiple deployment environments.'
            : 'Rastreando o histórico operacional e protocolos de aquisição de habilidades em múltiplos ambientes.'}
        </p>
      </div>

      {/* Experience Timeline */}
      <section className="mb-10 relative">
        {/* Vertical Line */}
        <div className="absolute left-3.75 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          <div className="h-1/3 w-full bg-primary animate-pulse"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
              >
                {/* Desktop Left Side */}
                {isEven ? (
                  <div className="hidden md:block w-5/12 text-right pr-8">
                    <span className="font-mono text-sm text-primary">
                      {isEn ? exp.period.en : exp.period.pt}
                    </span>
                  </div>
                ) : (
                  <div className="w-full md:w-5/12 pl-12 md:pl-0 md:pr-8 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                    <div className="md:hidden mb-2">
                      <span className="font-mono text-sm text-primary">
                        {isEn ? exp.period.en : exp.period.pt}
                      </span>
                    </div>
                    <div className="bg-surface/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors shadow-lg">
                      <h3 className="font-display font-bold text-2xl text-on-surface mb-1">
                        {isEn ? exp.role.en : exp.role.pt}
                      </h3>
                      <p className="font-mono text-xs font-bold tracking-widest text-primary mb-4 uppercase">
                        {exp.company}
                      </p>
                      <ul className="font-sans text-base text-on-surface-variant space-y-2 list-disc list-inside">
                        {(isEn ? exp.achievements.en : exp.achievements.pt).map(
                          (achieve, i) => (
                            <li key={i}>{achieve}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Dot */}
                <div
                  className={`absolute left-3.75 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-2 rounded-full z-10 transition-colors ${isEven ? 'border-primary shadow-[0_0_10px_rgba(0,243,255,0.8)] group-hover:bg-primary' : 'border-primary/50 group-hover:border-primary'} ${!isEven && 'order-1 md:order-2'}`}
                ></div>

                {/* Desktop Right Side */}
                {isEven ? (
                  <div className="w-full md:w-5/12 pl-12 md:pl-8">
                    <div className="md:hidden mb-2">
                      <span className="font-mono text-sm text-primary">
                        {isEn ? exp.period.en : exp.period.pt}
                      </span>
                    </div>
                    <div className="bg-surface/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors shadow-lg">
                      <h3 className="font-display font-bold text-2xl text-on-surface mb-1">
                        {isEn ? exp.role.en : exp.role.pt}
                      </h3>
                      <p className="font-mono text-xs font-bold tracking-widest text-primary mb-4 uppercase">
                        {exp.company}
                      </p>
                      <ul className="font-sans text-base text-on-surface-variant space-y-2 list-disc list-inside">
                        {(isEn ? exp.achievements.en : exp.achievements.pt).map(
                          (achieve, i) => (
                            <li key={i}>{achieve}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block w-5/12 pl-8 order-3">
                    <span className="font-mono text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                      {isEn ? exp.period.en : exp.period.pt}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Core Skills Grid */}
      <section className="w-full">
        <h2 className="font-display font-bold text-3xl text-on-surface mb-8 border-l-4 border-primary pl-4">
          {isEn ? 'CORE_SKILLS' : 'COMPETÊNCIAS_NÚCLEO'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'Node.js / TS / React',
            'Java / C# / .NET',
            'Clean Architecture',
            'Azure / GCP / OCI'
          ].map((skill, index) => (
            <div
              key={skill}
              className="bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                <svg
                  className="w-full h-full absolute -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke="#00f3ff"
                    strokeDasharray="251.2"
                    strokeDashoffset={`${251.2 * (0.2 + index * 0.15)}`}
                    strokeLinecap="round"
                    strokeWidth="8"
                    className="transition-all duration-1000"
                  ></circle>
                </svg>
                <span className="font-mono text-sm text-on-surface z-10">
                  {90 - index * 5}%
                </span>
              </div>
              <span className="font-mono text-xs font-bold tracking-widest text-primary text-center uppercase">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
