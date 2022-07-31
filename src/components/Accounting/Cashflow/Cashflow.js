import React, {useEffect, useState} from 'react';
import DateRange from './DateRange';
import NoData from './NoData';
import Table from './Table';
import { makeRequest } from '../../../utils/utils';

const Cashflow = () => {

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [statement, setStatement] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
  
    const onSubmit = async (evt) => {
      evt.preventDefault();
      await fetchCurrencies();
      const data = await getStatement();
      setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
      setStatement(data);
    }
  
    useEffect(() => {
      fetchCurrencies()
    }, []);
  
    async function getStatement() {
      let url = `/acc-api/cash-flow-statement/?max_date=${maxDate}&min_date=${minDate}&currency_id=${currencyId}`;
      selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
      const response = await makeRequest.get(url, {timeout: 8000});
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
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
  
    if (currencies===null) {
      return (
        <div>
          Loading
        </div>
      )
    }

    return (
            <>
                <DateRange 
                    minDate={minDate}
                    maxDate={maxDate}
                    currencies={currencies}
                    currencyId={currencyId}
                    setCurrencyId={setCurrencyId}
                    disableFetch={selectedBranchesIds.length === 0 || minDate === '' || maxDate === ''}
                    onSubmit={onSubmit}
                    setMaxDate={setMaxDate}
                    setMinDate={setMinDate}
                    updateSelectedBranchesId={setSelectedBranchesIds}
                />
                {statement === null ?
                  <NoData /> :
                  <Table currencyIso={currencyIso} statement={statement}
                />}
            </>
    );
}

export default Cashflow;