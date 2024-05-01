'use client'
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Alert from '@/app/login/Alert';
import { useCounterStore } from '@/store/counterStore';


interface Props {
    titulo: string;
}

export const FormLogin = ({ titulo }: Props) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const esinicio = useCounterStore(state => state.esinicio)


    const onSubmit = handleSubmit(async (data) => {
        
        setError('');
        setLoading(true);
        const res = await signIn("credentials", {
            email: data.fullname,
            password: data.password,
            redirect: false,
        });

        console.log(res)
        setLoading(false);
        if (res?.error) setError(res.error as string);
        if (res?.ok) {
            esinicio()
            router.push("/dashboard/principal");
        }

    })



    return (

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{titulo} </h1>
                </div>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                        <input {...register("fullname", { required: true })} type="text" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Capture el Usuario" />
                        {errors.fullname && <p className='text-red-600 text-xs'>Este campo es requerido!</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input {...register("password", { required: true })} type="password" id="password" placeholder="•••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {errors.password && <p className='text-red-600 text-xs'>Este campo es requerido!</p>}
                    </div>

                    <button disabled={loading} type="submit" className="w-full text-white bg-primary-900 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? "Procesando..." : "Iniciar Sesión"}</button>

                </form>
                {error &&
                    // <div id="toast-danger" className="space-y-2 md:space-y-2 sm:p-2 bg-gray-100 rounded-lg  dark:text-gray-400 dark:bg-gray-800" role="alert">

                    //     <div className="ms-3 text-sm font-semibold text-red-500">Las credenciales NO son válidas.</div>
                    // </div>
                    
                    //<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <div className="w-full items-center">
                        <Alert message="El Usuario o Contraseña son incorrectos" timeout={2000} />
                    </div>
                }

            </div>

        </div>

    )

}