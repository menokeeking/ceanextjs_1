"use client"

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function Loginpage() {

  const [error, setError] = useState('');
  const [hidden, setHidden] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit  = (formData) => {
    console.log('!!!')
  }

 

  const handleSubmitbtn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
    const formData = new FormData(e.currentTarget)
    

    //const res = await axios.post('http://200.56.97.5:7281/api-viaticos/Auth/login?user='+formData.get('fullname')+'&password='+formData.get('password'));

    const res = await signIn("credentials", {
      email: formData.get('fullname'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/dashboard/principal");


  };

  return (

    <div className='w-screen'>
      
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center px-4 py-8 mx-auto md:h-screen lg:py-16">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image src={"/assets/logo.png"} priority={true} alt="logo" width={400} height={100} className='m-6'/>
          </a>
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Mi Primer Login
              </h1>
              <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                  <input name="fullname" type="text"  id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Capture el Usuario"/>
                  <p></p>
                </div>
                <div> 
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
                <button type="submit" className="w-full text-white bg-primary-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar Sesión</button>
                
              </form>
              {error && 
              <div id="toast-danger" hidden={hidden} className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">Las credenciales no son válidas.</div>
              </div>
            }

            </div>
           
          </div>
          
        </div>
      </section>


    </div>

  )
}

export default Loginpage