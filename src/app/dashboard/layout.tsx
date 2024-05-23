import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
//import { Open_Sans, Roboto_Mono } from 'next/font/google'
import Providers from '../Providers'
import Navbar from '@/components/Navbar'
import Dashborad from '@/components/Dashborad'
import SideNavbar from '@/components/SideNavbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEA App',
  description: 'Informatica WEBAPP',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* <div className="grid grid-flow-row auto-rows-max"> */}
      <div className='fixed top-0 z-50 w-full'>
        <Navbar />
      </div>
      {/* <div className='grid grid-flow-col auto-cols-max h-screen'> */}
      <div className=''>
        <div className='z-50'>
          <SideNavbar />
        </div>
        <div className='lg:pl-60 pt-24 p-4 z-10'>
          {children}
        </div>
      </div>
    </div>

  )
}
