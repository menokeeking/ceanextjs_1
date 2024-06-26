"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';
import DataTable, { Media } from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader, IoCloudDownload } from 'react-icons/io5';
import { SiMicrosoftexcel } from "react-icons/si";
import { TbArrowBackUp } from "react-icons/tb";
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
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Image from 'next/image';
// import fs from 'fs/promises';



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
    const nombredin = useCounterStore((state) => state.nombredinamico)
    const [showModal, setShowModal] = useState(false);
    const [datos, setDatos] = useState([] as TablaListaViaticos[])
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false)
    const [viaticos, setviaticos] = useState<TablaListaViaticos>({} as TablaListaViaticos)
    //const [valorviatico, setvalorviatico] = useState<TablaViaticos>({} as TablaViaticos)
    const [ciudades, setciudades] = useState<Ciudad[]>({} as Ciudad[])
    const [detviatico, setdetviatico] = useState<DetalleViatico>({ fecha: '01/01/2024', fechaRegreso: '01/01/2024', fechaSalida: '01/01/2024' } as DetalleViatico)
    const [realoadData, setrealoadData] = useState(false)
    const [pathimg, setpathimg] = useState(`/images/p1.jpg`)

    const router = useRouter()

    const cargarModal = async (datam: any) => {
        const getData = async () => {
            const { data } = await axios.get(`/api/viatico_detalle/${datam.ejercicio.toString()}/${datam.viatico.toString()}/${datam.oficina.toString()}`);
            setdetviatico(data.data)
        }
        await getData();
        setShowModal(true)
    }

    const modificaModal = async (valorviatico: TablaViaticos) => {
        //console.log("Se ejecuta funcion Modificamodal "+JSON.stringify(valorviatico))
        //const url = `/api/viatico_detalle/${valorviatico.ejercicio.toString()}/${valorviatico.noViat.toString()}/${valorviatico.oficina.toString()}`
        const url = '/api/viaticos'
        //console.log(url)
        const putData = async () => {
            const config = { headers: { 'Content-Type': 'application/json' } };
            try {
                const data = await axios.put(url, valorviatico, config);
                console.log(data)
            } catch (error) {
                console.error(error)
            }

        }
        putData();
        setrealoadData((prev) => !prev)
        setShowModal(false)
    }

    let imagePath = `/images/p${params.noemp}.jpg`;
    //let imagePath = `/images/p1.jpg`;
    let anyExistingImage = "/images/p1.jpg";

    // Using HEAD method, just check the headers for status code
    const isImageFound = async (imageName: string) => {
        return await fetch(`http://localhost:8181${imageName}`, {
            method: "HEAD",
        });
    };

    useEffect(() => {
        //console.log("Hola", params.noemp, params.nombre)
        setLoading(true)
        setDatos([]);
        const getData = async () => {
            //const { data } = await axios.get(`/api/viaticos/${count.toString()}/${params.noemp}`);
            const { data } = await axios.get(`/api/viaticos/${count}/${params.noemp}`);
            setLoading(false)
            setDatos(data.data)
        }
        getData();

        const getCiudades = async () => {
            const { data } = await axios.get(`/api/ciudades`)
            setciudades(data.data)
        }
        getCiudades();

        const verificar = async () => {
            const result = await isImageFound(imagePath);
            if (result.status === 404) {
                setpathimg(anyExistingImage)
            } else {
                setpathimg(imagePath)
            }
        }
        verificar();

    }, [realoadData])



    const paginacionOpciones = {
        rowsPerPageText: "Registros por Página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const columns = [
        {
            name: "No.",
            selector: (row: any) => 'V' + row.oficina.toString() + '-' + row.viatico.toString() + '/' + row.ejercicio.toString().substr(2, 2),
            sortable: true,
            center: true,
            maxWidth: '100px',
            style: {
                backgroundColor: 'rgba(208, 204, 207, 0.8)',
                color: 'gray-900',
            },
        },
        {
            name: "Fecha",
            selector: (row: any) => moment(row.fecha).format('DD/MM/YYYY'),
            sortable: true,
            hide: Media.SM,
            // maxWidth: '100px',
        },
        {
            name: "Origen",
            selector: (row: any) => row.origen,
            sortable: true,
            hide: Media.SM,
            // maxWidth: '100px',
        },
        {
            name: "Destino",
            selector: (row: any) => row.destino,
            sortable: true,
            hide: Media.SM,
            // maxWidth: '100px',
        },
        {
            name: "Motivo",
            //selector: (row: any) => row.movito,
            cell: (row: any) => <div style={{ fontSize: '11px' }}>{row.movito}</div>,
            sortable: true,
            wrap: true,
            // maxWidth: '300px',
            format: (row: any) => `${row.movito.slice(0, 200)}...`,
            hide: Media.SM
        },
        {
            name: "Estatus",
            //selector: (row: any) => row.estatus == '1' ? 'INICIADO' : row.estatus == '2'? 'PAGADO C.C.' : row.estatus == '3'? 'CONTABILIDAD' : row.estatus == '4'? 'PAGADO' : row.estatus == '9'? 'CANCELADO' : '',
            cell: (row: any) => <div style={{ fontSize: '10px' }}>{row.estatus == '1' ? 'INICIADO' : row.estatus == '2' ? 'PAGADO C.C.' : row.estatus == '3' ? 'CONTABILIDAD' : row.estatus == '4' ? 'PAGADO' : row.estatus == '9' ? 'CANCELADO' : ''}</div>,
            sortable: true,
            // width: '90px',
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
            // width: '',
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

    //const imagePath = `/images/p${params.noemp}.jpg`;

    function exportToCSV(apiData: TablaListaViaticos[], fileName: string): void {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <>
            {/* <div className="">
                <Modalviatico
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                    detviatico={detviatico}
                    ciudades={ciudades}
                    modificaModal={modificaModal}
                />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                <div className="border rounded-lg bg-gray-100">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-8">
                        
                        <Image src={pathimg} alt={`Imagen ${params.noemp}`} width={50} height={50} className="rounded-full ring-gray-500" />
                        <div>
                            <h3 className="font-semibold text-xl md:text-2xl text-gray-700">
                            {nombredin}
                            </h3>
                            <p className="text-gray-600">Empleado de la CEA</p>
                        </div>
                    </div>
                </div>
            </div>
                <div className='flex-col items-center justify-center -z-10 fixed'>

                    <DataTable
                        // title={
                        //     <div className='flex items-center justify-start '>
                        //         <div className="">
                        //             <Image src={pathimg} alt={`Imagen ${params.noemp}`} width={50} height={50} className="rounded-full" />
                        //         </div>
                        //         <div className='text-black-600 font-bold sm:text-xs px-2'>
                        //             {nombredin}
                        //         </div>

                        //     </div>
                        // }
                        columns={columns}
                        pagination
                        paginationPerPage={5}
                        //paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        paginationComponentOptions={paginacionOpciones}
                        data={datos}
                        //data={filteredItems}
                        subHeader
                        subHeaderComponent={datos.length > 0 && <>
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
                            <button
                                className="ml-2 w-5 h-5 text-green-900"
                                onClick={() => router.push(`/dashboard/principal`)}>
                                <TbArrowBackUp className="ml-2 w-5 h-5 text-blue-900"></TbArrowBackUp>
                            </button>
                            <button
                                type="button"
                                onClick={() => exportToCSV(datos, 'nombre_de_archivo')}
                            ><SiMicrosoftexcel className="ml-2 w-5 h-5 text-green-900"></SiMicrosoftexcel></button>

                        </>}
                        dense={true}
                        striped={true}
                        //selectableRows
                        progressPending={loading}
                        progressComponent={<Progress />}
                        noDataComponent={<><TbArrowBackUp></TbArrowBackUp><p
                            className='py-6 text-md text-gray-600'>
                            <a onClick={() => router.push(`/dashboard/principal`)}> Sin información </a>
                        </p></>}
                        highlightOnHover
                        persistTableHead
                    />
                </div>
            </>
            )

}

export default Page