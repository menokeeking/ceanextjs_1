"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader } from 'react-icons/io5';
import { TablaEmpleados } from '@/interfaces/TablaEmpleados';
import styled from 'styled-components';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Modaltest from '@/components/Modaltest';
import { Progress } from '@/components/Progress';
import { useRouter } from 'next/navigation';
import { TablaListaViaticos } from '@/interfaces/TablaListaViaticos';
import Modalviatico from '@/components/Modalviatico';
import { DetalleViatico } from '@/interfaces/DetalleViatico';
import { TablaViaticos } from '@/interfaces/TablaViaticos';
import { Ciudad } from '@/interfaces/Ciudades';
import { useCounterStore } from '@/store/counterStore';

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

const ClearButton = styled.input`
border-top-left-radius: 0;
border-bottom-left-radius: 0;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
height: 32px;
width: 32px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;`;


function Page({ params }: { params: { noemp: string, nombre: string } }) {

    const count = useCounterStore((state) => state.count)
    const [showModal, setShowModal] = useState(false);
    const [datos, setDatos] = useState([] as TablaListaViaticos[])
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false)
    const [viaticos, setviaticos] = useState<TablaListaViaticos>({} as TablaListaViaticos)
    //const [valorviatico, setvalorviatico] = useState<TablaViaticos>({} as TablaViaticos)
    const [ciudades, setciudades] = useState<Ciudad[]>({} as Ciudad[])
    const [detviatico, setdetviatico] = useState<DetalleViatico>({ fecha: '01/01/2024', fechaRegreso: '01/01/2024', fechaSalida: '01/01/2024' } as DetalleViatico)

    const router = useRouter()

    const cargarModal = async (datam: any) => {
        //consultar api
        //alert(JSON.stringify(datam))
        const getData = async () => {
            const { data } = await axios.get(`/api/viatico_detalle/${datam.ejercicio.toString()}/${datam.viatico.toString()}/${datam.oficina.toString()}`);
            console.log(data.data)
            //alert("Lo que regresa el api del page.tsx "+JSON.stringify(data.data)) 
            setdetviatico(data.data)
            console.log(detviatico)
        }
        await getData();
        setShowModal(true)
    }

    //const modificaModal = async (valorviatico: TablaViaticos) => {
    const modificaModal = async (valorviatico: TablaViaticos) => {

        console.log(valorviatico)
        //setShowModal(false)



    }

    useEffect(() => {
        setLoading(true)
        setDatos([]);
        const getData = async () => {
            //const { data } = await axios.get(`/api/viaticos/${count.toString()}/${params.noemp}`);
            const { data } = await axios.get(`/api/viaticos/${count}/${params.noemp}`);
            setLoading(false)
            setDatos(data.data)
            //console.log({ data });

        }
        getData();

        const getCiudades = async () => {

            const { data } = await axios.get(`/api/ciudades`)
            setciudades(data.data)
            //console.log("Desde page",{data});

        }
        getCiudades();




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
            selector: (row: any) => 'V' + row.oficina.toString() + '-' + row.viatico.toString() + '/' + row.ejercicio.toString().substr(2, 2),
            sortable: true,
            width: '100px',
            style: {
                backgroundColor: 'rgba(208, 204, 207, 0.8)',
                color: 'gray-900',
            },
        },
        {
            name: "Fecha",
            selector: (row: any) => moment(row.fecha).format('DD/MM/YYYY'),
            sortable: true,
            maxWidth: '100px',
        },
        {
            name: "Origen",
            selector: (row: any) => row.origen,
            sortable: true,
            maxWidth: '100px',
        },
        {
            name: "Destino",
            selector: (row: any) => row.destino,
            sortable: true,
            maxWidth: '150px',
        },
        {
            name: "Motivo",
            //selector: (row: any) => row.movito,
            cell: (row: any) => <div style={{ fontSize: '11px' }}>{row.movito}</div>,
            sortable: true,
            wrap: true,
            maxWidth: '600px',
            //format: (row: any) => `${row.movito.slice(0, 200)}...`
        },
        {
            name: "Estatus",
            //selector: (row: any) => row.estatus == '1' ? 'INICIADO' : row.estatus == '2'? 'PAGADO C.C.' : row.estatus == '3'? 'CONTABILIDAD' : row.estatus == '4'? 'PAGADO' : row.estatus == '9'? 'CANCELADO' : '',
            cell: (row: any) => <div style={{ fontSize: '10px' }}>{row.estatus == '1' ? 'INICIADO' : row.estatus == '2' ? 'PAGADO C.C.' : row.estatus == '3' ? 'CONTABILIDAD' : row.estatus == '4' ? 'PAGADO' : row.estatus == '9' ? 'CANCELADO' : ''}</div>,
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
                            //alert(JSON.stringify(row))
                            cargarModal(row)

                            //setviaticos(row)
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
            <div className="">
                <Modalviatico
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                    detviatico={detviatico}
                    ciudades={ciudades}
                    modificaModal={modificaModal}
                />
            </div>
            <div className='m-4 w-auto'>

                <DataTable
                    title={params.nombre}
                    columns={columns}
                    pagination
                    paginationPerPage={15}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationComponentOptions={paginacionOpciones}
                    data={datos}
                    //data={filteredItems}
                    subHeader
                    subHeaderComponent={datos.length > 0 && <>
                        <button
                            className=" text-white bg-red-900 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-xs px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={() => router.push(`/dashboard/principal`)}>Lista Empleados</button>
                        <TextField
                            id="search"
                            type="text"
                            placeholder="Buscar"
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
                    noDataComponent={<p className='py-6 text-md text-gray-600'>Sin información</p>}
                    highlightOnHover
                    persistTableHead


                />
            </div>
        </>
    )

    //return <div>My Post: {params.noemp}</div>


}

export default Page