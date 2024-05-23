import { XCircleIcon } from '@heroicons/react/20/solid'
import { TablaEmpleados } from '@/interfaces/TablaEmpleados';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    empleados: TablaEmpleados;
}

const Modaltest = ({ isVisible, onClose, empleados }: Props) => {
    //const Modaltest = ({isVisible, onClose }) => {

    if (!isVisible) return null;
    return (
        <>
            <div className="py-20 justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-screen my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline outline-1 outline-gray-300 focus:outline-none">
                        <div className="flex px-4 items-start justify-between p-2 border-b border-solid rounded-t bg-gray-200 ">
                            <h1 className="text-md font-bold text-gray-700">Empleado: {empleados.idEmpleado}</h1>
                            <button className="bg-transparent border-0 text-white float-right" onClick={onClose}>
                                <span className="text-white opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full hover:bg-gray-300">
                                    <XCircleIcon className=" h-6 w-6 text-white border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" />
                                </span>
                            </button>
                        </div>
                        <div className="relative p-1 flex-auto">
                            <form className="bg-white rounded px-8 pt-4 pb-8  w-full">
                                <div className='lg:flex md:flex justify-between'>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> Nombre </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.nombre} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> Paterno </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                         focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.paterno} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white">
                                            Materno
                                        </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                         focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.materno} />
                                    </div>
                                </div>
                                <div className='flex py-4 w-20'>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> Nivel </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.nivel} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> Depto </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.depto} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> Obra</label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.obra} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> DeptoPpto</label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.deptoPpto} />
                                    </div>
                                    <div className='px-2'>
                                        <label className="block text-sm text-gray-500 dark:text-white"> DeptoComi</label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={empleados.deptoComi} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 "
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

export default Modaltest