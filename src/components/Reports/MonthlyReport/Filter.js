import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';


const Filter = (props) => {
  const [optionSelected, setOptionSelected] = useState([]);
  const [branches, setBranches] = useState([]);
  const {currencies, currencyId, setCurrencyId, month, setMonth, onSubmit, disableFetch, updateSelectedBranchesId, setSelectedBranches} = props;
  const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    setSelectedBranches(selected);
    updateSelectedBranchesId(selected.map(branch => branch.id));
  }

  const changeCurrency = (evt) => {
    setCurrencyId(evt.target.value);
  }

  async function fetchBranches() {
    try {
      const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
      if (response.ok) {
        const data = await response.json();
        return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div style={{display:"flex", width:"100%", columnGap:"1rem"}}>
          <div style={{width:"80%"}}>
            <Select
              isMulti
              name='colors'
              options={[props.allOption, ...branches]}
              value={optionSelected}
              classNamePrefix='select'
              className='basic-multi-select'
              placeholder='Select Branches'
              onChange={selected => {
                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                  return handleMultiSelect(branches);
                }
                handleMultiSelect(selected);
              }}
            />
          </div>
          <div style={{width:"10%"}}>
            <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency}>
              {currencies.map(currency => {
                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
              })}
            </select>
          </div>
          <div>
            <span>
              <button type='submit' className='btn btn-olive' style={fetchStyles} disabled={disableFetch}>Apply_Filters_!</button>
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}

Filter.defaultProps = {
  allOption: {
    label: 'Select all',
    value: '*'
  }
};

export default Filter;