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
    id: 'garage-flow',
    title: 'AAW GarageFlow',
    description: {
      pt: 'Sistema de gestão de ordens de serviço e rastreamento de manutenção recorrente para frotas de concessionárias automotivas.',
      en: 'Automotive shop work order and recurring maintenance tracking system for US dealership fleets.'
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/AAW-GarageFlow',
    liveUrl: 'https://aaw-garage-flow.vercel.app/',
    date: '2026'
  },
  {
    id: 'vizin',
    title: 'Vizin',
    description: {
      pt: 'Aplicação e plataforma interativa focada na comunidade e engajamento local.',
      en: 'Interactive application and platform focused on local community and engagement.'
    },
    technologies: ['Frontend', 'HTML', 'JS/TS'],
    imageUrl: '/vizin.png',
    repoUrl: 'https://github.com/rb-belarmino/vizin',
    date: '2023'
  },
  {
    id: 'bot-slack',
    title: 'Slack Bot Integration',
    description: {
      pt: 'Integração automatizada via bot para o Slack visando agilizar operações e comunicação corporativa.',
      en: 'Automated bot integration for Slack aimed at streamlining operations and corporate communication.'
    },
    technologies: ['Bot', 'Slack API', 'Node.js'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/bot-slack',
    date: '2023'
  },
  {
    id: 'nosso-quintal-bar',
    title: 'Nosso Quintal Bar',
    description: {
      pt: 'Plataforma web comercial para um bar e restaurante, otimizada e hospedada via Vercel.',
      en: 'Commercial web platform for a bar and restaurant, optimized and hosted via Vercel.'
    },
    technologies: ['HTML/CSS', 'Frontend', 'Vercel'],
    imageUrl: '/nosso-quintal.png',
    repoUrl: 'https://github.com/rb-belarmino/nosso_quintal-bar',
    liveUrl: 'https://nossoquintal.vercel.app/',
    date: '2022'
  },
  {
    id: 'wtc-messenger',
    title: 'WTCMessenger',
    description: {
      pt: 'Aplicativo de comunicação corporativa nativo, englobando desenvolvimento móvel em Swift e backend em Java.',
      en: 'Native corporate communication application encompassing mobile development in Swift and Java backend.'
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
      pt: 'Sistema corporativo robusto para emissão e gestão de relatórios sustentáveis de resíduos.',
      en: 'Robust corporate system for the generation and management of sustainable waste reports.'
    },
    technologies: ['C#', '.NET', 'Enterprise'],
    imageUrl: '',
    repoUrl: 'https://github.com/rb-belarmino/WasteReporting',
    date: '2022'
  }
]
