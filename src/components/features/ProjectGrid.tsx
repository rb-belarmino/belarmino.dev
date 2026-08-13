'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data/projects'

export function ProjectGrid({ locale }: { locale: string }) {
  const t = useTranslations('Projects')
  const isEn = locale === 'en'

  return (
    <div className="w-full flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <h1 className="font-display font-extrabold text-5xl md:text-7xl text-primary drop-shadow-glow-sm tracking-tight">
          {t('title')}
        </h1>
        <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
          {isEn
            ? 'Archived implementations of high-performance systems and exploratory technological constructs.'
            : 'Implementações arquivadas de sistemas de alta performance e construções tecnológicas exploratórias.'}
        </p>
      </section>

      {/* Projects Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {projects.map((project, index) => {
          const isFeatured = index === 0 // Faz o primeiro projeto ser destaque

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm ${isFeatured ? 'md:col-span-2 flex-col md:flex-row h-full' : ''}`}
            >
              <div
                className={`relative overflow-hidden ${isFeatured ? 'h-64 md:h-auto md:w-1/2 w-full' : 'h-64 w-full'}`}
              >
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-500"></div>
                <img
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  alt={project.title}
                  src={
                    project.imageUrl ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQAwH17CRhtyINFfRtzsaw-NjDmifPDVN63pNB-F3O8ZVYX7VWP26_7AAXSw2a1wC_daWMNLcdK9wh91xLOrRw61CmDRHCGC_vZJKzBZQkcNJXmLRezrSDUORuemxB4K0Zac1e5NYrwxAGMedwhi-BPMx1lM1iruNLbm4ZdAXIJDQOpZRw5SNTMVNvOhCZjqrXn0Ds6XRNmAvACNA9_-pSvoAGgbzR0r6KatgxTkZ1pFPZ9GcD-Xk'
                  }
                />
              </div>

              <div
                className={`p-6 flex flex-col gap-6 flex-1 ${isFeatured ? 'md:w-1/2 justify-center' : ''}`}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-display font-bold text-2xl text-primary group-hover:text-primary-fixed transition-colors">
                    {project.title}
                  </h2>
                  <p className="font-sans text-base text-on-surface-variant line-clamp-2">
                    {isEn ? project.description.en : project.description.pt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-primary-fixed bg-primary-container/10 border border-primary-container/20 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-on-surface py-3 rounded-lg font-mono text-xs transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        code
                      </span>
                      {isEn ? 'SOURCE_CODE' : 'CÓDIGO_FONTE'}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 py-3 rounded-lg font-mono text-xs transition-colors border border-primary/20 hover:border-primary/50"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        open_in_new
                      </span>
                      {isEn ? 'VIEW_PROJECT' : 'VER_PROJETO'}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </section>
    </div>
  )
}
