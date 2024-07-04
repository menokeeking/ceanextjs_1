import { TruckIcon, XCircleIcon, MagnifyingGlassCircleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react';
import { Controller, FieldValue, FieldValues, useForm } from "react-hook-form"
import { TablaVehiculos } from '@/interfaces/TablaVehiculos';
import { Tabla_VhCatVehiculos } from '@/interfaces/Tabla_VhCatVehiculos';
import Image from 'next/image';
import moment from 'moment';
import CurrencyFormat from './CurrencyFormat';
import MyDatePicker from './DatePicker';
import { DatePickerField } from '@/components/Datepickernull';
import { Vh_estatus } from '@/interfaces/TablaVh_estatus'

interface Props {
    isVisible: boolean;
    onClose: () => void;
    vehiculo: TablaVehiculos;
    estatus: Vh_estatus[];
    isNew: boolean;
    isRepet: boolean;
    recibirModal(tablaviaticos: Tabla_VhCatVehiculos, esnuevo: boolean): void;
    quitarrepet: () => void;
}

const ModalVehiculos = ({ isVisible, onClose, vehiculo, estatus, isNew, isRepet, recibirModal, quitarrepet }: Props) => {

    const [selectedImage, setSelectedImage] = useState<File | null>();
    const [pathimg, setpathimg] = useState(`/uploads/sinimagen.jpg`)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [succefull, setsuccefull] = useState(false)

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm()

    

    //if (isFieldDirty) isRepet = false;
    //console.log(isFieldDirty)

    let imagePath = `/uploads/v${vehiculo.numero}.jpg`;
    let anyExistingImage = "/uploads/sinimagen.jpg";

    const isImageFound = async (imageName: string) => {
        try {
            return await fetch(`${imageName}`, {
                method: "HEAD",
            })
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const numericValue: NumericObject = { amount: vehiculo.importe };
    useEffect(() => {
        if (isVisible) {
            reset()
            console.log(vehiculo)
            setSelectedImage(null)
            setsuccefull(false)


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
        }
    }, [isVisible])


    const onSubmit = handleSubmit((data) => {

        //Aqui debemos preparar un objeto solamente con los campos de la tabla vh_catvehiculos para que se envien para su actualizacion (PUT) o su insert (POST)
        const vh_detalle = {
            numero: data.f_noecon,
            ano: data.f_ano,
            noActivo: data.f_noactivo,
            placas: data.f_placas,
            color: data.f_color,
            odometro: data.f_odometro,
            estatus: data.f_estatus,
            ubicacion: data.f_ubicacion,
            fUltServ: data.f_ultserv == null ? null : data.f_ultserv.toLocaleDateString("en-CA") + 'T00:00:00',
            fProxServ: data.f_ultserv == null ? null : data.f_proxserv.toLocaleDateString("en-CA") + 'T00:00:00',
            //fProxServ: data.f_proxserv.toLocaleDateString("en-CA")+'T00:00:00',
            tipo: data.f_tipo,
            capacidad: data.f_capacidad,
            pernoc: data.f_pernoc,
            comentarios: data.f_comentarios,
        } as Tabla_VhCatVehiculos
        recibirModal(vh_detalle, isNew)



    })

    const CerrarModal = () => {
        reset()
        onClose()
    }


    // Función para convertir el texto a mayúsculas
    const convertirAMayusculas = (event: React.FormEvent<HTMLInputElement>) => {
        //console.log("hola desde no se donde")
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
        if (event.currentTarget.name === 'f_noecon')  quitarrepet() 
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        //setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        event.currentTarget.value = event.currentTarget.value.toUpperCase();

        
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files && event.target.files.length > 0) {
            const fileorg = event.target.files?.[0];

            // Define el nuevo nombre para el archivo
            const nuevoNombre = `v${vehiculo.numero}.jpg`;

            // Crea un nuevo objeto Blob con el contenido del archivo original
            const blob = fileorg.slice(0, fileorg.size, fileorg.type);

            // Crea un nuevo objeto File con el Blob y el nuevo nombre
            const archivoRenombrado = new File([blob], nuevoNombre, { type: fileorg.type });

            setsuccefull(false)
            setSelectedImage(archivoRenombrado);
        }
    };

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
                    //setSelectedImage(null)

                }
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }


        }
    };

    const manejarCambio = (date: Date | null, name: string) => {
        // Aquí puedes agregar más lógica si es necesario
        // if (name == "fechaSalida") {
        //     setValue("diasmrr", calcularDiferenciaFechas(new Date(getValues("fechaRegreso")), date)) //getValues("test")
        // } else {
        //     setValue("diasmrr", calcularDiferenciaFechas(date, new Date(getValues("fechaSalida"))))
        // }
    };

    if (!isVisible) return null;
    return (
        <>
            <div className="py-10 justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-2 mx-auto max-w-4xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-1 outline-gray-300 focus:outline-none">
                        <div className="flex px-4 items-center justify-between p-2 border-b border-solid rounded-t bg-gray-200 ">
                            <div className='flex'>
                                <TruckIcon className=" h-5 w-5 text-gray-500 mx-1" />
                                <h1 className="text-md font-bold text-gray-700 mx-3">{isNew ? "Agregar Nuevo Registro" : `Unidad:  ${vehiculo.numero}`}</h1>
                                <h1 className="text-md font-bold text-gray-700">{isNew ? " " : `No. Activo:  ${vehiculo.noActivo}`}</h1>
                            </div>
                            <button className="bg-transparent border-0 text-white float-right" onClick={onClose}>
                                <span className="text-white opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full hover:bg-gray-300">
                                    <XCircleIcon className=" h-6 w-6 text-white border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" />
                                </span>
                            </button>
                        </div>
                        <div className="relative p-2 flex-auto">
                            {/* Barra de accion  */}
                            <div className={`flex items-center justify-end p-1 font-semibold text-xs ${isNew ? isRepet ? 'bg-primary-900 text-white' : 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {isNew ? "ALTA DE UNIDAD" : "EDITAR UNIDAD"}
                            </div>
                            {/* Area de Informacion */}
                            <div className='grid grid-cols-3 gap-1'>
                                {/* Columna de informacion */}
                                <div className='col-span-3 '>
                                    <div className='p-1 grid grid-cols-1 items-center justify-between content-between '>
                                        <form className="w-full h-" onSubmit={onSubmit} autoComplete="off">
                                            {/* Datos de bm_activos */}
                                            {isNew ?
                                                <div className='px-2 py-6 my-1 bg-white border'>
                                                    <div className='grid grid-cols-5'>

                                                        <div className='px-2 '>
                                                            <label className="block text-sm text-gray-500 dark:text-white"> No. Económico </label>
                                                            <input {...register("f_noecon", { required: true, validate: (value) => value > 0 })}
                                                                type='number'
                                                                name="f_noecon"
                                                                defaultValue={vehiculo.numero}
                                                                //onChange={handleChange}
                                                                onInput={convertirAMayusculas}
                                                                className="w-30 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                            {errors.f_noecon?.type === "required" && <p className='text-red-600 text-xs italic px-2 py-1'>Requerido</p>}
                                                            {errors.f_noecon?.type === "validate" && <p className='text-red-600 text-xs italic px-2 py-1'>NO Válido</p>}
                                                        </div>
                                                        <div className='px-2 col-span-4'>
                                                            <label className="block text-sm text-gray-500 dark:text-white"> No. Activo </label>
                                                            <input {...register("f_noactivo", { required: true })}
                                                                name="f_noactivo"
                                                                //onChange={handleChange}
                                                                defaultValue={vehiculo.noActivo}
                                                                onInput={convertirAMayusculas}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                            {errors.f_noactivo && <p className='text-red-600 text-xs italic px-2'>Requerido</p>}
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div className='bg-gray-100 px-2 py-2'>
                                                    <div className='grid grid-cols-8'>
                                                        <div className='col-span-1'>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Marca</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Modelo</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Serie</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Resguardo</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Empleado</h1>
                                                        </div>
                                                        <div className='col-span-2'>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.marca}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.modelo}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.serie}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.resguardo}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.resguardante}</h1>
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Depto.</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Importe</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">F. Adq.</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">No. Seguro</h1>
                                                            <h1 className=" text-gray-400 text-xs py-0.5">Vigencia</h1>
                                                        </div>
                                                        <div className='col-span-2'>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.depto}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5"><CurrencyFormat numericObject={numericValue} /></h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{moment(vehiculo.fechaAdq).format('DD/MM/YYYY')}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.noSeguro == undefined ? "*" : vehiculo.noSeguro}</h1>
                                                            <h1 className=" text-gray-900 text-xs py-0.5">{vehiculo.vigencia == undefined ? "*" : moment(vehiculo.vigencia).format('DD/MM/YYYY')}</h1>
                                                        </div>
                                                        <div className='col-span-2'>

                                                            {succefull &&
                                                                // <Alert_s message="La imagen ha sido cargada" timeout={5000} />
                                                                <h1 className=" text-green-600 text-xs text-right">Imagen Actualizada</h1>
                                                            }
                                                            <div className='flex flex-row items-start'>
                                                                <div className='p-2'>
                                                                    {selectedImage ? (
                                                                        <Image
                                                                            src={URL.createObjectURL(selectedImage)}
                                                                            alt="upload file"
                                                                            className='h-28 object-cover mx-auto p-2'
                                                                            width={256}
                                                                            height={256}
                                                                        />
                                                                    ) :
                                                                        <Image
                                                                            src={pathimg}
                                                                            alt="upload file"
                                                                            className=' h-28 object-cover mx-auto border-gray-300'
                                                                            width={256}
                                                                            height={256}
                                                                        />
                                                                    }
                                                                </div>
                                                                <form onSubmit={(e) => { e.preventDefault() }}>
                                                                    <input
                                                                        name="mrr"
                                                                        style={{ display: 'none' }}
                                                                        ref={inputFileRef}
                                                                        type='file'
                                                                        accept="image/jpeg"
                                                                        onChange={handleImageChange}
                                                                    />
                                                                    <div className='flex flex-col p-2'>
                                                                        <button
                                                                            className="bg-transparent border-0 text-white float-right py-1"
                                                                            onClick={() => inputFileRef.current?.click()}>
                                                                            <span className="text-white opacity-7 h-5 w-5 text-xl block bg-primary-900 py-0 rounded-full hover:bg-primary-800">
                                                                                <MagnifyingGlassCircleIcon className=" h-5 w-5 text-white border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" />
                                                                            </span>
                                                                        </button>
                                                                        <button
                                                                            className="bg-transparent border-0 text-white float-right"
                                                                            onClick={handleImageUpload}>
                                                                            <span className="text-white opacity-7 h-5 w-5 text-xl block bg-primary-900 py-0 rounded-full hover:bg-primary-800">
                                                                                <ArrowUpOnSquareIcon className=" h-4 w-4 ml-0.5 text-white border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" />
                                                                            </span>
                                                                        </button>

                                                                    </div>

                                                                </form>


                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>}

                                            {/* Aqui empezaba el form */}

                                            <div className='px-2 py-5 bg-white border'>
                                                {/* Renglon 1 del form */}
                                                <div className='md:flex justify-start py-2'>
                                                    <div className='px-2 w-32'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Placas </label>
                                                        <input {...register("f_placas", { required: true })}
                                                            id="f_placas"
                                                            defaultValue={vehiculo.placas}
                                                            onInput={convertirAMayusculas}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        />
                                                        {errors.f_placas && <p className='text-red-600 text-xs italic px-2'>Requerido</p>}

                                                    </div>
                                                    <div className='px-2'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Año </label>
                                                        <input {...register("f_ano", { required: true })}
                                                            id="f_ano"
                                                            defaultValue={vehiculo.ano}
                                                            type="number"
                                                            //onChange={handleChange}
                                                            min="1900"
                                                            max="2999"
                                                            pattern="\d{4}"
                                                            //onInput={convertirAMayusculas}
                                                            className="w-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        />
                                                        {errors.f_ano && <p className='text-red-600 text-xs italic px-2'>Requerido</p>}
                                                    </div>
                                                    <div className='px-2'>
                                                        <label htmlFor="simpleSelect" className='block text-sm text-gray-500 dark:text-white'>Combustible</label>
                                                        <Controller
                                                            control={control}
                                                            name="f_tipo"
                                                            defaultValue={vehiculo.tipo}
                                                            render={({ field: { onChange, value } }) => (
                                                                <select
                                                                    onChange={(e) => onChange((e.target.value))}
                                                                    id="f_tipo"
                                                                    value={value}
                                                                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                                >
                                                                    <option value="GASOLINA">GASOLINA</option>
                                                                    <option value="DIESEL">DIESEL</option>
                                                                </select>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className='px-2'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Color </label>
                                                        <input {...register("f_color", { required: true })}
                                                            id="f_color"
                                                            defaultValue={vehiculo.color}
                                                            //onChange={handleChange}
                                                            onInput={convertirAMayusculas}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        />
                                                        {errors.f_color && <p className='text-red-600 text-xs italic px-2'>Requerido</p>}
                                                    </div>
                                                    <div className='px-1 w-1/3'>
                                                        <div className='px-1'>
                                                            <h1 className="text-gray-900 text-xs italic">{vehiculo.descripcion}</h1>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Renglon 3 del form  */}
                                                <div className='md:flex justify-start py-2'>
                                                    <div className='px-2'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Capacidad </label>
                                                        <input {...register("f_capacidad")}
                                                            //type="number"
                                                            //onChange={handleChange}
                                                            onInput={convertirAMayusculas}
                                                            className="w-32 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            defaultValue={vehiculo.capacidad} />
                                                    </div>
                                                    <div className='px-2 w-56'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Ubicacion </label>
                                                        <input {...register("f_ubicacion")}
                                                            name="ubicacion"
                                                            //onChange={handleChange}
                                                            onInput={convertirAMayusculas}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            defaultValue={vehiculo.ubicacion} />
                                                    </div>
                                                    <div className='px-2'>
                                                        <label htmlFor="simpleSelect" className='block text-sm text-gray-500 dark:text-white'>Pernocta</label>
                                                        <Controller
                                                            control={control}
                                                            name="f_pernoc"
                                                            defaultValue={vehiculo.pernoc}
                                                            render={({ field: { onChange, value } }) => (
                                                                <select
                                                                    onChange={(e) => onChange((e.target.value))}
                                                                    id="f_pernoc"
                                                                    value={value}
                                                                    className='p-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                                >
                                                                    <option value='0'>NO</option>
                                                                    <option value='1'>SI</option>
                                                                </select>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className='px-2'>
                                                        <label htmlFor="ciudades2" className="block text-sm text-gray-500 dark:text-gray-500">Estatus</label>
                                                        <Controller
                                                            control={control}
                                                            name="f_estatus"
                                                            defaultValue={vehiculo.estatus}
                                                            render={({ field: { onChange, value } }) => (
                                                                <select
                                                                    onChange={(e) => onChange(+(e.target.value))}
                                                                    id="f_estatus"
                                                                    value={value}
                                                                    className=" p-2 bg-gray-50 border border-gray-300 text-gray-900
                                                                        text-sm lg:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                                    block"
                                                                >
                                                                    {estatus.map((r) => (
                                                                        <option value={r.id} key={r.id}>
                                                                            {r.id} - {r.descripcion}
                                                                        </option>
                                                                    ))}

                                                                </select>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Renglon 4 comentarios */}
                                                <div className='md:flex justify-start py-2'>
                                                    <div className='px-2 w-2/4'>
                                                        <label className="block text-sm text-gray-500 dark:text-white"> Comentarios </label>
                                                        <textarea {...register("f_comentarios")}
                                                            onInput={handleInputChange}
                                                            defaultValue={vehiculo.comentarios}
                                                            className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-900
                                            focus:border-gray-400 block p-2 w-full h-28"
                                                        ></textarea>

                                                    </div>
                                                    {/* Captura de Odometro y fechas de mantenimiento */}
                                                    <div className='px-2 w-2/4'>
                                                        <div className='grid grid-flow-col auto-cols-max gap-1'>
                                                            <div className='flex flex-col gap-2 ml-8 py-3'>
                                                                <h1 className="my-1.5 text-sm text-gray-500 dark:text-white"> Odómetro</h1>
                                                                <h1 className="my-1.5 text-sm text-gray-500 dark:text-white mr-6">Ultimo Servicio</h1>
                                                                <h1 className="my-1.5 text-sm text-gray-500 dark:text-white">Próximo Servicio</h1>
                                                            </div>
                                                            <div className='flex flex-col ml-8  w-3/4'>
                                                                <input  {...register("f_odometro", { required: true })}
                                                                    id="f_odometro"
                                                                    defaultValue={vehiculo.odometro}
                                                                    type="number"

                                                                    //onChange={handleChange}
                                                                    //onInput={convertirAMayusculas}
                                                                    className="w-32 my-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                />
                                                                {errors.f_odometro && <p className='text-red-600 text-xs italic px-2'>Requerido</p>}
                                                                <DatePickerField
                                                                    control={control}
                                                                    name='f_ultserv'
                                                                    date={vehiculo.fUltServ == null ? null : new Date(vehiculo.fUltServ!)}
                                                                    manejarCambio={manejarCambio}
                                                                />
                                                                <DatePickerField
                                                                    control={control}
                                                                    name='f_proxserv'
                                                                    date={vehiculo.fUltServ == null ? null : new Date(vehiculo.fProxServ!)}
                                                                    manejarCambio={manejarCambio}
                                                                />

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/* Botones de Accion */}
                                            <div className='flex items-center justify-between'>
                                                <div className='px-2'>
                                                    <h1 className='font-bold text-lg uppercase text-primary-900'>
                                                        {isRepet! ? "Ese número económico ya existe!" : ""}

                                                    </h1>
                                                </div>
                                                <div className='pt-4 bg-gray-100'>
                                                    <div className="flex items-center justify-end px-4">
                                                        <button className="text-gray-500 background-transparent rounded shadow uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 "
                                                            type="button"
                                                            onClick={CerrarModal}>
                                                            Cerrar
                                                        </button>
                                                        <button type="submit"
                                                            className="text-white bg-primary-900 active:bg-primary-950 uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>
                            {/* Botones de Accion */}
                            {/* <div className='pt-4'>
                                <div className="flex items-center justify-end px-4  ">
                                    <button className="text-gray-500 background-transparent rounded shadow uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 "
                                        type="button"
                                        onClick={onClose}>
                                        Cerrar
                                    </button>
                                    <button type="submit"
                                        className="text-white bg-primary-900 active:bg-primary-950 uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                        Actualizar
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );


};
export default ModalVehiculos
