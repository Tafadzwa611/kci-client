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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, wrapperWidth }) {
  
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
    // <div className='chartWrapper'>
      <div style={{maxWidth:"100%", overflowX:"auto"}}>
        {/* <div className='chartAreaWrapper2' style={{width: `${wrapperWidth}px`, height: '480px'}}>  */}
        <div style={{width: '100vw', height: '280px'}}>
          <Line options={options} data={data}/>
        </div>
      </div> 
    // </div>
  )
}

export default LineChart;