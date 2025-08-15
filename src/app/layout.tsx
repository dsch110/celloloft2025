import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import { CartProvider } from '@/app/cello-sheet-music/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cello Loft',
  description: 'Advanced cello education and sheet music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navigation />
          {/* Add padding-top to account for fixed navigation */}
          <div className="pt-16">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
} 