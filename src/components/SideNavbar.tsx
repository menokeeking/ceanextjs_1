"use client";

import React, {useState} from "react"
import { useSession, signOut } from 'next-auth/react'
import Link from "next/link";
import { ArrowRightCircleIcon, Bars3BottomRightIcon, Cog8ToothIcon, DocumentIcon, DocumentTextIcon, PlusCircleIcon, XMarkIcon, } from '@heroicons/react/20/solid'

function SideNavbar() {
    const { data: session } = useSession();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () =>{
        setShowMenu(!showMenu);
    }

    return (
        session ?
            <div className={`bg-gray-100 fixed ${showMenu ? "left-0" : "-left-full"} w-3/4 md:w-56 lg:left-0 h-full p-4 flex flex-col justify-between transition-all overflow-y-scroll`}>
                <div>
                    <Link href="/dashboard/principal" onClick={toggleMenu}>
                        <div className='text-primary-900 my-2 mb-4 mt-20 flex justify-center items-center font-bold uppercase'>
                            <h1 className="hover:text-primary-800" >Menu Principal</h1>
                        </div>
                    </Link>
                    <hr className=" border-gray-400" />
                    <ul className='mt-8 text-gray-600 '>
                        <li className="mb-4 rounded hover:shadow hover:bg-gray-400 hover:text-gray-200 transition-colors py-2">
                            <Link href="/dashboard/principal" onClick={toggleMenu}>
                                <div className="mx-3 flex items-center gap-2 text-lg">
                                    <PlusCircleIcon className="h-5 w-5 " aria-hidden="true" />
                                    Generar
                                </div>
                            </Link>
                        </li>
                        <li className="mb-4 rounded hover:shadow hover:bg-gray-400 hover:text-gray-200 transition-colors py-2">
                            <Link href="/dashboard/Datatables" onClick={toggleMenu}>
                                <div className="mx-3 flex items-center gap-2 text-lg">
                                    <DocumentTextIcon className="h-5 w-5 " aria-hidden="true" />
                                    Reportes
                                </div>
                            </Link>
                        </li>
                        <li className="mb-4 rounded hover:shadow hover:bg-gray-400 hover:text-gray-200 transition-colors py-2">
                            <Link href="/dashboard/principal" onClick={toggleMenu}>
                                <div className="mx-3 flex items-center gap-2 text-lg">
                                    <Cog8ToothIcon className="h-5 w-5 " aria-hidden="true" />
                                    Configuración

                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-6 text-gray-600 mb-2 rounded hover:shadow hover:bg-gray-400 hover:text-gray-200 transition-colors py-2">
                    <Link href="/" onClick={() => {
                                  localStorage.removeItem('mrr-storage'),
                                  signOut({ callbackUrl: '/login', redirect: true })
                                }}>
                        <div className="mx-4 flex items-center gap-2 text-lg">
                            {/* <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome> */}
                            <ArrowRightCircleIcon className="h-5 w-5 " aria-hidden="true" />
                            Salir
                        </div>
                    </Link>
                </div>
                <button 
                    onClick={toggleMenu}
                    className="lg:hidden fixed right-6 bottom-6 h-8 w-8 bg-gray-300 text-gray-600 rounded-full p-1 z-50" aria-hidden="true">
                    {showMenu ? <XMarkIcon /> : <Bars3BottomRightIcon/>}
                </button>
            </div>
            :
            <>
            </>
    )
}
export default SideNavbar;