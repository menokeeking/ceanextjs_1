"use client"
import { TablaListaViaticos } from '@/interfaces/TablaListaViaticos';
import { useCounterStore } from '@/store/counterStore';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DataTable, { Media } from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader } from 'react-icons/io5';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { TbArrowBackUp } from 'react-icons/tb';
import { SiMicrosoftexcel } from 'react-icons/si';
import { Progress } from './Progress';
import { useRouter } from 'next/navigation';

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

function Tablasdeviaticos({ params }: 
    { params: { 
        noemp: string, 
        muestraModal: (detviatico: any)=> void,
        realoadData: boolean,
        } 
    }) 
    {

    const count = useCounterStore((state) => state.count)
    const [datos, setDatos] = useState([] as TablaListaViaticos[])
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        setDatos([]);
        const getData = async () => {
            const { data } = await axios.get(`/api/viaticos/${count}/${params.noemp}`);
            setLoading(false)
            setDatos(data.data)
            //console.log(data.data)
        }
        getData();

    }, [params.realoadData])

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
            cell: (row: any) => <div style={{ fontSize: '11px' }}>{row.motivo}</div>,
            sortable: true,
            wrap: true,
            // maxWidth: '300px',
            format: (row: any) => `${row.motivo.slice(0, 200)}...`,
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
                        // onClick={() => { cargarModal(row) }}>
                        onClick={() => { params.muestraModal(row) }}>
                        <IoEye className="w-5 h-5 text-red-900" />
                    </button>
                    <button type="button">
                        <IoPencilSharp className="ml-2 w-5 h-5 text-red-900" />
                    </button>
                    <button type="button">
                        <IoReader className="ml-2 w-5 h-5 text-red-900" />
                    </button>
                </>
        }

    ]

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
        <div className='flex-col items-center justify-center -z-10'>

            <DataTable
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
                    ><SiMicrosoftexcel className="ml-4 w-5 h-5 text-green-900"></SiMicrosoftexcel></button>

                </>}
                dense={true}
                striped={true}
                progressPending={loading}
                progressComponent={<Progress />}
                noDataComponent={
                    <>
                        <div className='px-4 flex items-center justify-between cursor-pointer hover:text-bold'>
                            <TbArrowBackUp />
                            <p className='py-6 text-md text-gray-600'>
                                <a onClick={() => router.push(`/dashboard/empleados`)}> Sin información </a>
                            </p>
                        </div>
                    </>}
                highlightOnHover
                persistTableHead
            />
        </div>

    )
}

export default Tablasdeviaticos