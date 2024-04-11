import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
          <div>
            <div className="grid grid-flow-row auto-rows-max">
              <div className='sticky top-0 z-50'>
                <Navbar />
              </div>
              <div className='grid grid-flow-col auto-cols-max h-screen'>
                <div>
                  <SideNavbar />
                </div>
                <div className=''> 
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
