import React, { useState, useEffect } from 'react';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Loader from '../../Loader/MiniLoader';

ChartJS.register(ArcElement, Tooltip, Legend);

function GroupNumbers({branchIds}) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getData();
  }, [branchIds]);

  const getData = async () => {
    try {
      const data = removeEmptyValues({branch_ids: branchIds});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/group-numbers/', {params: params});
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  }

  if (!data) {
    return (
      <div className='card-body'>
        <div className='book-value-section'>
          <Loader/>
        </div>
      </div>
    )
  }

  if (err) {
    return (
      <div className='card-body'>
        <div className='book-value-section'>
          Error Please Try Again.
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
  };

  const statusDataSet = {
    labels: data.group_status.map(s => s.status),
    datasets: [
      {
        label: '# Group Status',
        data: data.group_status.map(s => s.count),
        backgroundColor: data.group_status.map(s => statusColors[s.status]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      {data.group_types.length > 0 ?
        <div className='card-body'>
          <div className='book-value-section'>
            <div style={{display: 'flex', justifyContent: 'space-between', columnGap: '1%'}}>
              <div style={{width:'49%', flex: '1'}} className='book-value-section'>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                  <div style={{width: '48%'}}>
                    <Pie data={statusDataSet} />
                  </div>
                </div>
              </div>
              <div style={{width: '49%', flex: '1'}} className='book-value-section'>
                <div className='book-value-update-section'>
                  <div className='book-value-info-box group__type'>
                    <div style={{overflowY:'auto', height:'268px'}}>
                      <p className='dashboard-section-title j-details-container' style={{position:'sticky', top:'0', padding:'10px', fontWeight:'normal'}}>Group Types</p>
                      {data.group_types.map((gt, idx) => (
                        <p key={idx} style={{marginBottom:'0.625rem'}}>{gt.group_type__name} {gt.count}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>:
        null}
    </>
  )
}

export default GroupNumbers;