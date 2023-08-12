import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import { useCurrencies } from '../../contexts/CurrenciesContext';
import { useBranches } from '../../contexts/BranchesContext';
import LoanBook from './LoanBook/LoanBook';
import Par from './Par/Par';
import ClientNumbers from './ClientNumbers/ClientNumbers';
import GroupNumbers from './GroupNumbers/GroupNumbers';
import LoansReleased from './LoansReleased/LoansReleased';
import LoanCollections from './LoanCollections/LoanCollections';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const {currencies} = useCurrencies();

  let initCurrencyId = '';
  if (currencies.length > 0) {
    initCurrencyId = currencies[0].id;
  }

  const [currencyId, setCurrencyId] = useState(initCurrencyId);
  const [branchIds, setBranchIds] = useState(null);

  return (
    <div className='font-13'>
      <div style={{padding:'24px', paddingBottom:'0'}}>
        <h3>Dashboard</h3>
      </div>
      <Filter currencyId={currencyId} setCurrencyId={setCurrencyId} setBranchIds={setBranchIds}/>
      {currencyId ?
        <>
          <LoanBook currencyId={currencyId} branchIds={branchIds}/>
          <Par currencyId={currencyId} branchIds={branchIds}/>
          <ClientNumbers branchIds={branchIds}/>
          <GroupNumbers branchIds={branchIds}/>
          <LoansReleased currencyId={currencyId} branchIds={branchIds}/>
          <LoanCollections currencyId={currencyId} branchIds={branchIds}/>
        </> :
      null}
    </div>
  )
}


const Filter = ({currencyId, setCurrencyId, setBranchIds}) => {
  const {currencies} = useCurrencies();
  const {branches} = useBranches();
  const [optionSelected, setOptionSelected] = useState([]);

  const style = {
    control: base => ({...base, border: '1px solid #dee2e6', boxShadow: 'none', '&:hover': '1px solid #dee2e6'})
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='book-value-select-section'>
          <div className='fields-container-select select_container_width'>
            <select value={currencyId} onChange={evt => setCurrencyId(Number(evt.target.value))} className='custom-select-form select_width' style={{padding:'0.5125rem 0.9rem'}}>
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
      </div>
    </div>
  )
}
