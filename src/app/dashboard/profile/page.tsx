"use client"
import { useSession } from 'next-auth/react'

function ProfilePage() {

  const { data: session, status } = useSession()
  //console.log(session, status)
  return (

    <div className=''>
      <section className="bg-white-500 dark:bg-gray-900">
        <div className="">
          <h1>Perfil del Usuario</h1> 
        </div>
      </section>
    </div>
    
  )
}

export default ProfilePage