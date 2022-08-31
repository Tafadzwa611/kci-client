
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data, wrapperWidth }) {
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
        beginAtZero: true
      },
      x: {
        display: true
      }
    }
  };

  return (
        <div style={{maxWidth:"100%", overflowX:"auto"}}>
            <div style={{width: '100vw', height: '280px'}}>
                <Bar options={options} data={data} />
            </div>
        </div> 
    )
}

export default BarChart;