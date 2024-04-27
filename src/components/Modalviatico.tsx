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
    //handleChangeCiudad(e: ChangeEvent<HTMLSelectElement>): void
    modificaModal(tablaviaticos: TablaViaticos): void;
}


const Modalviatico = ({ isVisible, onClose, detviatico, ciudades, modificaModal }: Props) => {

    if (!isVisible) return null;


    const [valordias, setvalordias] = useState(detviatico.dias);
    const [selCdOrigen, setselCdOrigen] = useState(detviatico.origen)
    const [selCdDestino, setselCdDestino] = useState(detviatico.destino)
    const [valorFsal, setvalorFsal] = useState(new Date(detviatico.fechaSalida));
    const [valorFreg, setvalorFreg] = useState(new Date(detviatico.fechaRegreso));
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm()

    // const onSubmit = handleSubmit ( ({ diasmrr,comisiontitulo,comisionDetalle,ciudades,ciudades2,fechaSalida,fechaRegreso }) => {
    const onSubmit = handleSubmit ( (data) => {

        const viatico = {
            oficina: +(detviatico.noViatico.substring(2, 1)),
            ejercicio: +(20+detviatico.noViatico.substring(detviatico.noViatico.search('/')+1,detviatico.noViatico.length)),
            noViat: +(detviatico.noViatico.substring(3, detviatico.noViatico.search('/'))),
            fecha: valorFsal.toString(),
            noEmp: 7120,
            origenId: data.ciudades,
            destinoId: data.ciudades2,
            motivo: data.comisiontitulo,
            fechaSal: data.fechaSalida,
            fechaReg: data.fechaRegreso,
            dias: data.diasmrr,
            inforFecha: '',
            inforAct: data.comisionDetalle,
            nota: 'web',
            estatus: 1,
            fechaMod: obtenerfecha(),
            pol: 0,
            polMes: 0,
            caja: 0,
            cajaVale: 0,
            cajaRepo: 0,
            noEmpCrea: 0,
            inforResul: ''
        } as TablaViaticos

        //console.log("Desde modal al presionar actualizar"+ JSON.stringify(viatico))
        modificaModal(viatico)

    })

    function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
        //handleChangeCiudad(event)
        setselCdOrigen(+(e.target.value))
    }

    function handleChange2(e: ChangeEvent<HTMLSelectElement>): void {
        //handleChangeCiudad(event)
        setselCdDestino(+(e.target.value))
    }

    const manejarCambio = (date: Date, name: string) => {
        // Aquí puedes agregar más lógica si es necesario

        if (name == "fechaSalida") {
            setvalordias(calcularDiferenciaFechas(valorFreg, date))
        } else {
            setvalordias(calcularDiferenciaFechas(date, valorFsal))
        }

        setValue("diasmrr", calcularDiferenciaFechas(date, valorFsal))

    };

    return (

        <>
            <div className="py-20 justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-6 mx-auto max-w-2xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-1 outline-gray-300 focus:outline-none">
                        <div className="flex px-4 items-start justify-between p-2 border-b border-solid rounded-t bg-gray-200 ">
                            <div className='grid px-4'>
                                <h1 className="text-md text-gray-700"><strong className="font-bold"> {detviatico.nombre} </strong></h1>
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
                            <form className="bg-white rounded px-4 pt-4 pb-4  w-full" onSubmit={onSubmit}>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className='p-3'>
                                        <div className='flex justify-start'>
                                            <label className="block p-2 text-sm text-gray-500 dark:text-white"> Fecha </label>
                                            <label className="block p-2 text-sm text-gray-500 dark:text-white">
                                                {/* <MyDatePicker fecha={detviatico.fecha} selectedDate={selectedDate} onChangeSelectedDate={onChangeSelectedDateHandler }  />  */}
                                                {/* {selectedDate?.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })} </label> */}
                                                {new Date(detviatico.fecha)?.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })} </label>
                                        </div>
                                    </div>
                                    <div className='grid justify-center'>
                                        <p className="text-2xl text-primary-900">Viático<strong className="font-bold"> {detviatico.noViatico} </strong></p>
                                        <p className="flex justify-end text-md text-primary-900">Importe: ${detviatico.importe}</p>
                                    </div>


                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className='p-3'>
                                        <div className='px-2 py-4'>
                                            <label htmlFor="ciudades" className="block text-sm text-gray-500 dark:text-white">
                                                Origen
                                            </label>
                                            <Controller
                                                control={control}
                                                name="ciudades"
                                                defaultValue={selCdOrigen}
                                                render={({ field: { onChange, value } }) => (
                                                    <select
                                                        onChange={(e) => onChange(+(e.target.value))}
                                                        id="ciudades"
                                                        value={value}
                                                        className="  bg-gray-50 border border-gray-300 text-gray-900
                                                                    sm:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                                    block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 
                                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500
                                                                dark:focus:border-gray-500"
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
                                        <div className='px-2 py-4'>
                                            <label htmlFor="ciudades2" className="block text-sm text-gray-500 dark:text-white">
                                                Destino
                                            </label>
                                            <Controller
                                                control={control}
                                                name="ciudades2"
                                                defaultValue={selCdDestino}
                                                render={({ field: { onChange, value } }) => (
                                                    <select
                                                        onChange={(e) => onChange(+(e.target.value))}
                                                        id="ciudades2"
                                                        value={value}
                                                        className="  bg-gray-50 border border-gray-300 text-gray-900
                                                                    sm:text-xs rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                                    block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 
                                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500
                                                                dark:focus:border-gray-500"
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
                                    <div className='flex p-3'>

                                        <div className='px-1 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Salida </label>
                                            <DatePickerField control={control} name='fechaSalida' date={valorFsal} manejarCambio={manejarCambio} />
                                        </div>
                                        <div className='px-1 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Regreso </label>
                                            <DatePickerField control={control} name='fechaRegreso' date={valorFreg} manejarCambio={manejarCambio} />
                                        </div>
                                        <div className='form-control py-4 px-2 items-center'>
                                            <label htmlFor="diasmrr" className="block text-center text-sm text-gray-500 dark:text-white"> Días  </label>
                                            <input
                                                type="number"
                                                value={valordias}
                                                defaultValue={9}
                                                {...register("diasmrr", {
                                                    valueAsNumber: true,
                                                })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-center sm:text-sm rounded-lg focus:ring-primary-600
                                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                readOnly />

                                        </div>

                                    </div>
                                </div>

                                <div className='flex p-3 '>
                                    <div className='w-full'>
                                        <div className='px-2 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Titulo de la Comisión </label>
                                            <input {...register("comisiontitulo", { required: true })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={detviatico.comisionTitulo} />
                                            {errors.comisiontitulo && <p className='text-red-600 text-xs'>Este campo es requerido!</p>}
                                        </div>
                                        <div className='px-2 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Actividades </label>
                                            <textarea {...register("comisionDetalle", { required: true })} className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block p-2 w-full h-28 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={detviatico.comisionDetalle}
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

