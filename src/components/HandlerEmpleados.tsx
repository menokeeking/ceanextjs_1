"use client"
import { TablaEmpleados } from "@/interfaces/TablaEmpleados";
import DataTable, { Media } from 'react-data-table-component';
import { useCounterStore } from "@/store/counterStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoEye, IoPencilSharp, IoReader } from "react-icons/io5";
import styled from "styled-components";
import { XCircleIcon, UserGroupIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Progress } from "./Progress";
import ModalSetejercicio from "./ModalSetejercicio";
import Modaltest from "./Modaltest";
import { creapdf_emp } from "@/components/creapdf_emp"

import Link from "next/link";
import { table } from "console";

const TextField = styled.input`
height: 32px;
//width: 340px;
border-radius: 1px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0px;
border-bottom-right-radius: 0px;
border: 1px solid #6b7280;
padding: 0 32px 0 16px;
&:hover {cursor: pointer;}`;


function HandlerEmpleados() {

    const router = useRouter()

    const inicio = useCounterStore((state) => state.alinicio)
    const [datos, setDatos] = useState([] as TablaEmpleados[])
    const [filterText, setFilterText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isNew, setisNew] = useState(false);
    const [loading, setLoading] = useState(false)
    const [empleados, setempleados] = useState<TablaEmpleados>({} as TablaEmpleados);
    const actnombredin = useCounterStore(state => state.actnombredin)
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => { setIsOpen(false) };
    const openModal = () => { setIsOpen(true) };

    const filteredItems = datos.filter(
        item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()) || item.paterno && item.paterno.toLowerCase().includes(filterText.toLowerCase()) || item.idEmpleado && item.idEmpleado.toString().includes(filterText.toLowerCase()),
    );

    const empleadosvoid: TablaEmpleados = {
        idEmpleado: 0,
        nombre: '',
        paterno: '',
        materno: '',
        nivel: 0,
        depto: 0,
        obra: 0,
        deptoPpto: 0,
        deptoComi: 0,
        municipio: 0,
        activo: ''
    }

    const RecibirdeModal = async (valoremp: TablaEmpleados, isnew: boolean) => {
        console.log("recibo del modal: ", valoremp)
        if (isnew) {
            const getDataPost = async () => {
                const { data } = await axios.post('/api/empleados', valoremp);
                console.log(data)
                //setLoading(false)
                //setDatos(data.data)
            }
            getDataPost();
        } else {
            const url = '/api/empleados'
            const putData = async () => {
                const config = { headers: { 'Content-Type': 'application/json' } };
                try {
                    const data = await axios.put(url, valoremp, config);
                    console.log("Lo que regresa el data", data)
                } catch (error) {
                    console.error(error)
                }
            }
            putData();
        }

    }

    useEffect(() => {
        if (inicio) {
            openModal()
        }
        setLoading(true)
        setDatos([]);
        const getData = async () => {
            const { data } = await axios.get('/api/empleados');
            setLoading(false)
            setDatos(data.data)
        }
        getData();
    }, [])

    const paginacionOpciones = {

        rowsPerPageText: "Registros por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const customStyles = {
        tableWrapper: {
            style: {
                color: '#e5e7eb',
                //backgroundColor: theme.background.default,
            },
        },
        contextMenu: {
            style: {
                backgroundColor: '#e5e7eb',
            },
        },


        rows: {
            style: {
                // minHeight: '24px', // override the row height
                
            },
        },
        headCells: {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                
                //borderRightStyle: 'solid',
                //borderRightWidth: '1px',
            },
        },
        cells: {
            style: {

                //         '&:not(:last-of-type)': {
                //             borderRightStyle: 'solid',
                //             borderRightWidth: '1px',
                //             borderRightColor: '#e5e7eb',
                //         },
            },
        },

    };

    const columns = [
        { name: "NO. EMP.", selector: (row: any) => row.idEmpleado, sortable: true, right: true, maxWidth: '80px', },
        { name: "NOMBRE", selector: (row: any) => row.nombre, sortable: true, },
        { name: "PATERNO", selector: (row: any) => row.paterno, sortable: true, hide: Media.SM },
        { name: "MATERNO", selector: (row: any) => row.materno, sortable: true, hide: Media.SM },
        { name: "NIV", selector: (row: any) => row.nivel, sortable: true, hide: Media.MD, right: true, maxWidth: '80px', },
        { name: "DEPTO", selector: (row: any) => row.depto, sortable: true, hide: Media.MD, right: true, maxWidth: '80px', },
        { name: "OBRA", selector: (row: any) => row.obra, hide: Media.MD, right: true, maxWidth: '80px', },
        { name: "DPPTO", selector: (row: any) => row.deptoPpto, hide: Media.MD, right: true, maxWidth: '80px', },
        { name: "DCOMI", selector: (row: any) => row.deptoComi, hide: Media.MD, right: true, maxWidth: '80px', },
        {
            name: 'ACCIONES', button: true, selector: (row: any) => row.id, cell: (row: any) =>
                <>  <div className="">
                    <button title='Detalle Empleado'
                        type="button"
                        onClick={() => {
                            setisNew(false)
                            setShowModal(true)
                            setempleados(row)
                        }}>
                        <IoEye className="w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>

                    <button title='Editar' type="button" onClick={() => {
                        creapdf_emp(row)
                    }}>

                        <IoPencilSharp className="ml-2 w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>

                    <button title='Detalle Viaticos'
                        type="button"
                        onClick={() => {
                            actnombredin(row.nombre + ' ' + row.paterno + ' ' + row.materno)
                            router.push(`/dashboard/Detallexemp?id=${row.idEmpleado}`)
                        }}
                    >
                        <IoReader className="ml-2 w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>
                </div>
                </>,
        }
    ]

   

    return (
        <>
            <div className="">
                <ModalSetejercicio isVisible={isOpen} CerrarModal={closeModal} />
            </div>
            <div className="">
                {/* <Modaltest showModal={showModal} /> */}
                <Modaltest isVisible={showModal} onClose={() => setShowModal(false)} empleados={empleados} isNew={isNew} recibirModal={RecibirdeModal} />
            </div>
            <div className="w-full">

                <DataTable
                    title={
                        <div className="flex flex-row items-center justify-center lg:justify-start md:justify-start w-full">
                            <UserGroupIcon className=" h-6 w-6 text-gray-600 mx-3" />
                            <p className='py-2 text-md font-semibold text-gray-600 uppercase '>Empleados CEA</p>
                        </div>
                    }

                    columns={columns}
                    pagination
                    //paginationPerPage={5}
                    //paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationComponentOptions={paginacionOpciones}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={datos.length > 0 && <>
                        <div className="lg:flex flex-row md:flex items-center justify-between w-full mb-4">
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        setShowModal(true)
                                        setisNew(true)
                                        setempleados(empleadosvoid)
                                    }}
                                    className="bg-primary-900 py-2 px-2 w-full lg:w-32 md:w-32  text-gray-100 text-xs uppercase rounded-md hover:bg-primary-800 transition-colors"
                                >
                                    Agregar
                                </button>
                            </div>
                            <div className="flex flex-row">
                                <TextField
                                    id="search"
                                    type="text"
                                    placeholder="Buscar"
                                    aria-label="Search Input"
                                    value={filterText}
                                    className="text-gray-600 lg:w-80 w-full"
                                    onChange={e => setFilterText(e.target.value.toUpperCase())}>
                                </TextField>
                                <XCircleIcon
                                    className=" h-8 w-8 text-gray-100 border border-[#6c7d87] bg-primary-900 hover:bg-primary-800 transition-colors cursor-pointer"
                                    aria-hidden="true"
                                    onClick={() => setFilterText('')}
                                />
                            </div>

                        </div>
                    </>}
                    dense={true}
                    striped={true}
                    responsive={true}
                    //selectableRows
                    progressPending={loading}
                    progressComponent={<Progress />}
                    noDataComponent={<div className="flex items-center justify-center">
                        <ExclamationCircleIcon className="h-5 w-5 text-gray-500" />
                        <p className='py-6 px-2 text-md font-semibold text-gray-500 uppercase '>Sin información</p>
                    </div>
                    }
                    highlightOnHover
                    persistTableHead
                    customStyles={customStyles}
                    fixedHeader = {true}
                    fixedHeaderScrollHeight="150px"
                />
            </div>


        </>
    )
}

export default HandlerEmpleados