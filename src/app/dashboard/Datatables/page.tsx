"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader } from 'react-icons/io5';
import { TablaEmpleados } from '@/interfaces/TablaEmpleados';
import styled from 'styled-components';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Modaltest from '@/components/Modaltest';
import { Progress } from '@/components/Progress';
import Link from 'next/link'
import { TablaListaViaticos } from '@/interfaces/TablaListaViaticos';

const TextField = styled.input`
height: 32px;
width: 200px;
border-radius: 3px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0;
border-bottom-right-radius: 0;
border: 1px solid #e5e5e5;
padding: 0 32px 0 16px;

&:hover {
    cursor: pointer;
}
`;



function Datatable() {

    const [datos, setDatos] = useState([] as TablaListaViaticos[])
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setDatos([]);
        const getData = async () => {
            const { data } = await axios.get('/api/viaticos/');
            setLoading(false)
            setDatos(data.data)
            console.log({ data });

        }
        getData();

    }, [])

    const paginacionOpciones = {
        rowsPerPageText: "Registros por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const columns = [
        {
            name: "No. Viatico",
            selector: (row: any) => 'V'+row.oficina.toString()+'-'+row.viatico.toString()+'/'+ row.ejercicio.toString().substr(2,2),
            sortable: true,
            width: '100px',
            style: {
                backgroundColor: 'rgba(208, 204, 207, 0.8)',
                color: 'gray-900',
            },
        },
        {
            name: "Fecha",
            selector: (row: any) => moment( row.fecha ).format('DD/MM/YYYY'),
            sortable: true,
            //maxWidth: '100px',
        },
        {
            name: "Origen",
            selector: (row: any) => row.origen,
            sortable: true,
            //maxWidth: '100px',
        },
        {
            name: "Destino",
            selector: (row: any) => row.destino,
            sortable: true,
            //maxWidth: '150px',
        },
        {
            name: "Motivo",
            //selector: (row: any) => row.movito,
            cell: (row: any) => <div style={{fontSize: '10px'}}>{row.movito}</div>,
            sortable: true,
            wrap: true,
            //maxWidth: '600px',
            //format: (row: any) => `${row.movito.slice(0, 200)}...`
        },
        {
            name: "Estatus",
            //selector: (row: any) => row.estatus == '1' ? 'INICIADO' : row.estatus == '2'? 'PAGADO C.C.' : row.estatus == '3'? 'CONTABILIDAD' : row.estatus == '4'? 'PAGADO' : row.estatus == '9'? 'CANCELADO' : '',
            cell: (row: any) => <div style={{fontSize: '10px'}}>{row.estatus == '1' ? 'INICIADO' : row.estatus == '2'? 'PAGADO C.C.' : row.estatus == '3'? 'CONTABILIDAD' : row.estatus == '4'? 'PAGADO' : row.estatus == '9'? 'CANCELADO' : ''}</div>,
            sortable: true,
            width: '90px',
            center: true,
            conditionalCellStyles: [
                {
                    when: (row: any) => row.estatus == 9,
                    style: {
                        backgroundColor: 'rgba(234, 0, 0, 0.8)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: (row: any) => row.estatus == 4,
                    style: {
                        backgroundColor: 'rgba(3, 124, 2, 0.8)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
            ]
        },

        {
            name: 'ACCIONES',
            button: true,
            width: '150px',
            selector: (row: any) => row.id,
            cell: (row: any) =>
                <>
                    <button
                        type="button"
                        onClick={() => {
                            //   setShowModal(true)
                            //   setempleados(row)
                        }}
                    >
                        <IoEye className="w-5 h-5 text-red-900" />
                    </button>

                    <button
                        type="button"
                    >
                        <IoPencilSharp className="ml-2 w-5 h-5 text-red-900" />
                    </button>

                    <button
                        type="button"
                    >
                        <IoReader className="ml-2 w-5 h-5 text-red-900" />
                    </button>
                </>
        }

    ]


    return (
        <>
            
            <div className='flex-col items-center justify-center -z-10 fixed w-100%'>

                <DataTable
                    title="Viaticos por Empleado"
                    columns={columns}
                    pagination
                    paginationPerPage={15}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationComponentOptions={paginacionOpciones}
                    data={datos}
                    //data={filteredItems}
                    subHeader
                    subHeaderComponent={datos.length > 0 && <> <TextField
                        id="search"
                        type="text"
                        placeholder="Buscarss"
                        aria-label="Search Input"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value.toUpperCase())}
                    >
                    </TextField>
                        <XCircleIcon className=" h-6 w-6 text-gray-100 bg-primary-800 border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer" aria-hidden="true" onClick={() => setFilterText('')} />

                    </>}
                    dense={true}
                    striped={true}
                    //selectableRows
                    progressPending={loading}
                    progressComponent={<Progress />}
                    noDataComponent={<p className='py-6 text-md text-gray-600'>Sin información mrr</p>}
                    highlightOnHover
                    persistTableHead


                />
            </div>
        </>
    )
}

export default Datatable


