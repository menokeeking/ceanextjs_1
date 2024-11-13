import React from 'react';
import { Chart } from 'react-google-charts';

interface DonutChartProps {
  data: Array<[string, number]>; // Ejemplo: [['Categoría A', 30], ['Categoría B', 70]]
  title: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  return (
    <div >
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Cargando gráfica...</div>}
        data={[
          ['Categoría', 'Valor'],
          ...data,
        ]}
        options={{
          title,
          pieHole: 0.4, // Tamaño del agujero en la gráfica (0.4 = donut chart)
          pieSliceText: 'value', // Muestra los valores en las porciones,
          //is3D: true,
        }}
      />
    </div>
  );
};

export default DonutChart;