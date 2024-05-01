"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoEye, IoPencilSharp, IoReader } from 'react-icons/io5';
import { TablaEmpleados } from '@/interfaces/TablaEmpleados';
import styled from 'styled-components';
import { XCircleIcon } from '@heroicons/react/20/solid'
import Modaltest from '@/components/Modaltest';
import { Progress } from '@/components/Progress';
import { useRouter } from 'next/navigation';
import ModalSetejercicio from '@/components/ModalSetejercicio';
import { useCounterStore } from '@/store/counterStore';

const TextField = styled.input`
height: 32px;
width: 250px;
border-radius: 1px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0;
border-bottom-right-radius: 0;
border: 1px solid #d9b6b6;
padding: 0 32px 0 16px;

&:hover {
    cursor: pointer;
}
`;

function Principal() {

  const router = useRouter()

  const inicio = useCounterStore((state) => state.alinicio)
  const [datos, setDatos] = useState([] as TablaEmpleados[])
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [empleados, setempleados] = useState<TablaEmpleados>({} as TablaEmpleados);

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => { setIsOpen(false) };
  const openModal = () => { setIsOpen(true) };

  const filteredItems = datos.filter(
    item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()) || item.paterno && item.paterno.toLowerCase().includes(filterText.toLowerCase()) || item.idEmpleado && item.idEmpleado.toString().includes(filterText.toLowerCase()),
  );


  useEffect(() => {
    
    if (inicio) setIsOpen(true)
    setLoading(true)
    setDatos([]);
    const getData = async () => {
      const { data } = await axios.get('/api/empleados');
      setLoading(false)
      setDatos(data.data)
    }
    getData();
    console.log(inicio)
  }, [])


  const paginacionOpciones = {
    rowsPerPageText: "Registros por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const columns = [
    {
      name: "No. Empleado",
      selector: (row: any) => row.idEmpleado,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      sortable: true,
    },
    {
      name: "Paterno",
      selector: (row: any) => row.paterno,
      sortable: true,
    },
    {
      name: "Materno",
      selector: (row: any) => row.materno,
      sortable: true,
    },
    {
      name: "Nivel",
      selector: (row: any) => row.nivel,
      sortable: true,
    },
    {
      name: "Depto",
      selector: (row: any) => row.depto,
    },
    {
      name: "Obra",
      selector: (row: any) => row.obra,
    },
    {
      name: "DeptoPpto",
      selector: (row: any) => row.deptoPpto,
    },
    {
      name: "DeptoComi",
      selector: (row: any) => row.deptoComi,
    },

    {
      name: 'ACCIONES',
      button: true,
      selector: (row: any) => row.id,
      cell: (row: any) =>
        <>
          <button title='Detalle Empleado'
            type="button"
            onClick={() => {
              setShowModal(true)
              setempleados(row)
            }}
          >
            <IoEye className="w-5 h-5 text-red-900" />
          </button>

          <button title='Editar'
            type="button"
          >
            <IoPencilSharp className="ml-2 w-5 h-5 text-red-900" />
          </button>

          <button title='Detalle Viaticos'
            type="button"
            //onClick={()=> router.push(`/dashboard/Datatables/${row.idEmpleado}`)}
            onClick={() => router.push(`/dashboard/Datatables/${row.idEmpleado}`)}
          >
            <IoReader className="ml-2 w-5 h-5 text-red-900" />
          </button>
        </>
    }

  ]


  return (
    <>

      <div className="">
        {/* <button onClick={openModal}>Abrir Modal, valor: {inicio.toString()}</button> */}
        <p>Variable Global {inicio.toString()}</p>
        {/* <ModalSetejercicio isVisible={isOpen} CerrarModal={closeModal} /> */}
        <ModalSetejercicio isVisible={isOpen} CerrarModal={closeModal} />
      </div>
      <div className="">
        {/* <Modaltest showModal={showModal} /> */}
        <Modaltest isVisible={showModal} onClose={() => setShowModal(false)} empleados={empleados} />
      </div>
      <div className='m-4 w-auto'>

        <DataTable
          title="Usuarios - Empleados"
          columns={columns}
          pagination
          paginationPerPage={15}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationComponentOptions={paginacionOpciones}
          //data={datos}
          data={filteredItems}
          subHeader
          subHeaderComponent={datos.length > 0 && <>
            <TextField
              id="search"
              type="text"
              placeholder="Buscar"
              aria-label="Search Input"
              value={filterText}
              onChange={e => setFilterText(e.target.value.toUpperCase())}>
            </TextField>
            <XCircleIcon
              className=" h-6 w-6 text-gray-100 bg-primary-800 border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer"
              aria-hidden="true"
              onClick={() => setFilterText('')}
            />
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
}

export default Principal