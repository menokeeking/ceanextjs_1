"use client"
import { useSession } from 'next-auth/react'

function ProfilePage() {

  const { data: session, status } = useSession()
  //console.log(session, status)
  return (

    <div className='mx-auto'>
      <section className="bg-white-500 dark:bg-gray-900">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-16">
          <h1>Perfil del Usuario</h1> 
        </div>
      </section>
    </div>
    
  )
}

export default ProfilePage