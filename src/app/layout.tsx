import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
//import { Open_Sans, Roboto_Mono } from 'next/font/google'
import Providers from './Providers'
import Navbar from '@/components/Navbar'
import Dashborad from '@/components/Dashborad'
import SideNavbar from '@/components/SideNavbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEA App',
  description: 'Informatica WEBAPP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
