import type { Metadata } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin']
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://belarmino.dev'),
  title: 'Rodrigo Belarmino | belarmino_dev',
  description: 'Portfólio de engenharia de software e desenvolvimento full-stack.',
  openGraph: {
    title: 'Rodrigo Belarmino | belarmino_dev',
    description: 'Arquitetando sistemas modernos, escaláveis e seguros.',
    url: 'https://belarmino.dev',
    siteName: 'belarmino.dev',
    locale: 'pt_BR',
    type: 'website',
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
        {children}
      </body>
    </html>
  )
}
