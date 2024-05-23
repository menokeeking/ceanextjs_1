import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEA App',
  description: 'Informatica WEBAPP',
}

export default function LoginLayout({children,} : {children: React.ReactNode}) {
  return (

<div>
{children}
</div>
     
      

  )
}
