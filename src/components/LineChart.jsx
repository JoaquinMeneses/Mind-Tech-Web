import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js';
ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);

const LineChart = () => {
    const generateMonths = (count) => {
        const months = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
      
        // Asegúrate de que el mes actual sea junio
        currentDate.setMonth(5); // 5 representa el índice de junio (enero es 0)
      
        for (let i = 0; i < count; i++) {
          const monthIndex = (currentMonth + i) % 12; // Obtener el índice del mes considerando el desplazamiento
          currentDate.setMonth(monthIndex); // Establecer el mes actual en el índice calculado
          const month = currentDate.toLocaleString('default', { month: 'long' });
          months.push(month);
        }
      
        return months;
      };
      
      

  const labels = generateMonths(12);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [35, 37, 42, 38, 32, 48, 40, 52, 60,78, 120],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line className='h-[100%] w-full' data={data} />;
};

export default LineChart;

