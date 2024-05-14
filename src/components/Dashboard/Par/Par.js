import React, { useEffect, useState } from 'react';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import Loader from '../../Loader/MiniLoader';

const endpoints = [1, 30, 60, 90];

function Par({currencyId, branchIds}) {
  const [par, setPar] = useState(null);
  const [err, setErr] = useState(false);
  const {currencies} = useCurrencies();
  const currency = currencies.find(currency => currency.id === currencyId);

  useEffect(() => {
    getData();
  }, [currencyId, branchIds]);

  const getData = async () => {
    try {
      const data = removeEmptyValues({currency_id: currencyId, branch_ids: branchIds});
      await axios.all(endpoints.map((endpoint) => {
        data.lower_limit = endpoint;
        const params = getParams(data);
        return axios.get('/reportsapi/par-report/', {params: params})
      })).then(
        (responses) => {
          const par = {}
          responses.forEach(response => {
            par[response.config.params.get('lower_limit')] = response.data;
          });
          setPar(par);
        }
      );
    } catch (error) {
      console.log(error);
      setErr(true);
    }
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

  if (!par) {
    return (
      <div className='card-body'>
        <div className='book-value-section'>
          <Loader/>
        </div>
      </div>
    )
  }

  return (
    <div className='card-body'>
      <div className='book-value-section'>
        <div className='book-value-update-section'>
          <ParInfoBox par_val={1} par={par} currency={currency}/>
          <ParInfoBox par_val={30} par={par} currency={currency}/>
          <ParInfoBox par_val={60} par={par} currency={currency}/>
          <ParInfoBox par_val={90} par={par} currency={currency}/>
        </div>
      </div>
    </div>
  )
}

const ParInfoBox = ({par_val, par, currency}) => {
  return (
    <div className='book-value-info-box loan__book'>
      <p className='dashboard-section-title'>Par {par_val} ({currency.shortname})</p>
      <p>Par Value {par[par_val].par_value}%</p>
      <p>Principal at Risk {par[par_val].principal_at_risk}</p>
      <p>Loan Count {par[par_val].loans_in_arrears_count}</p>
    </div>
  )
}

export default Par;

// dashboard-section-amount-or-number
