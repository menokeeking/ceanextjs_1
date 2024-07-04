"use client"

import { Accesodenegado } from '@/components/acceso_denegado';
import Alert_s from '@/components/alerta_success';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react'
import Link from "next/link";
import { useState } from 'react';

function ProfilePage() {

  const { data: session, status } = useSession()

  const [texto1, setTexto1] = useState('');
  const [texto2, setTexto2] = useState('');
  const [texto3, setTexto3] = useState(['', false]);
  const [error, setError] = useState('');

  const verificarIgualdad = (event: React.FormEvent<HTMLInputElement>) => {
    const { id: name, value } = event.currentTarget;
    const actpass = value.toUpperCase()
    console.log(name, actpass)
    if (name == "pass1") {
      setTexto1(actpass)
      if (actpass === texto2) {
        if (actpass === '') {
          setTexto3(["", false])
        } else {
          setTexto3(["SI COINCIDEN", true])
        }

      } else {
        setTexto3(["NO COINCIDEN", false])
      }
    } else {
      setTexto2(actpass)
      if (texto1 === actpass) {
        if (actpass === '') {
          setTexto3(["", false])
        } else {
          setTexto3(["SI COINCIDEN", true])
        }
      } else {
        setTexto3(["NO COINCIDEN", false])
      }
    }

  };



  const HandlerActualizar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setError('')
    event.preventDefault();
    const usuario = session?.user.empkey;
    const url = '/api/usuarios'

    const putData = async () => {
      const config = { headers: { 'Content-Type': 'application/json' } };
      try {
        const data = await axios.put(url, { usuario, texto1 }, config);
        setError('Cualquier cosa')
        setTexto1('')
        setTexto2('')
        setTexto3(['', false])
        //console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    putData();
  };

  return (

    session?.user.rol == 1 ?
      <>

        <div className="flex flex-col justify-center items-center mt-4 lg:p-8 lg:m-8">
          <div className="w-full lg:w-96 ">
            {error &&
              <Alert_s message="La contraseña ha sido reestablecida" timeout={2500} />
            }
          </div>
          <div className="p-2">
            <div className="bg-gray-100 border border-gray-200 shadow-md w-full rounded-lg px-6 py-4 mb-4">
              <div className="flex flex-col items-center gap-1 mb-4">
                <h1 className="text-xl text-gray-600">Actualiza tu Contraseña</h1>
                <p className="text-gray-400 text-sm">
                  Captura una nueva contraseña
                </p>
              </div>

              <div className='flex justify-end items-center py-2'>

                <div className='px-2'>
                  <p className={`text-${texto3[1] ? 'green-900' : 'red-700'}  text-xs`}>
                    {texto3[0]}
                  </p>
                </div>
                {texto1 !== '' && (
                  <div className={`text-${texto3[1] ? 'green-900' : 'red-700'}  h-4 w-4`}>
                    {texto3[1] ? <CheckIcon /> : <XMarkIcon />}
                  </div>
                )}
              </div>
              <form className="flex flex-col gap-3 px-4 py-2 w-80">
                <div className="text-sm ">
                  <input
                    type="password"
                    id="pass1"
                    value={texto1}
                    onChange={verificarIgualdad}

                    className="w-full border py-2.5 px-4 rounded-md outline-none dark: text-gray-500"
                    placeholder="Ingresa la nueva contraseña"
                  />

                </div>

                <div className="text-sm">
                  <input
                    type="password"
                    id="pass2"
                    value={texto2}
                    //onClick={verificarIgualdad}
                    //onChange={(e) => setTexto2(e.target.value)}
                    onChange={verificarIgualdad}
                    className="w-full border py-2.5 px-4 rounded-md outline-none dark: text-gray-500"
                    placeholder="Captura de nuevo"
                  />

                </div>

                <div>
                  <button
                    onClick={HandlerActualizar}
                    disabled={!texto3[1]}
                    className={`w-full bg-primary-900 py-2 text-white rounded-md ${!texto3[1] ? 'bg-gray-500' : 'hover:bg-primary-700 transition-colors'}`}
                  >
                    Reestablecer
                  </button>


                </div>
              </form>
            </div>
            <span className="flex items-center justify-center gap-2">
              Regresar al {" "}
              <Link href="/dashboard/principal">
                Menú Principal
              </Link>
            </span>
          </div>

        </div>

      </>

      :
      <>
        <Accesodenegado />
      </>
  )
}

export default ProfilePage