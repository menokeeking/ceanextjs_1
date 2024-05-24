'use client'
import { useCounterStore } from '@/store/counterStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Tarjetaempleado({ params }: { params: { noemp: string } }) {

    const [pathimg, setpathimg] = useState(`/images/p1.jpg`)
    const nombredin = useCounterStore((state) => state.nombredinamico)

    let imagePath = `/images/p${params.noemp}.jpg`;
    let anyExistingImage = "/images/p1.jpg";

    const isImageFound = async (imageName: string) => {
        return await fetch(`http://200.56.97.5:8181${imageName}`, {
            method: "HEAD",
        });
    };

    useEffect(() => {
        try {
            const verificar = async () => {
                const result = await isImageFound(imagePath);
                if (result.status === 404) {
                    setpathimg(anyExistingImage)
                } else {
                    setpathimg(imagePath)
                }
            }
            verificar();
        }catch (error) {
            setpathimg(anyExistingImage)
        }
        
        

        

    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="border rounded-lg bg-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-4">
                    <Image src={pathimg} alt={`Imagen ${params.noemp}`} width={50} height={50} className="rounded-full ring-gray-500" />
                    <div>
                        <h3 className="font-semibold text-xl md:text-2xl text-gray-700">
                            {nombredin}
                        </h3>
                        <p className="text-gray-600">Empleado de la CEA</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tarjetaempleado