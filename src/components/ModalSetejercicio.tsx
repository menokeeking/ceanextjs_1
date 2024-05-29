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
            <div className="py-10 justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-2 mx-auto max-w-xs">
                    <div className="border-4 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-0 outline-gray-500 focus:outline-none">
                        <p className='ml-6 mt-1 text-gray-500'>Seleccione el Ejercicio </p>
                        <div className="flex px-4 pb-4 items-center justify-center border-b border-solid rounded-t bg-gray-100 ">
                            <select
                                id="year"
                                name="year"
                                className="mt-1 block w-full py-1 px-4 mx-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
                                value={count}
                                onChange={ManejadordeCambio}>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="mt-1 px-4 py-1 text-sm text-gray-100 bg-primary-900 rounded-md hover:bg-primary-950"
                                onClick={() => {
                                    actualizar(count)
                                    CerrarModal()
                                    router.push("/dashboard/principal")
                                }}> Captar </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalSetejercicio

