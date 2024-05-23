"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import DataTable, { Media } from 'react-data-table-component';
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
height: 30px;
width: 300px;
border-radius: 1px;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;
border-top-right-radius: 0;
border-bottom-right-radius: 0;
border: 1px solid #6c7d87;
padding: 0 32px 0 16px;
&:hover {cursor: pointer;}`;

function Principal() {

  const router = useRouter()

  const inicio = useCounterStore((state) => state.alinicio)
  const [datos, setDatos] = useState([] as TablaEmpleados[])
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [empleados, setempleados] = useState<TablaEmpleados>({} as TablaEmpleados);
  const actnombredin = useCounterStore(state => state.actnombredin)
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => { setIsOpen(false) };
  const openModal = () => { setIsOpen(true) };

  const filteredItems = datos.filter(
    item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()) || item.paterno && item.paterno.toLowerCase().includes(filterText.toLowerCase()) || item.idEmpleado && item.idEmpleado.toString().includes(filterText.toLowerCase()),
  );

  useEffect(() => {
    if (inicio) openModal()
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
    table:{
      style:{
        
      },
    },
    rows: {
      style: {
        minHeight: '150px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '4px', // override the cell padding for data cells
        paddingRight: '4px',
      },
    },
  };

  const columns = [
    { name: "NO. EMP.", selector: (row: any) => row.idEmpleado, sortable: true, },
    { name: "NOMBRE", selector: (row: any) => row.nombre, sortable: true, },
    { name: "PATERNO", selector: (row: any) => row.paterno, sortable: true, hide: Media.SM },
    { name: "MATERNO", selector: (row: any) => row.materno, sortable: true, hide: Media.SM },
    { name: "NIV", selector: (row: any) => row.nivel, sortable: true, hide: Media.SM },
    { name: "DEPTO", selector: (row: any) => row.depto, sortable: true, hide: Media.SM },
    { name: "OBRA", selector: (row: any) => row.obra, hide: Media.SM },
    { name: "DPPTO", selector: (row: any) => row.deptoPpto, hide: Media.SM },
    { name: "DCOMI", selector: (row: any) => row.deptoComi, hide: Media.SM },
    {
      name: 'ACCIONES', button: true, selector: (row: any) => row.id, cell: (row: any) =>
        <>
          <button title='Detalle Empleado'
            type="button"
            onClick={() => {
              setShowModal(true)
              setempleados(row)
            }}>
            <IoEye className="w-5 h-5 text-red-900" />
          </button>

          <button title='Editar' type="button">
            <IoPencilSharp className="ml-2 w-5 h-5 text-red-900" />
          </button>

          <button title='Detalle Viaticos'
            type="button"
            onClick={() => {
              actnombredin(row.nombre + ' ' + row.paterno + ' ' + row.materno)
              router.push(`/dashboard/Datatables/${row.idEmpleado}`)
            }}

          >
            <IoReader className="ml-2 w-5 h-5 text-red-900" />
          </button>
        </>
    }
  ]

  return (
    <>
      <div className="">
        <ModalSetejercicio isVisible={isOpen} CerrarModal={closeModal} />
      </div>
      <div className="">
        {/* <Modaltest showModal={showModal} /> */}
        <Modaltest isVisible={showModal} onClose={() => setShowModal(false)} empleados={empleados} />
      </div>
      <div className="-z-10 fixed">
        <DataTable
          title={<p className='py-2 text-md font-semibold text-gray-500 '>Empleados CEA</p>}
          columns={columns}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationComponentOptions={paginacionOpciones}
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
              className=" h-7 w-7 text-gray-200 bg-primary-900 border-top-left-radius: 0 border-bottom-left-radius: 0 border-top-right-radius: 5px border-bottom-right-radius: 5px cursor-pointer"
              aria-hidden="true"
              onClick={() => setFilterText('')}
            />
          </>}
          dense={true}
          striped={true}
          // //selectableRows
          progressPending={loading}
          progressComponent={<Progress />}
          noDataComponent={<p className='py-6 text-md font-bold text-gray-800 uppercase '>Sin información</p>}
          highlightOnHover
          persistTableHead
          customStyles={customStyles}
        />
      </div>


    </>
  )
}

export default Principal

