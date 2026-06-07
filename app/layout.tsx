import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HAMPAR Spirituals — Temple-Grade Agarbatti & Dhupbatti',
  description: 'Charcoal-free, handcrafted incense from Jhansi. Premium agarbatti and dhupbatti made from pure botanicals. QR purity verified.',
  keywords: 'agarbatti, dhupbatti, incense, natural, charcoal-free, Jhansi, temple-grade, HAMPAR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
