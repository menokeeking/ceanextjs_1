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

        try {
            setError('');
            setLoading(true);
            const res = await signIn("credentials", {
                email: data.fullname,
                password: data.password,
                redirect: false,
            });

            if (!res?.error) {

                esinicio()
                router.push("/dashboard/principal");
            }
            else {
                //actidemp()
                setError('Cualquier cosa')
                setLoading(false)
            }
        } catch (error: any) {
            console.log("hola del catch error")
            setLoading(false)
            setError('Cualquier cosa')
        }

    })

    const convertirAMayusculas = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    };

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-100">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">{titulo} </h1>
                </div>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Usuario</label>
                        <input {...register("fullname", { required: true })}
                            type="text" id="fullname"
                            onInput={convertirAMayusculas}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Capture el Usuario" />
                        {errors.fullname && <p className='text-red-600 text-xs py-1'>Este campo es requerido!</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Password</label>
                        <input {...register("password", { required: true })} 
                            type="password" id="password" 
                            placeholder="•••••" 
                            onInput={convertirAMayusculas}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-00 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {errors.password && <p className='text-red-600 text-xs py-1'>Este campo es requerido!</p>}
                    </div>

                    <button disabled={loading} type="submit" className="w-full text-white bg-primary-900 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-900 dark:hover:bg-primary-800 dark:focus:ring-primary-500">{loading ? "Procesando..." : "Iniciar Sesión"}</button>

                </form>
                {error &&
                    <div className="w-full items-center">
                        <Alert message="El Usuario o Contraseña son incorrectos" timeout={1500} />
                    </div>
                }
            </div>

        </div>

    )

}