import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import Loader from '../../Loader/loader';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClientNumbers = ({branchIds}) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getData();
  }, [branchIds]);

  const getData = async () => {
    try {
      const data = removeEmptyValues({branch_ids: branchIds});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/client-numbers/', {params: params});
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }

  if (!data) {
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='book-value-section'>
            <Loader/>
          </div>
        </div>
      </div>
    )
  }

  if (err) {
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='book-value-section'>
            Error Please Try Again.
          </div>
        </div>
      </div>
    )
  }

  const statusColors = {
    'Active': 'rgba(255, 99, 132, 0.2)',
    'Blacklisted': 'rgba(54, 162, 235, 0.2)',
    'Processing': 'rgba(255, 206, 86, 0.2)',
    'Pending Approval': 'rgba(75, 192, 192, 0.2)',
    'Inactive': 'rgba(153, 102, 255, 0.2)',
    'Left': 'rgba(255, 159, 64, 0.2)',
    'Rejected': 'rgba(153, 102, 255, 1)',
  }

  const maleStatusDataSet = {
    labels: data.client_status.filter(s => s.gender === 'MALE').map(s => `${s.gender} ${s.status}`),
    datasets: [
      {
        label: '# Male Clients Status',
        data: data.client_status.filter(s => s.gender === 'MALE').map(s => s.count),
        backgroundColor: data.client_status.filter(s => s.gender === 'MALE').map(s => statusColors[s.status]),
        borderWidth: 0,
      },
    ],
  };

  const femaleStatusDataSet = {
    labels: data.client_status.filter(s => s.gender === 'FEMALE').map(s => `${s.gender} ${s.status}`),
    datasets: [
      {
        label: '# Female Clients Status',
        data: data.client_status.filter(s => s.gender === 'FEMALE').map(s => s.count),
        backgroundColor: data.client_status.filter(s => s.gender === 'FEMALE').map(s => statusColors[s.status]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div style={{display: 'flex', justifyContent: 'space-between', columnGap: '10px'}}>
          <div style={{width: '24%'}}>
            <Pie data={maleStatusDataSet} />
          </div>
          <div style={{width: '24%'}}>
            <Pie data={femaleStatusDataSet} />
          </div>
          <div style={{width: '48%'}}>
            <div className='book-value-section'>
              <div className='book-value-update-section'>
                <div className='book-value-info-box'>
                  <p className='dashboard-section-title'>Male Client Types</p>
                  {data.client_types.filter(ct => ct.gender === 'MALE').map(
                    (ct, idx) => <p key={idx} className='dashboard-section-amount-or-number'>{ct.gender} {ct.client_type__name} {ct.count}</p>
                  )}
                </div>
                <div className='book-value-info-box'>
                  <p className='dashboard-section-title'>Female Client Types</p>
                  {data.client_types.filter(ct => ct.gender === 'FEMALE').map(
                    (ct, idx) => <p key={idx} className='dashboard-section-amount-or-number'>{ct.gender} {ct.client_type__name} {ct.count}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientNumbers;