"use client"
import { TablaVehiculos } from "@/interfaces/TablaVehiculos";
import { Tabla_VhCatVehiculos } from '@/interfaces/Tabla_VhCatVehiculos';
import DataTable, { Media } from 'react-data-table-component';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { Accesodenegado } from '@/components/acceso_denegado'
import { useEffect, useState } from "react";
import { IoEye, IoPencilSharp, IoReader } from "react-icons/io5";
import styled from "styled-components";
import { ExclamationCircleIcon, UserGroupIcon, XCircleIcon, TruckIcon } from "@heroicons/react/20/solid";
import { Progress } from "./Progress";
import ModalVehiculos from "./ModalVehiculos";
import moment from "moment";
import { Vh_estatus} from '@/interfaces/TablaVh_estatus'
import { creapdf_vh_unidad } from "@/components/creapdf_vh_unidad"


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

function HandlerVehiculos() {

    const { data: session, status } = useSession()

    const router = useRouter()
    const [datos, setDatos] = useState([] as TablaVehiculos[])
    const [vhestatus, setvhestatus] = useState<Vh_estatus[]>({} as Vh_estatus[])
    const [vehiculo, setvehiculo] = useState<TablaVehiculos>({} as TablaVehiculos);
    const [filterText, setFilterText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isNew, setisNew] = useState(false);
    const [isRepet, setisRepet] = useState(false);
    const [loading, setLoading] = useState(false)


    const filteredItems = datos.filter(
        item => item.marca && item.marca.toLowerCase().includes(filterText.toLowerCase()) || item.modelo && item.modelo.toLowerCase().includes(filterText.toLowerCase()) || item.numero && item.numero.toString().includes(filterText.toLowerCase()),
    );

    const vehiculosvoid: TablaVehiculos = {
        numero: 0,
        ano: new Date().getFullYear(),
        noActivo: '',
        placas: '',
        color: '',
        odometro: 0,
        estatus: 1,
        ubicacion: '',
        fUltServ: null,
        fProxServ: null,
        tipo: 'GASOLINA',
        capacidad: '',
        pernoc: 0,
        comentarios: '',
        marca: '*',
        modelo: '*',
        serie: '*',
        descripcion: '*',
        fechaAdq: '01/01/1900',
        bmEstatus: 0,
        importe: 0,
        resguardo: 0,
        depto: '*',
        resguardante: '*',
        nombreAseg: '*',
        noSeguro: '*',
        vigencia: '*',
    }

    const RecibirdeModal = async (valorveh: Tabla_VhCatVehiculos, isnew: boolean) => {
        //console.log("recibo del modal: ", valorveh)
        

        //console.log("Valor a revisar: ",valorveh.numero)

        if (isnew) {

            alert("inicia funcion de consultar api de busqueda de vehiculo")
            const getDatavh = async () => {
                const { data } = await axios.get('/api/vehiculos_numero');
                
                const numExistente = data.data.find((d: number) => d == valorveh.numero);
                if(numExistente){
                    setisRepet(true)
                }else{
                    setvehiculo(vehiculosvoid)
                    setShowModal(false)
                    setisRepet(false)
                }
                //(numExistente! ? setisRepet(true) : setisRepet(false))
                
            }
            getDatavh();

            //console.log(datos2)
            //console.log("Numero Econ del form",valorveh.numero)
            //const numExistente = datos2.find((d) => d == valorveh.numero);
            
            // alert(isRepet)
            // if (isRepet!){
               
            //     console.log("Hola desde Handlervehiculos / Nuevo Modal", valorveh)
            //     // const getDataPost = async () => {
            //     //     const { data } = await axios.post('/api/empleados', valorveh);
            //     //     console.log(data)
            //     //     //setLoading(false)
            //     //     //setDatos(data.data)
            //     // }
            //     // getDataPost();
            //     setvehiculo(vehiculosvoid)
            //     setShowModal(false)
            //     setisRepet(false)
                
            // }

            
        } else {
            console.log("Hola desde Handlervehiculos / Modificar Modal", valorveh)
            // const url = '/api/empleados'
            // const putData = async () => {
            //     const config = { headers: { 'Content-Type': 'application/json' } };
            //     try {
            //         const data = await axios.put(url, valorveh, config);
            //         console.log("Lo que regresa el data", data)
            //     } catch (error) {
            //         console.error(error)
            //     }
            // }
            // putData();
            setvehiculo(vehiculosvoid)
            setShowModal(false)
            setisRepet(false)

        }
        

    }

    const cerrarModal = () => {
        
        setvehiculo(vehiculosvoid)
        setShowModal(false)
        setisRepet(false)
    }

    const quitarrep = () => {
        setisRepet(false)
    }

    useEffect(() => {

        setLoading(true)
        setDatos([]);

        const getData = async () => {
            const { data } = await axios.get('/api/vehiculos');
            setLoading(false)
            setDatos(data.data)
            //console.log(data.data)
        }
        getData();

        const getEstatus = async () => {
            const { data } = await axios.get(`/api/vehiculos_estatus`)
            setvhestatus(data.data)
        }
        getEstatus();

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
        { name: "NO. ECON.", selector: (row: any) => row.numero, sortable: true, right: true, maxWidth: '80px',
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
         },
        { name: "MARCA", selector: (row: any) => row.marca, sortable: true, maxWidth: '150px',
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
         },
        { name: "MODELO", selector: (row: any) => row.modelo, sortable: true, hide: Media.SM, maxWidth: '100px',
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
         },
        { name: "FECHAADQ", selector: (row: any) => moment(row.fechaAdq).format('DD/MM/YYYY'), sortable: true, hide: Media.SM, right: true, maxWidth: '80px',
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
         },
        { name: "PLACAS", selector: (row: any) => row.placas, sortable: true, hide: Media.MD, right: true, maxWidth: '80px',
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
         },
        { name: "SERIE", cell: (row: any) => <div style={{ fontSize: '11px' }}>{row.serie}</div>, sortable: true, hide: Media.MD, right: true, maxWidth: '150px',
        conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},] },
        {
            name: "DESCRIPCION", cell: (row: any) => <div style={{ fontSize: '11px' }}>{row.descripcion}</div>,
            sortable: true,
            wrap: true,
            format: (row: any) => `${row.movito.slice(0, 200)}...`,
            hide: Media.SM,
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
        },
        {
            name: "DEPTO", selector: (row: any) => row.depto, hide: Media.MD,
            conditionalCellStyles: [{when: (row: any) => row.depto == 'TRAMITE BAJA', style: {backgroundColor: 'rgba(251, 80, 117, 0.16)',},},]
        },
        {
            name: 'ACCIONES', button: true, selector: (row: any) => row.id, cell: (row: any) =>
                <>  <div className="">
                    <button title='Detalle Vehiculo'
                        type="button"
                        onClick={() => {
                            //console.log(row)
                             setisNew(false)
                             setvehiculo(row)
                             setShowModal(true)
                        }}>
                        <IoEye className="w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>

                    <button title='Editar' type="button" onClick={() => {
                        //creapdf_emp(row)
                    }}>

                        <IoPencilSharp className="ml-2 w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>

                    <button title='Detalle Vehiculo'
                        type="button"
                        onClick={() => {
                            creapdf_vh_unidad(row)
                            //actnombredin(row.nombre + ' ' + row.paterno + ' ' + row.materno)
                            //router.push(`/dashboard/Detallexemp?id=${row.idEmpleado}`)
                        }}
                    >
                        <IoReader className="ml-2 w-5 h-5 text-red-900 hover:text-primary-700 transition-colors" />
                    </button>
                </div>
                </>,
        }
    ]

    return (
        session?.user.rol == 1 ?
        <>
            
            <div className="">
                
                <ModalVehiculos isVisible={showModal} onClose={() => cerrarModal()} vehiculo={vehiculo} estatus={vhestatus} isNew={isNew} recibirModal={RecibirdeModal} isRepet={isRepet} quitarrepet={() => quitarrep()} />
            </div>
            <div className="w-full">

                <DataTable
                    title={
                        <div className="flex flex-row items-center justify-center lg:justify-start md:justify-start w-full">
                            <TruckIcon className=" h-6 w-6 text-gray-600 mx-3" />
                            <p className='py-2 text-md font-semibold text-gray-600 uppercase '>Catalogo de Vehiculos</p>
                        </div>
                    }

                    columns={columns}
                    pagination
                    paginationPerPage={15}
                    //paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    paginationComponentOptions={paginacionOpciones}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={datos.length > 0 && <>
                        <div className="lg:flex flex-row md:flex items-center justify-between w-full mb-4">
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        //console.log(vehiculosvoid)
                                        setShowModal(true)
                                        setisNew(true)
                                        setvehiculo(vehiculosvoid)
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
                    fixedHeader={true}
                    fixedHeaderScrollHeight="500px"
                />
            </div>


        </>
         :
         <>
           <Accesodenegado />
         </> 
    )
}

export default HandlerVehiculos

