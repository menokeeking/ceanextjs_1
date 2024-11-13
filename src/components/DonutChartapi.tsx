import React from 'react';
import { Chart, ReactGoogleChartEvent } from 'react-google-charts';

// interface DonutChartProps {
//   data: Array<[string, number]>; // Ejemplo: [['Categoría A', 30], ['Categoría B', 70]]
//   title: string;
// }

interface ChartProps {
  tipo: string;
  amount: string;
}

interface Props {
  empData: ChartProps[];
  titulo: string;
}

const DonutChart: React.FC<Props> = ({ empData, titulo }) => {

  const chartEvents: ReactGoogleChartEvent[] = [
    
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        //console.log('Selection', selection)
        if (selection.length === 1) {
          const selectedItem = selection[0];
          console.log('Selected item:', chartData[selectedItem.row + 1]);
          //alert( chartData[selectedItem.row + 1])
        }
      },
    }
  ];

  const chartData = [['Tipo', 'Cantidad']];
  empData.forEach((item) => {
    chartData.push([item.tipo, item.amount]);
  });
  
  return (
    <div >
      <Chart
        width={'100%'}
        height={'300px'}
        
        chartType="PieChart"
        loader={<div>Cargando gráfica...</div>}
        data={chartData}
        options={{
          title: titulo,
          pieHole: 0.4, // Tamaño del agujero en la gráfica (0.4 = donut chart)
          pieSliceText: 'value', // Muestra los valores en las porciones
          //is3D: true,
          
        }}
        chartEvents={chartEvents}
      />
    </div>
  );
};

export default DonutChart;