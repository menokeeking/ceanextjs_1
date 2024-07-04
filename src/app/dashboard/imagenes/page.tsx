"use client"
import { useRef, useState } from 'react';
import Image from 'next/image';
import Alert_s from '@/components/alerta_success';

function Imagenes() {

    const [selectedImage, setSelectedImage] = useState<File | null>();
    const [succefull, setsuccefull] = useState(false)
    const inputFileRef = useRef<HTMLInputElement>(null)


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setsuccefull(false)
        setSelectedImage(file);
    };

    const formclean = () => {
        setSelectedImage(null)
        inputFileRef.current!.value = "";

    }

    const handleImageUpload = async () => {
        if (selectedImage) {

            try {
                const form = new FormData()
                form.set('file', selectedImage)
                // Aquí puedes enviar la imagen al servidor (por ejemplo, mediante una API REST)
                //console.log('Imagen seleccionada:', selectedImage.name);
                // Implementa la lógica para guardar la imagen en el servidor
                const res = await fetch('/api/upload', {
                    method: "POST",
                    body: form
                })

                if (res.ok) {
                    console.log("File uploaded")
                    setsuccefull(true)
                    formclean()

                }
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }


        }
    };

    return (
        <>
            <div className='flex flex-col py-6 justify-center items-center'>
                <div className='bg-gray-100 border shadow p-4'>
                    <h1 className='text-4xl text-center my-2'>Subir Imagenes</h1>
                    <div className='py-6'>
                        <form onSubmit={(e) => { e.preventDefault() }}>

                            <input className='bg-gray-200 text-xs text-gray-900 p-4 rounded-md block mb-2 '
                                name="mrr"
                                ref={inputFileRef}
                                type='file'
                                accept="image/jpeg"
                                onChange={handleImageChange} />

                            <button
                                onClick={handleImageUpload}
                                className='w-full bg-primary-900 py-2 text-white rounded-md block disabled:opacity-50 '
                                disabled={!selectedImage}>
                                Subir
                            </button>
                        </form>
                    </div>

                    {selectedImage && (
                        <Image
                            src={URL.createObjectURL(selectedImage)}
                            alt="upload file"
                            className='w-64 h-64 object-cover mx-auto p-2'
                            width={256}
                            height={256}
                        />
                    )}
                </div>
                <div className='p-4'>
                    {succefull &&
                        <Alert_s message="La imagen ha sido cargada" timeout={5000} />
                    }
                </div>
            </div>

        </>
    )
}

export default Imagenes