// components/BarChart.tsx

import React from 'react';
import { Chart } from 'react-google-charts';

interface BarChartProps {
  data: Array<[string, number]>; // Ejemplo: [['Categoría A', 30], ['Categoría B', 70]]
  title: string;
  categoria: string;
  valor: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, categoria, valor }) => {
  return (
    <div>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Cargando gráfica...</div>}
        data={[
          [categoria, valor],
          ...data,
        ]}
        options={{
          title,
          bars: 'vertical', // Barras verticales
          hAxis: {
            title: categoria,
          },
          vAxis: {
            title: valor,
          },
        }}
      />
    </div>
  );
};

export default BarChart;