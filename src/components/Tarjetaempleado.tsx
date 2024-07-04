'use client'
import { useCounterStore } from '@/store/counterStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Tarjetaempleado({ params }: { params: { noemp: string } }) {

    const [pathimg, setpathimg] = useState(`/images/p1.jpg`)
    const nombredin = useCounterStore((state) => state.nombredinamico)

    //console.log("Hola", nombredin)
    let imagePath = `/images/p${params.noemp}.jpg`;
    let anyExistingImage = "/images/p1.jpg";

    const isImageFound = async (imageName: string) => {
        try {
            return await fetch(`${imageName}`, {
                method: "HEAD",
            })
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    useEffect(() => {
        try {
            const verificar = async () => {
                const result = await isImageFound(imagePath);
                if (result?.status === 404) {
                    setpathimg(anyExistingImage)
                } else {
                    setpathimg(imagePath)
                }
            }
            verificar();
        } catch (error) {
            setpathimg(anyExistingImage)
        }
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 border rounded-lg bg-gray-100">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 p-4">
                <Image src={pathimg} alt={`Imagen ${params.noemp}`} width={50} height={50} className="rounded-full ring-gray-500 shadow" />
                <div className=''>
                    <h3 className="block font-semibold text-xl md:text-2xl text-gray-700">
                        {nombredin}
                    </h3>
                    <p className="text-gray-600 text-center lg:text-left">Empleado de la CEA</p>
                </div>
            </div>
        </div>
    )
}

export default Tarjetaempleado