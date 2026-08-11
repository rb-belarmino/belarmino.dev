export interface Experience {
  id: string
  role: {
    pt: string
    en: string
  }
  company: string
  period: {
    pt: string
    en: string
  }
  description: {
    pt: string
    en: string
  }
  achievements: {
    pt: string[]
    en: string[]
  }
}

export const experiences: Experience[] = [
  {
    id: 'stone-swe',
    role: {
      pt: 'Engenheiro de Software',
      en: 'Software Engineer'
    },
    company: 'Stone',
    period: {
      pt: 'Abr 2023 - Mar 2026',
      en: 'Apr 2023 - Mar 2026'
    },
    description: {
      pt: 'Desenvolvimento de integrações sistêmicas em Python, aplicando padrões de Clean Architecture em ambiente Multi-Cloud.',
      en: 'Development of system integrations in Python, applying Clean Architecture patterns in a Multi-Cloud environment.'
    },
    achievements: {
      pt: [
        'Integrações críticas escaláveis e de fácil manutenção utilizando Clean Architecture.',
        'Atuação em ambiente Multi-Cloud com Azure, OCI e GCP.',
        'Monitoramento e observabilidade ativa via dashboards no Grafana.'
      ],
      en: [
        'Critical, scalable, and maintainable integrations using Clean Architecture.',
        'Operations in a Multi-Cloud environment utilizing Azure, OCI, and GCP.',
        'Active monitoring and observability via Grafana dashboards.'
      ]
    }
  },
  {
    id: 'stone-field',
    role: {
      pt: 'Analista de Campo / Infra',
      en: 'Field / Infra Analyst'
    },
    company: 'Stone',
    period: {
      pt: 'Mar 2020 - Abr 2023',
      en: 'Mar 2020 - Apr 2023'
    },
    description: {
      pt: 'Gerenciamento de infraestrutura, servidores Windows e redes internas para garantir o melhor atendimento aos colaboradores.',
      en: 'Infrastructure, Windows servers, and internal networks management to ensure optimal support for collaborators.'
    },
    achievements: {
      pt: [
        'Administração de serviços corporativos: Active Directory, File Server e DHCP.',
        'Suporte e configuração técnica para sistemas Windows/macOS e hardwares.',
        'Configuração de conectividade segura e acessos remotos via VPN.'
      ],
      en: [
        'Administration of corporate services: Active Directory, File Server, and DHCP.',
        'Technical support and configuration for Windows/macOS systems and hardware.',
        'Configuration of secure connectivity and corporate remote access via VPN.'
      ]
    }
  },
  {
    id: 'alamo-sup',
    role: {
      pt: 'Analista de Suporte Pleno',
      en: 'Senior Support Analyst'
    },
    company: 'ÁLAMO ENGENHARIA',
    period: {
      pt: 'Mai 2017 - Fev 2020',
      en: 'May 2017 - Feb 2020'
    },
    description: {
      pt: 'Gerenciamento avançado de sistemas Windows/Linux, infraestrutura de redes e suporte contínuo a usuários e clientes.',
      en: 'Advanced management of Windows/Linux systems, network infrastructure, and continuous support for users and clients.'
    },
    achievements: {
      pt: [
        'Administração de sistemas Linux, AD e rotinas de Storage/Backup automatizado.',
        'Suporte ao sistema ERP Totvs para assegurar fluxos empresariais.',
        'Manutenção de Servidores Virtuais (Hyper-V) e firewall corporativo.'
      ],
      en: [
        'Administration of Linux systems, AD, and automated Storage/Backup routines.',
        'Support for the Totvs ERP system to ensure business workflows.',
        'Maintenance of Virtual Servers (Hyper-V) and corporate firewall.'
      ]
    }
  },
  {
    id: 'band-sup',
    role: {
      pt: 'Técnico de Suporte Pleno',
      en: 'Media Support Technician'
    },
    company: 'BAND (TV Bandeirantes)',
    period: {
      pt: 'Mai 2013 - Mar 2017',
      en: 'May 2013 - Mar 2017'
    },
    description: {
      pt: 'Suporte multiplataforma e gerenciamento de sistemas críticos de transmissão e vigilância no ecossistema de TV e Rádio.',
      en: 'Cross-platform support and management of critical broadcast and surveillance systems within the TV and Radio ecosystem.'
    },
    achievements: {
      pt: [
        'Monitoramento contínuo de redes e serviços de streaming de alta disponibilidade.',
        'Administração de servidores FTP, Encoders e Ilhas de Edição de vídeo.',
        'Supervisão ininterrupta de Playlists de rádios e TVs.'
      ],
      en: [
        'Continuous monitoring of networks and high-availability streaming services.',
        'Administration of FTP servers, Encoders, and video editing workstations.',
        'Uninterrupted supervision of radio and TV broadcasting playlists.'
      ]
    }
  },
  {
    id: 'zimpy-it',
    role: {
      pt: 'Técnico de Informática',
      en: 'IT Technician'
    },
    company: 'Zimpy',
    period: {
      pt: 'Out 2010 - Mai 2013',
      en: 'Oct 2010 - May 2013'
    },
    description: {
      pt: 'Suporte técnico para usuários na fábrica e lojas, otimizando o ecossistema de PDVs e retaguarda.',
      en: 'Technical support for users in the factory and stores, optimizing the POS ecosystem and back-office operations.'
    },
    achievements: {
      pt: [
        'Assistência contínua aos usuários do sistema PDV para processos de vendas.',
        'Manutenção de servidores virtualizados (VMWARE) e gestão de Storage.',
        'Implementação do sistema de tickets OCOMON.'
      ],
      en: [
        'Continuous assistance to POS system users for sales processes.',
        'Maintenance of virtualized servers (VMWARE) and Storage management.',
        'Implementation of the OCOMON ticket system.'
      ]
    }
  }
]
