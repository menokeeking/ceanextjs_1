
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DonutChart from '@/components/DonutChart';
import BarChart from "@/components/BarChart";
import ModalSetejercicio from "@/components/ModalSetejercicio";
import { useCounterStore } from "@/store/counterStore";
import { TiposEmpleado } from "@/interfaces/TiposEmpleado";
import { Veh_xmodelo } from "@/interfaces/Veh_xmodelo";
import axios from "axios";
import DonutChartapi from "@/components/DonutChartapi";
import BarChartapi from "@/components/BarChartapi";


function Principal() {

  const inicio = useCounterStore((state) => state.alinicio)
  const [isOpen, setIsOpen] = useState(false);
  const [totEmp, settotEmp] = useState(0);
  const [totVeh, settotVeh] = useState(0);
  const [empDatos, setempDatos] = useState([] as TiposEmpleado[]);
  const [vehDatos, setvehDatos] = useState([] as Veh_xmodelo[]);
  const closeModal = () => { setIsOpen(false) };
  const openModal = () => { setIsOpen(true) };

  // const chartData: Array<[string, number]> = [
  //   ["Confianza", 73],
  //   ["Base", 109],
  //   ["Contrato", 30]
  // ]

  const chartData2: Array<[string, number]> = [
    ["1994",	1],
    ["1998",	2],
    ["2000",	1],
    ["2002",	5],
    ["2003",	6],
    ["2004",	6],
    ["2005",	6],
    ["2006",	5],
    ["2008",	15],
    ["2009",	10],
    ["2010",	3],
    ["2012",	4],
    ["2013",	5],
    ["2019",	1]
  ]


//   Inicialización directa: Puedes crear un array con los valores deseados directamente al declararlo:
// const miArray: Array<[string, number]> = [
//   ['Manzana', 10],
//   ['Plátano', 5],
//   ['Naranja', 8],
// ];

// Agregar elementos dinámicamente: Si necesitas llenar el array dinámicamente (por ejemplo, desde una API o una base de datos), puedes hacer lo siguiente:
// // Supongamos que obtienes datos de una API
// const apiData = [
//   { nombre: 'Manzana', cantidad: 10 },
//   { nombre: 'Plátano', cantidad: 5 },
//   { nombre: 'Naranja', cantidad: 8 },
// ];

// // Mapea los datos a un array de tuplas
// const miArray: Array<[string, number]> = apiData.map((item) => [
//   item.nombre,
//   item.cantidad,
// ]);

// Usando un bucle: Si tienes una lista de nombres y cantidades, puedes llenar el array utilizando un bucle:
// const nombres = ['Manzana', 'Plátano', 'Naranja'];
// const cantidades = [10, 5, 8];

// const miArray: Array<[string, number]> = [];

// for (let i = 0; i < nombres.length; i++) {
//   miArray.push([nombres[i], cantidades[i]]);
// }

useEffect(() => {
  if (inicio) {
      openModal()
  }

  const getData = async () => {
    try {
        const { data } = await axios.get('/api/empleados_tipo'); // Cambia la URL de la API
        
        settotEmp(data.data.e_total)
        const tipos: TiposEmpleado[] = [
          { tipo: 'Confianza', amount: data.data.e_c},
          { tipo: 'Base', amount: data.data.e_b},
          { tipo: 'Contrato', amount: data.data.e_t},
        ];
        setempDatos(tipos)
        //console.log(data.data.e_total)
        
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
  }
  getData();

  const getData2 = async () => {
    try {
        const { data } = await axios.get('/api/vehiculos_xmodelo'); // Cambia la URL de la API
        const totalCantidad = data.data.reduce((acc: number, item: { cantidad: number; }) => acc + item.cantidad, 0);
        //console.log(data)
        settotVeh(totalCantidad)
        setvehDatos(data.data)
    
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
  }
  getData2();


  
}, [])

  return (
    <>
      <div className="">
                <ModalSetejercicio isVisible={isOpen} CerrarModal={closeModal} />
            </div>
      <div className="flex">

        <div className="p-4 m-2 lg:w-2/6 bg-gray-100 rounded-xl flex flex-col justify-between gap-4 drop-shadow-md">
          <div className="grid items-center gap-4 bg-primary-100/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="mx-4">
                <Link href="/dashboard/empleados">
                  <h3 className="font-bold hover:text-gray-600">Empleados</h3>
                </Link>
                <p className="text-gray-500">Total de Empleados </p>
              </div>
              <span className="bg-primary-800 text-gray-100 text-2xl font-bold p-2 rounded-xl w-18">  {totEmp} </span>
            </div>
            <div className="">
              <DonutChartapi empData={empDatos} titulo="Tipos de Empleados CEA"  />
            </div>
          </div>
        </div>
        <div className="p-4 m-2 lg:w-2/6 bg-gray-100 rounded-xl flex flex-col justify-between gap-4 drop-shadow-md">
          <div className="grid items-center gap-4 bg-primary-100/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="mx-4">
                <Link href="/dashboard/vehiculos">
                  <h3 className="font-bold hover:text-gray-600">Vehiculos</h3>
                </Link>
                <p className="text-gray-500">Total de Unidades </p>
              </div>
              <span className="bg-primary-800 text-gray-100 text-2xl font-bold p-2 rounded-xl w-18"> {totVeh}</span>
            </div>
            <div className="">
              {/* <BarChart data={chartData2} title="Distribución Año de la Unidad" categoria={"CANTIDAD DE UNIDADES"} valor={"MODELO"} /> */}
              <BarChartapi data={vehDatos} title="Distribución Año de la Unidad" categoria={"CANTIDAD DE UNIDADES"} valor={"MODELO"} />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Principal

