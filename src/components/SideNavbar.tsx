"use client";

import React from "react"
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react'

function SideNavbar() {
    const { data: session } = useSession();

    return (
        session ?
        <div className="w-48 bg-gray-100 h-screen px-4 py-1">
            <div className='my-1 mb-4 flex justify-center items-center'>
                {/* <Image src={"/assets/cealogonavbar2.png"} alt="logo" width={144} height={56} /> */}
                <h1>Menu Principal</h1>
            </div>
            <hr className=" border-gray-400"/>
            <ul className='mt-4 text-gray-600 font-bold text-sm py-3'>
                <li className="mb-2 rounded hover:shadow hover:bg-gray-300 py-3">
                    <a href="/">
                    <div className=" mx-4">
                        {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                        Generar
                        </div>
                    </a>
                    
                </li>
                <li className="mb-2 rounded hover:shadow hover:bg-gray-300 py-3">
                    <a href="/">
                    <div className=" mx-4">
                        {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                        Reportes
                    </div>
                    </a>
                </li>
                <li className="mb-2 rounded hover:shadow hover:bg-gray-300 py-3">
                    
                    <a href="/">
                    <div className=" mx-4">
                        {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                        Configuración
                    </div>
                    </a>
                </li>
            </ul>
        </div>
        :
        <>
        </>
    )
}
export default SideNavbar;