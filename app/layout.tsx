import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RouteGuard from '@/components/RouteGuard'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spacify - Smart Parking System',
  description: 'Find and book the best parking spots in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RouteGuard>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  )
}
