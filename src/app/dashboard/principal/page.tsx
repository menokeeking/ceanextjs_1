
"use client";
import Link from "next/link";
import DonutChart from '@/components/DonutChart';
import BarChart from "@/components/BarChart";


function Principal() {

  const chartData: Array<[string, number]> = [
    ["Confianza", 73],
    ["Base", 109],
    ["Contrato", 30]
  ]

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

  return (
    <>

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
              <span className="bg-primary-800 text-gray-100 text-2xl font-bold p-2 rounded-xl w-18">
                220
              </span>
            </div>
            <div className="">
              <DonutChart title="Tipos de Empleado" data={chartData} />
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
                <p className="text-gray-500">Total de Empleados </p>
              </div>
              <span className="bg-primary-800 text-gray-100 text-2xl font-bold p-2 rounded-xl w-18">
                70
              </span>
            </div>
            <div className="">
              <BarChart data={chartData2} title="Distribución Año de la Unidad" categoria={"CANTIDAD"} valor={"AÑOS"} />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Principal

