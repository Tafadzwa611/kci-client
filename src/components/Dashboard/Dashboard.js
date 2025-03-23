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
import { Fetcher } from '../../common';

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
  const [unitId, setUnitId] = useState('');
  const [branchIds, setBranchIds] = useState(null);

  return (
    <Fetcher urls={['/usersapi/dashboard_units/']}>
      {({data}) => (
        <>
          <DashboardSections 
            setCurrencyId={setCurrencyId}
            currencyId={currencyId}
            unitId={unitId}
            setUnitId={setUnitId}
            branchIds={branchIds}
            setBranchIds={setBranchIds}
            units={data[0]}
          />
        </>
      )}
    </Fetcher>
  )
}

const DashboardSections = ({setCurrencyId, currencyId, setBranchIds, setUnitId, branchIds, units, unitId}) => {


  return (
    <div className='font-13'>
      <div style={{padding:'24px', paddingBottom:'0'}}>
        <h5 className='table-heading'>Dashboard</h5>
      </div>
      <div className='card'>
        <Filter 
          currencyId={currencyId} 
          setCurrencyId={setCurrencyId} 
          setBranchIds={setBranchIds}
          setUnitId={setUnitId}
          units={units}
          unitId={unitId}
        />
        {currencyId ?
          <>
            <LoanBook currencyId={currencyId} branchIds={branchIds} unitId={unitId}/>
            <Par currencyId={currencyId} branchIds={branchIds} unitId={unitId}/>
            <ClientNumbers branchIds={branchIds} unitId={unitId}/>
            <GroupNumbers branchIds={branchIds} unitId={unitId}/>
            <LoansReleased currencyId={currencyId} branchIds={branchIds} unitId={unitId}/>
            <LoanCollections currencyId={currencyId} branchIds={branchIds} unitId={unitId}/>
          </> :
        null}
      </div>
    </div>
  )
}


const Filter = ({currencyId, setCurrencyId, setBranchIds, setUnitId, units, unitId}) => {
  const {currencies} = useCurrencies();
  const {branches} = useBranches();
  const [optionSelected, setOptionSelected] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const options = branches.map(branch => ({label: branch.name, value: branch.id}))
  const style = {
    control: base => ({...base, border: '1px solid #dee2e6', boxShadow: 'none', '&:hover': '1px solid #dee2e6'})
  };

  return (
    <div className='card-body'>
      <div className='book-value-section'>
        <div className='book-value-select-section' style={{marginBottom:'0'}}>
          <div className='fields-container-select select_container_width'>
            <select value={currencyId} onChange={evt => setCurrencyId(Number(evt.target.value))} className='custom-select-form select_width' style={{padding:'0.5125rem 0.9rem'}}>
              <option value=''>Select Currency</option>
              {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
            </select>
          </div>
          <div className='fields-container-select select_container_width'>
            <select value={unitId} onChange={evt => setUnitId(Number(evt.target.value))} className='custom-select-form select_width' style={{padding:'0.5125rem 0.9rem'}}>
              <option value=''>Units</option>
              {unitOptions.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
            </select>
          </div>
          <div className='fields-container-select select_container_width branch'>
            <Select
              isMulti
              name='branches'
              options={[{label: 'Select all', value: '*'}, ...options]}
              value={optionSelected}
              classNamePrefix='select'
              className='basic-multi-select'
              placeholder='Select Branches'
              onChange={selected => {
                let selectedOpts;
                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === '*') {
                  selectedOpts = options;
                }else {
                  selectedOpts = selected;
                }
                setOptionSelected(selectedOpts);
                setBranchIds(selectedOpts.map(branch => branch.value));
                let filteredUnits = units.filter(unit => 
                  selectedOpts.some(branch => branch.value === unit.branch)
                );
                setUnitOptions(filteredUnits);
              }}
              styles={style}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
