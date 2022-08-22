import React, { useEffect, useState } from 'react';
import DateRange from './DateRange';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import { makeRequest } from '../../../utils/utils';
import NoData from '../ClientsReport/NoData';

const LoanProductReport = () => {
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [report, setReport] = useState([]);
    const [selected, setSelected] = useState([]);
    const [products, setProducts] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Select date range and at least one product, then click search to views loan products report.');
    const disableFetch = minDate === '' || maxDate === '' || selected.length === 0 || minDate > maxDate;
  
    const onSubmit = (evt) => {
        evt.preventDefault();
        fetchLoanProductReport();
    }

    useEffect(() => {
        fetchProducts();
        fetchCurrencies();
    }, []);
    
    async function fetchProducts() {
        try {
            const response = await makeRequest.get('/loansapi/loan_products/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setProducts([...data.loan_products.map(result => ({...result, label: result.name, value: result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
    
    async function fetchLoanProductReport() {
        let url = `/reportsapi/loan-product-report/?min_date=${minDate}&max_date=${maxDate}&currency_id=${currencyId}`;
        selected.forEach(id => (url = url + `&loan_product_ids=${id}`));
        const response = await makeRequest.get(url, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
            return setReport(data)
        }else {
            const error = await response.json();
            console.log(error);
        }
    }
    
    async function fetchCurrencies() {
      try {
        const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
        if (response.ok) {
          const data = await response.json();
          if (currencyId===null) {
            const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
            setCurrencyId(zwlId);
          }
          return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
        }else {
          const error = await response.json();
          console.log(error);
        }
      }catch(error) {
        console.log(error);
      }
    }
    
    if (currencies===null || products===null) {
      return <div>loading...</div>
    }

    return (
        <>
            <DateRange 
              currencies={currencies}
              currencyId={currencyId}
              setCurrencyId={setCurrencyId}
              minDate={minDate}
              maxDate={maxDate}
              options={products}
              disableFetch={disableFetch}
              onSubmit={onSubmit}
              setMaxDate={setMaxDate}
              setMinDate={setMinDate}
              updateSelected={setSelected}
            />
            {report.length > 0 ?
              <>
                <Table />
                <Footer />
              </>:
              <NoData msg={msg} />
            }
        </>
    );
}

export default LoanProductReport;