"use client";
import Link from 'next/link'
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ArrowRightCircleIcon, ChevronDownIcon, UserCircleIcon, CalendarIcon, UserIcon, CalendarDaysIcon } from '@heroicons/react/20/solid'
import ModalSetejercicio from './ModalSetejercicio';
import { useCounterStore } from '@/store/counterStore';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {

  //const session = await getServerSession();
  const anio = useCounterStore((state) => state.count)
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    //console.log("Cerrar")
    setIsOpen(false);
  };

  const openModal = () => {
    //console.log("Abrir")
    setIsOpen(true);
  };

  return (
    session ?
      <>
        <nav className=' bg-primary-900 py-2'>
          <div className='flex justify-between mx-auto px-8'>

            <Link href="/dashboard/principal">
              <Image src={"/assets/cealogonavbar.png"} alt="logo" width={144} height={56} className='hidden md:block' />
            </Link>

            <ul className='flex gap-x-3 items-center'>
              <li className='py-4'>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <UserCircleIcon className="mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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

                    <Menu.Items className="absolute lg:-right-0  z-50 mt-1 w-48 origin-top-right rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/dashboard/profile"
                              className={classNames(
                                active ? 'flex items-center gap-x-3 bg-gray-200 text-gray-900' : 'flex items-center gap-x-3 text-gray-700',
                                'block px-4 py-1 w-full text-left '
                              )}>
                              <UserIcon className="h-5 w-5 " aria-hidden="true" />
                              Perfil
                              
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              onClick={openModal}
                              className={classNames(
                                active ? 'flex items-center gap-x-3 bg-gray-200 text-gray-900' : 'flex items-center gap-x-3 text-gray-700',
                                'block px-4 py-1 w-full text-left'
                              )}
                            >
                              <CalendarDaysIcon className="h-5 w-5 " aria-hidden="true" />
                              Ejercicio
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              onClick={() => {
                                localStorage.removeItem('mrr-storage'),
                                  signOut({ callbackUrl: '/login', redirect: true })
                              }}
                              className={classNames(
                                active ? 'flex items-center gap-x-3 bg-gray-200 text-gray-900' : 'flex items-center gap-x-3 text-gray-700',
                                'block px-4 py-1 w-full text-left'
                              )}>
                              <ArrowRightCircleIcon className="h-5 w-5 " aria-hidden="true" />
                              Cerrar Sesión</button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
              <li className='py-2 px-2  text-white'>
                <p className="text-xs text-gray-300">{session.user?.fullname}</p>
                {/* <p className="text-xs text-gray-300">{session.user?.depto}</p> */}
                <p className="text-xs font-bold text-gray-100">EJERCICIO: {anio}</p>
              </li>
            </ul>
          </div>
        </nav>
        <div className="">
          <ModalSetejercicio
            isVisible={isOpen}
            CerrarModal={closeModal}
          />
        </div>
      </>
      :
      <>
      </>
  )
}

export default Navbar