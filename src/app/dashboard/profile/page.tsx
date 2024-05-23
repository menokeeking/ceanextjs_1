"use client"
import { useSession } from 'next-auth/react'

function ProfilePage() {

  const { data: session, status } = useSession()

  return (
    session ?
      <>
        <div className='bg-rose-500 content-center' >
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p><p>Hola Mundo</p>
          <p>Hola Mundo</p>


        </div >
      </>
      :
      <>
      </>
  )
}

export default ProfilePage