"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useCounterStore } from '@/store/counterStore';
import { useRouter } from 'next/navigation';


interface Props {
    isVisible: boolean;
    CerrarModal: () => void;
}

const ModalSetejercicio = ({ isVisible, CerrarModal }: Props) => {

    const router = useRouter()

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i);

    const count = useCounterStore((state) => state.count)
    const actualizar = useCounterStore(state => state.actualizar)

    function ManejadordeCambio(e: ChangeEvent<HTMLSelectElement>): void {
        actualizar(+(e.target.value))
    }

    if (!isVisible) return null;

    return (
        <>
            <div className="py-20 justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-4 mx-auto max-w-xs">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-1 outline-gray-300 focus:outline-none">
                        <p className='text-md mx-4 my-1 text-gray-500'>Seleccione el Ejercicio </p>
                        <div className="flex px-2 items-start justify-center p-1 border-b border-solid rounded-t bg-gray-100 ">
                            <div className="bg-white w-full rounded px-3 pt-1 pb-2 flex">
                                <select 
                                    id="year" 
                                    name="year" 
                                    className="mt-1 block w-full py-1 px-4 mx-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-900 focus:border-primary-900 sm:text-sm" 
                                    value={count} 
                                    onChange={ManejadordeCambio}>
                                    {years.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="mx-2 px-4 py-1 text-sm font-medium text-white bg-primary-900 rounded-md hover:bg-primary-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                        actualizar(count)
                                        CerrarModal()
                                        router.push("/dashboard/principal")
                                    }}
                                > Captar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalSetejercicio

