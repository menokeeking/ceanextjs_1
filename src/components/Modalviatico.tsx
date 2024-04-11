"use client"
import { XCircleIcon } from '@heroicons/react/20/solid'
import { TablaListaViaticos } from '@/interfaces/TablaListaViaticos';
import MyDatePicker from '@/components/DatePicker';
import React, { useEffect, useState } from 'react'
import { DetalleViatico } from '@/interfaces/DetalleViatico';
import axios from 'axios';


interface Props {
    isVisible: boolean;
    onClose: () => void;
    detviatico: DetalleViatico;
}

const Modalviatico = ({ isVisible, onClose, detviatico }: Props) => {

    alert("Modal visible: "+isVisible)

    if (!isVisible) return null;

    return (
        
        <>
            {/* //{alert(JSON.stringify(detviatico))} */}
            {alert("Inicio del return del Modal"+JSON.stringify(detviatico))}
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
                            <form className="bg-white rounded px-4 pt-4 pb-4  w-full">

                                <div className="grid grid-cols-2 gap-2">
                                    <div className='p-3'>
                                        <div className='flex justify-center'>
                                            <label className="block p-2 text-sm text-gray-500 dark:text-white"> Fecha </label>
                                            <MyDatePicker fecha={detviatico.fecha} />
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <p className="text-2xl text-primary-900">Viático<strong className="font-bold"> {detviatico.noViatico} </strong></p>
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className='p-3'>
                                        <div className='px-2 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Origen </label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={detviatico.origenNom} />
                                        </div>
                                        <div className='px-2'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Destino </label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={detviatico.destinoNom} />
                                        </div>

                                    </div>
                                    <div className='flex p-3'>

                                        <div className='px-1 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Salida </label>
                                            <MyDatePicker fecha={detviatico.fechaSalida} />
                                        </div>
                                        <div className='px-1 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Regreso </label>
                                            <MyDatePicker fecha={detviatico.fechaRegreso} />
                                        </div>
                                        <div className='py-4 px-2 items-center'>
                                            <label className="block text-center text-sm text-gray-500 dark:text-white"> Días  </label>
                                            <p className="block text-center text-sm  text-gray-500 dark:text-white">{detviatico.dias}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex p-3 '>
                                    <div className='w-full'>
                                        <div className='px-2 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Titulo de la Comisión </label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={detviatico.comisionTitulo} />
                                        </div>
                                        <div className='px-2 py-4'>
                                            <label className="block text-sm text-gray-500 dark:text-white"> Actividades </label>
                                            <textarea className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block p-2 w-full h-28 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >{detviatico.comisionDetalle}</textarea>
                                        </div>

                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-end px-4 py-2 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-gray-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 "
                                type="button"
                                onClick={onClose}
                            >
                                <div className='hover:text-bold'>Cerrar</div>
                            </button>
                            <button
                                className="text-white bg-primary-900 active:bg-primary-950 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => { }}
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Modalviatico