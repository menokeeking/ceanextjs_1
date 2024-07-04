"use client"
import { XCircleIcon } from '@heroicons/react/20/solid'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { DetalleViatico } from '@/interfaces/DetalleViatico';
import { TablaViaticos } from '@/interfaces/TablaViaticos';
import { Controller, FieldValue, FieldValues, useForm } from "react-hook-form";
import { DatePickerField } from '@/components/Datepicker2';
import { Ciudad } from '@/interfaces/Ciudades';
import calcularDiferenciaFechas from '@/funciones/difdias';
import obtenerfecha from '@/funciones/diadehoy';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    detviatico: DetalleViatico;
    ciudades: Ciudad[];
    modificaModal(tablaviaticos: TablaViaticos): void;
}

const Modalviatico = ({ isVisible, onClose, detviatico, ciudades, modificaModal }: Props) => {

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm()
    const [texto, setTexto] = useState('');

    if (!isVisible) return null;

    setValue("ciudades", detviatico.origen)
    setValue("ciudades2", detviatico.destino)
    setValue("diasmrr", detviatico.dias)
    //setValue("fechaSalida", detviatico.fechaSalida)
    setValue("fechaSalida", (detviatico.fechaSalida.substring(0, 10))+'T00:00:00')
    //setValue("fechaRegreso", detviatico.fechaRegreso)
    setValue("fechaRegreso", (detviatico.fechaRegreso.substring(0, 10)+'T00:00:00'))
    setValue("comisiontitulo", detviatico.comisionTitulo)
    setValue("comisionDetalle", detviatico.comisionDetalle)

    


    const onSubmit = handleSubmit((data) => {

        const viatico = {
            oficina: +(detviatico.noViatico.substring(2, 1)),
            ejercicio: +(20 + detviatico.noViatico.substring(detviatico.noViatico.search('/') + 1, detviatico.noViatico.length)),
            noViat: +(detviatico.noViatico.substring(3, detviatico.noViatico.search('/'))),
            fecha: obtenerfecha(new Date(detviatico.fecha)), // CAMPO QUE SE ACTUALIZA
            noEmp: detviatico.noEmp,
            origenId: data.ciudades,        // CAMPO QUE SE ACTUALIZA
            destinoId: data.ciudades2,      // CAMPO QUE SE ACTUALIZA
            motivo: data.comisiontitulo,    // CAMPO QUE SE ACTUALIZA
            fechaSal: data.fechaSalida,     // CAMPO QUE SE ACTUALIZA
            fechaReg: data.fechaRegreso,    // CAMPO QUE SE ACTUALIZA
            dias: data.diasmrr,             // CAMPO QUE SE ACTUALIZA
            inforFecha: obtenerfecha(new Date),  // CAMPO QUE SE ACTUALIZA
            inforAct: data.comisionDetalle, // CAMPO QUE SE ACTUALIZA
            nota: 'web',
            estatus: 0,
            fechaMod: obtenerfecha(new Date),
            pol: 0,
            polMes: 0,
            caja: 0,
            cajaVale: 0,
            cajaRepo: 0,
            noEmpCrea: 0,
            inforResul: 'string'                  // CAMPO QUE SE ACTUALIZA
        } as TablaViaticos
        //console.log("Desde modal al presionar actualizar"+ JSON.stringify(viatico))
        modificaModal(viatico)
    })

    const manejarCambio = (date: Date, name: string) => {
        // Aquí puedes agregar más lógica si es necesario
        if (name == "fechaSalida") {
            setValue("diasmrr", calcularDiferenciaFechas(new Date(getValues("fechaRegreso")), date)) //getValues("test")
        } else {
            setValue("diasmrr", calcularDiferenciaFechas(date, new Date(getValues("fechaSalida"))))
        }
    };

    // Función para convertir el texto a mayúsculas
    const convertirAMayusculas = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nuevoTexto = event.target.value.toUpperCase();
        setTexto(nuevoTexto);
    };

    return (

        <>
            <div className="py-10 justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-6 mx-auto max-w-2xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-1 outline-gray-300 focus:outline-none">
                        <div className="flex px-4 items-start justify-between p-2 border-b border-solid rounded-t bg-gray-200 ">
                            <div className='grid px-4'>
                                <h1 className="text-sm text-gray-700"><strong className="font-bold"> {detviatico.nombre} </strong></h1>
                                <p className="text-xs text-gray-500"> {detviatico.puesto}</p>
                                <p className="text-xs text-gray-500"> {detviatico.depto}</p>
                            </div>

                            <button className="bg-transparent border-0 text-white float-right" onClick={onClose}>
                                <span className="text-white opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full hover:bg-gray-300">
                                    <XCircleIcon className=" h-6 w-6 text-white border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" />
                                </span>
                            </button>
                        </div>
                        <div className="relative p-1 flex-auto">
                            <form className="bg-white rounded px-1 lg:px-4 pt-4 pb-4  w-full" onSubmit={onSubmit}>

                                <div className="grid grid-cols-2 lg:gap-2">
                                    <div className='p-3'>
                                        <div className='flex justify-start'>
                                            <label className="block p-2 text-sm text-gray-500 dark:text-gray-500"> Fecha </label>
                                            <label className="block p-2 text-sm text-gray-500 dark:text-gray-500">
                                                {new Date(detviatico.fecha)?.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })} </label>
                                        </div>
                                    </div>
                                    <div className='grid justify-end py-1 px-6'>
                                        <p className="lg:text-2xl text-xl text-primary-900"><strong className="font-bold"> {detviatico.noViatico} </strong></p>
                                        <p className="lg:flex justify-end lg:text-sm text-md text-primary-900">Importe: ${detviatico.importe}</p>
                                    </div>


                                </div>
                                <div className="grid lg:grid-cols-5 ">
                                    <div className='p-3 lg:col-span-2 col-span-3'>
                                        <div className='px-2 lg:py-1 py-2'>
                                            <label htmlFor="ciudades" className="block text-sm text-gray-500 dark:text-gray-500 px-1">
                                                Origen
                                            </label>
                                            <Controller
                                                control={control}
                                                name="ciudades"
                                                //defaultValue={selCdOrigen}
                                                render={({ field: { onChange, value } }) => (
                                                    <select
                                                        onChange={(e) => onChange(+(e.target.value))}
                                                        id="ciudades"
                                                        value={value}
                                                        className="  bg-gray-50 border border-gray-300 text-gray-900
                                                                    text-sm lg:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                                    block lg:w-48 w-full p-1.5"
                                                    >
                                                        {ciudades.map((r) => (
                                                            <option value={r.idCiudad} key={r.idCiudad}>
                                                                {r.idCiudad} - {r.ciudad}
                                                            </option>
                                                        ))}

                                                    </select>
                                                )}
                                            />
                                        </div>
                                        <div className='px-2 lg:py-1 py-2'>
                                            <label htmlFor="ciudades2" className="block text-sm text-gray-500 dark:text-gray-500 px-1">
                                                Destino
                                            </label>
                                            <Controller
                                                control={control}
                                                name="ciudades2"
                                                //defaultValue={selCdDestino}
                                                render={({ field: { onChange, value } }) => (
                                                    <select
                                                        onChange={(e) => onChange(+(e.target.value))}
                                                        id="ciudades2"
                                                        value={value}
                                                        className="  bg-gray-50 border border-gray-300 text-gray-900
                                                                        text-sm lg:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                                    block lg:w-48 w-full  p-1.5"
                                                    >
                                                        {ciudades.map((r) => (
                                                            <option value={r.idCiudad} key={r.idCiudad}>
                                                                {r.idCiudad} - {r.ciudad}
                                                            </option>
                                                        ))}

                                                    </select>
                                                )}
                                            />
                                        </div>

                                    </div>
                                    <div className='flex px-4 lg:px-0 col-span-3'>

                                        <div className='lg:text-center px-1 py-4  basis-5/12 '>
                                            <label className="block text-sm text-gray-500 dark:text-gray-500 px-1"> Salida </label>
                                            <DatePickerField control={control} name='fechaSalida' date={new Date(detviatico.fechaSalida)} manejarCambio={manejarCambio} />
                                        </div>
                                        <div className='lg:text-center px-1 py-4  basis-5/12'>
                                            <label className="block text-sm  text-gray-500 dark:text-gray-500 px-1"> Regreso </label>
                                            <DatePickerField control={control} name='fechaRegreso' date={new Date(detviatico.fechaRegreso)} manejarCambio={manejarCambio} />
                                        </div>
                                        <div className='lg:text-center form-control py-4 px-2  basis-2/12'>
                                            <label htmlFor="diasmrr" className="block text-center text-sm text-gray-500 dark:text-gray-500"> Días  </label>
                                            <input
                                                type="number"
                                                {...register("diasmrr", {
                                                    valueAsNumber: true,
                                                })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-center text-sm lg:text-sm rounded-lg focus:ring-primary-600
                                                            focus:border-primary-600 w-full py-1.5 "
                                                readOnly />

                                        </div>


                                    </div>
                                </div>

                                <div className='flex lg:p-3 px-2 '>
                                    <div className='w-full'>

                                        <div className='px-2 lg:py-4 py-2'>
                                            <label className="block text-sm text-gray-500 dark:text-gray-500 px-1"> Titulo de la Comisión </label>
                                            <input {...register("comisiontitulo", { required: true })}
                                                onInput={convertirAMayusculas}
                                                className="bg-gray-50 text-xs lg:text-sm rounded-lg block w-full p-2 border border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500 " />
                                            {errors.comisiontitulo && <p className='text-red-600 text-xs'>Este campo es requerido!</p>}
                                        </div>

                                        <div className='px-2 lg:py-4 py-2'>
                                            <label className="block text-sm text-gray-500 dark:text-gray-500 px-1"> Actividades </label>
                                            <textarea {...register("comisionDetalle", { required: true })}
                                                onChange={handleInputChange}
                                                value={texto}
                                                className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-900
                                            focus:border-gray-400 block p-2 w-full h-28"
                                            ></textarea>
                                            {errors.comisionDetalle && <p className='text-red-600 text-xs'>Este campo es requerido!</p>}
                                        </div>

                                    </div>

                                </div>
                                <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button className="text-gray-500 background-transparent rounded shadow uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 "
                                        type="button"
                                        onClick={onClose}>
                                        Cerrar
                                    </button>
                                    <button type="submit"
                                        className="text-white bg-primary-900 active:bg-primary-950 uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                        Actualizar
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Modalviatico

