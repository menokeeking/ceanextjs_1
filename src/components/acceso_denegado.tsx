import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const Accesodenegado = () => {

    const router = useRouter();

    useEffect(() => {
        // Inicia un temporizador (por ejemplo, 5 segundos)
        const timer = setTimeout(() => {
          // Redirige a la página B
          router.push('/dashboard/principal');
        }, 3000); // 5000 ms = 5 segundos
    
        // Limpia el temporizador al desmontar el componente
        return () => clearTimeout(timer);
      }, []);

    return (
        <div className="flex flex-col justify-center items-center mt-4 lg:p-8 lg:m-8">
            <div className="p-2">
                <div className="bg-gray-200 border border-gray-200 shadow-md w-full rounded-lg px-12 py-4 mb-2">
                    <div className="flex flex-col items-center gap-1 mb-4">
                        <h1 className="text-xl text-red-500">Acceso Denegado</h1>
                        <p className="text-gray-800 text-sm">
                            No esta permitido el acceso a esta sección
                        </p>
                    </div>
                </div>
                <span className="flex items-center justify-center gap-2 ">
                    Regresar al {" "}
                    <Link href="/dashboard/principal">
                        <p className="text-gray-900 text-bold uppercase"> Menú Principal</p>
                    </Link>
                </span>
            </div>
        </div>
    )
}