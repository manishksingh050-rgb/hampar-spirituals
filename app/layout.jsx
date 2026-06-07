import './globals.css'

export const metadata = {
  title: 'HAMPAR Spirituals — Pure Sacred Fragrance',
  description: 'Temple-grade agarbatti and dhupbatti, handcrafted in Jhansi.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}