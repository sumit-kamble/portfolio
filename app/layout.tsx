import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/components/providers'
import type { Metadata } from '@/node_modules/next/types'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Sumit Kamble',
  description:
    'Software engineer specializing in JavaScript, Next.js, and backend development.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-col ${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
