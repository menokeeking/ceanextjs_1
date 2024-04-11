"use client";

import React from "react"
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react'
import Link from "next/link";

function SideNavbar() {
    const { data: session } = useSession();

    return (
        session ?
        <div className="w-48 bg-gray-100 h-screen px-4 py-1">
            <Link href="/dashboard/principal">
            <div className='text-primary-900 my-2 mb-4 flex justify-center items-center text-sm font-bold'>
                {/* <Image src={"/assets/cealogonavbar2.png"} alt="logo" width={144} height={56} /> */}
                <h1>Menu Principal</h1>
            </div>
            </Link>
            <hr className=" border-gray-400"/>
            <ul className='mt-4 text-gray-600 font-bold text-md py-1'>
                <li className="mb-2 rounded hover:shadow hover:bg-gray-300 py-3">
                    <a href="/">
                    <div className=" mx-4">
                        {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                        Generar - Usuarios
                        </div>
                    </a>
                    
                </li>
                <li className="mb-2 rounded hover:shadow hover:bg-gray-300 py-3">
                    <Link href="/dashboard/Datatables">
                    <div className=" mx-4">
                        {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                        Reportes - Viaticos
                    </div>
                    </Link>
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