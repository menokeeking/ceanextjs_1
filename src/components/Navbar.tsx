"use client";
import Link from 'next/link'
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    //const session = await getServerSession();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [ year, setYear ] = useState(new Date().getFullYear());

    const closeModal = () => {
        setIsOpen(false);
      };
    
      const openModal = () => {
        setIsOpen(true);
      };
    
      const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(Number(e.target.value));
      };
    
    //console.log(session?.user)

    return (
        session ?
        <>
            <nav className=' bg-primary-900 p-1 w-full'>
                <div className='flex justify-between mx-auto px-8'>
                    <Link href="/dashboard/principal">
                        {/* <h1 className="font-bold text-white text-xl">Dashboard</h1> */}
                        <Image src={"/assets/cealogonavbar.png"} alt="logo" width={144} height={56} />
                    </Link>
                    <ul className='flex gap-x-2 align-middle'>
                        {/* <li className='px-3 py-1  text-white'>
                            <Link href="/dashboard/profile">Perfil</Link>
                        </li>
                        <li className='px-3 py-1  text-white'>
                            <Link href="/about">Acerca de</Link>
                        </li>
                        <li className='px-3 py-1  text-white'>
                            <Link href="/register">Registro</Link>
                        </li> */}

                       
                        <li className='py-4'>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <UserCircleIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    {session.user?.name}
                                    
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                               <Link href="/dashboard/profile" className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-xs'
                                                )}>Configuración del Perfil</Link>
                                                    
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    //href="#"
                                                    onClick={openModal}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-xs'
                                                    )}
                                                >
                                                    Cambio de Ejercicio
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        onClick={() => signOut({ callbackUrl: '/login', redirect:true })}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-xs'
                                                        )}
                                                    >
                                                        Salir
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        </li>
                        <li className='py-4 px-4  text-white'>
                            <p className="text-xs text-gray-300">{session.user?.fullname}</p>
                            <p className="text-xs text-gray-300">{session.user?.depto}</p>
                        </li>
                    </ul>
                </div>
            </nav>
            <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-md leading-6 text-gray-900"
                >
                  Captura el Ejercicio
                </Dialog.Title>
                <div className="mt-2 flex">
                  <input
                    type="number"
                    onChange={handleYearChange}
                    value={year}
                    className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none"
                    placeholder="Captura el año"
                  />
                
                  <button
                    type="button"
                    className="px-8 py-2 text-sm font-medium text-white bg-primary-900 rounded-md hover:bg-primary-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Captar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
            </>

         
            :
            <>

            </>
    )
}

export default Navbar