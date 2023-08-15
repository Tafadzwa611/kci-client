import React, { useState, useEffect, useRef } from 'react';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import Select from 'react-select';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import Loader from '../../Loader/MiniLoader';
import LineChart from './LineChart';

function PaymentsChart() {
  const {currencies} = useCurrencies();
  const {branches} = useBranches();
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [optionSelected, setOptionSelected] = useState([]);
  const [branchIds, setBranchIds] = useState(null);
  const pageNum = useRef(1);

  let initCurrencyId = '';
  if (currencies.length > 0) {
    initCurrencyId = currencies[0].id;
  }
  const [currencyId, setCurrencyId] = useState(initCurrencyId);

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

  const style = {
    control: base => ({...base, border: '1px solid #dee2e6', boxShadow: 'none', '&:hover': '1px solid #dee2e6'})
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
    <div className='book-value-section' style={{marginTop:'1.5rem'}}>
      <div className='book-value-select-section'>
        <div className='fields-container-select select_container_width'>
          <select value={currencyId} onChange={evt => setCurrencyId(evt.target.value)} className='custom-select-form select_width' style={{padding:'0.5125rem 0.9rem'}}>
            <option value=''>Select Currency</option>
            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
          </select>
        </div>
        <div className='fields-container-select select_container_width branch'>
          <Select
            isMulti
            name='branches'
            options={branches.map(branch => ({label: branch.name, value: branch.id}))}
            value={optionSelected}
            classNamePrefix='select'
            className='basic-multi-select'
            placeholder='Select Branches'
            onChange={selected => {
              setOptionSelected(selected);
              setBranchIds(selected.map(branch => branch.value));
            }}
            styles={style}
          />
        </div>
      </div>
      {currencyId ? <div className='chart-section'>
        <div className='chart-scroller header'>
          <h1 className='dashboard-section-title'>Payments Chart</h1>
        </div>
        <CollectionsChart data={data} err={err}/>
        <div className='chart-scroller bottom'>
          <i onClick={viewMore} className='uil uil-arrow-circle-left' style={{cursor:'pointer'}}></i>
        </div>
      </div> : null}
    </div>
  )
}

const CollectionsChart = ({data, err}) => {
  if (err) {
    return (
      <div>
        Error Please Try Again.
      </div>
    )
  }

  if (!data) {
    return <Loader/>
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
      {
        label: 'Principal Collections',
        data: data.map(month => month.total_principal_amount_paid),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Interest Collections',
        data: data.map(month => month.total_interest_amount_paid),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Penalty Collections',
        data: data.map(month => month.total_penalty_paid),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Fees Collections',
        data: data.map(month => month.total_fees_paid),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'Over-Payments',
        data: data.map(month => month.total_money_to_be_refunded),
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  return (
    <div className='chart-container' style={{marginTop:'0'}}>
      <div className='chart'>
        <LineChart data={dataSet}/>
      </div>
    </div>
  )
}

export default PaymentsChart;
