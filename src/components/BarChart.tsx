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
        chartType="ColumnChart"
        loader={<div>Cargando gráfica...</div>}
        data={[
          [categoria, valor],
          ...data,
        ]}
        options={{
          title,
          //fontSize: 8,
          //bar: { groupWidth: '95%' },
          //bars: 'vertical', // Barras verticales
          hAxis: { title: valor, textStyle: {fontSize: 10,}},
          vAxis: { title: categoria, },
          //chartArea: { width: '50%', height: '30%' },
        }}
      />
    </div>
  );
};

export default BarChart;