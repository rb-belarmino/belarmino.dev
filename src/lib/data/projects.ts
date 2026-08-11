export interface Project {
  id: string
  title: string
  description: {
    pt: string
    en: string
  }
  technologies: string[]
  imageUrl: string
  repoUrl?: string
  liveUrl?: string
  date: string
}

export const projects: Project[] = [
  {
    id: 'ai-dev-tasks',
    title: 'AI Dev Tasks',
    description: {
      pt: 'Um sistema de gerenciamento de tarefas otimizado para orquestrar agentes de desenvolvimento de Inteligência Artificial.',
      en: 'A task management system optimized for managing and orchestrating Artificial Intelligence dev agents.'
    },
    technologies: ['AI', 'TypeScript', 'Python'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/ai-dev-tasks',
    date: '2024'
  },
  {
    id: 'spec-kit',
    title: 'Spec-Kit',
    description: {
      pt: 'Toolkit arquitetural avançado para iniciar o desenvolvimento de software guiado por especificações (Spec-Driven Development).',
      en: 'Advanced architectural toolkit to help you get started with Spec-Driven Development (SDD).'
    },
    technologies: ['Architecture', 'Tooling', 'SDD'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/spec-kit',
    date: '2024'
  },
  {
    id: 'wtc-messenger',
    title: 'WTCMessenger',
    description: {
      pt: 'Aplicativo de comunicação corporativa nativo, englobando o desenvolvimento móvel e integração de APIs complexas.',
      en: 'Native corporate communication application encompassing mobile development and complex API integrations.'
    },
    technologies: ['Swift', 'Java', 'Mobile'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/WTCMessenger',
    date: '2023'
  },
  {
    id: 'waste-reporting',
    title: 'Waste Reporting System',
    description: {
      pt: 'Sistema corporativo robusto para emissão e gestão de relatórios, desenhado para fluxos de dados de alta disponibilidade.',
      en: 'Robust corporate system for report generation and management, designed for high-availability data flows.'
    },
    technologies: ['C#', '.NET', 'Enterprise'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/WasteReporting',
    date: '2022'
  }
]
