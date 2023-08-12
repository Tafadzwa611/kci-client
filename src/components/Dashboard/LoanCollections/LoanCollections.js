import React, { useState, useEffect, useRef } from 'react';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import Loader from '../../Loader/loader';
import LineChart from '../LineChart';

function LoanCollections({currencyId, branchIds}) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const pageNum = useRef(1);

  useEffect(() => {
    getData();
  }, [currencyId, branchIds]);

  const getData = async () => {
    try {
      pageNum.current = 1;
      const data = removeEmptyValues({currency_id: currencyId, branch_ids: branchIds, page_num: pageNum.current});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/dashboard-collections/', {params: params});
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
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

  const dataSet = {
    labels: data.map(month => `${month.month} ${month.year}`),
    datasets: [
      {
        label: 'Monthly Collections',
        data: data.map(month => month.total_amount_paid),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const viewMore = async () => {
    try {
      const data = removeEmptyValues({currency_id: currencyId, branch_ids: branchIds, page_num: pageNum.current+1});
      const params = getParams(data);
      const response = await axios.get('/dashboardapi/dashboard-collections/', {params: params});
      pageNum.current += 1;
      setData(curr => [...response.data, ...curr]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='book-value-section'>
          <div className='book-value-section dashboard-section-title' style={{marginBottom:'20px'}}>
            Monthly Collections
          </div>
          <div className='chart-section'>
            <div className='chart-container'>
              <div className='chart'>
                <LineChart data={dataSet}/>
              </div>
            </div>
            <div className='chart-scroller bottom'>
              <i onClick={viewMore} className='uil uil-arrow-circle-left' style={{cursor:'pointer'}}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanCollections;