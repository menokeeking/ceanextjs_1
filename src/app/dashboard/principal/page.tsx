"use client"
import { useSession } from 'next-auth/react'

function Principal() {

  const { data: session, status } = useSession()
  //console.log(session, status)
  return (
    <div className=''>
      <div className="">
        <h1>Dashboard Principal</h1>  
        </div>
    </div>

  )
}

export default Principal