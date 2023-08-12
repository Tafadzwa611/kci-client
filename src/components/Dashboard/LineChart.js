import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart({ data }) {
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
    },
    plugins: {
      legend: {
        display: false,
      },           
    }
  };

  return (
    <div style={{maxWidth: '100%', overflowX: 'auto'}}>
      <div style={{width: '100vw', height: '280px'}}>
        <Line options={options} data={data}/>
      </div>
    </div> 
  )
}

export default LineChart;