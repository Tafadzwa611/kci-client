import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import AdvancedFilter from '../../AdvancedFilter/AdvancedFilter';
import {getFields} from './Fields';
import {getOperators, getAdvOpts} from './utils';
import Select from 'react-select';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

const branchFieldNames = {
  CLIENT: 'branch_id',
  PAYMENT: 'branch_id',
  GROUP: 'branch_id',
  LOAN: 'branch_id',
  JOURNAL: 'branch_id',
  INSTALLMENT: 'loan__branch_id',
  TXN: 'loan__branch_id',
  NOK: 'client__branch_id',
  ADDRESS: 'client__branch_id',
  MEMBER: 'group__branch_id',
  COLLATERAL: 'loan__branch_id',
};

const currencyFieldNames = {
  LOAN: 'currency_id',
  PAYMENT: 'currency_id',
  JOURNAL: 'currency_id',
  INSTALLMENT: 'loan__currency_id',
  TXN: 'loan__currency_id',
  COLLATERAL: 'currency_id',
};

function EntityForm({fields}) {
  const [search, setSearch] = useState({});
  const [values, setValues] = useState({data_export_name: '', data_export_file_format: '', base_entity: '', fields: []});
  const [optionSelected, setOptionSelected] = useState();
  const [basicSearchFields, setBasicSearchFields] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {branches} = useBranches();
  const {currencies} = useCurrencies();

  useEffect(() => {
    const basicSearchFields = [];
    const branchName = branchFieldNames[values.base_entity];
    const currencyName = currencyFieldNames[values.base_entity];
    if (values.base_entity === 'JOURNAL') {
      basicSearchFields.push({name: 'branch_debited_id', label: 'Branch Debited', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
      basicSearchFields.push({name: 'branch_credited_id', label: 'Branch Credited', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
    }
    if (branchName) {
      basicSearchFields.push({name: branchName, label: 'Branch', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
    }
    if (currencyName) {
      basicSearchFields.push({name: currencyName, label: 'Currency', datatype: 'select', values: currencies.map(currency => ({name: currency.id, label: currency.shortname}))});
    }
    setBasicSearchFields(basicSearchFields);
    setOptionSelected([]);
  }, [values.base_entity]);

  const onSubmit = async () => {
    const fields = processFields(values.fields);
    let data = {
      data_export_name: values.data_export_name,
      data_export_file_format: values.data_export_file_format,
      base_entity: values.base_entity,
      search,
      ...fields
    };
    data = removeEmptyValues(data);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/reportsapi/create_export/', data, CONFIG);
      navigate({pathname: `/data/viewdata/dataexport/${response.data.report_pk}`});
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        setErrors(error.response.data);
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    const selectedFields = [];
    selected.forEach(opt => {
      const field = fields[values.base_entity].find(field => field.field_name === opt.value);
      selectedFields.push(field);
    });
    setValues(curr => ({...curr, fields: selectedFields}));
  }

  const onChange = (evt) => {
    const {name, value} = evt.target;
    setValues(curr => ({...curr, [name]: value}));
  }

  return (
    <>
      <div className='divider divider-info' style={{marginTop:'0'}}><span>Fields</span></div>
      {errors.detail ? <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
        {JSON.stringify(errors.detail)}
      </div> : null}
      <div className='row custom-background'>
        <label className='form-label'>Data Export Name<span style={{color: 'red'}}>&#42;</span></label>
        <div className='col-9'>
          <input name='data_export_name' type='text' className='custom-select-form' onChange={onChange}/>
          {errors.data_export_name ? <div className='error'>{JSON.stringify(errors.data_export_name)}</div> : null}
        </div>
      </div>
      <div className='row custom-background'>
        <label className='form-label'>File Format<span style={{color: 'red'}}>&#42;</span></label>
        <div className='col-9'>
          <select name='data_export_file_format' className='custom-select-form' onChange={onChange}>
            <option value=''>------</option>
            <option value='xlsx'>XLXS</option>
            <option value='csv'>CSV</option>
          </select>
          {errors.data_export_file_format ? <div className='error'>{JSON.stringify(errors.data_export_file_format)}</div> : null}
        </div>
      </div>
      <div className='row custom-background'>
        <label className='form-label'>Entity<span style={{color: 'red'}}>&#42;</span></label>
        <div className='col-9'>
          <select name='base_entity' className='custom-select-form' onChange={onChange}>
            <option value=''>------</option>
            <option value='CLIENT'>CLIENT</option>
            <option value='GROUP'>GROUP</option>
            <option value='LOAN'>LOAN</option>
            <option value='INSTALLMENT'>INSTALLMENT</option>
            <option value='TXN'>TRANSACTION</option>
            <option value='NOK'>NEXT OF KIN</option>
            <option value='ADDRESS'>ADDRESS</option>
            <option value='MEMBER'>GROUP MEMBER</option>
            <option value='COLLATERAL'>COLLATERAL</option>
            <option value='JOURNAL'>JOURNAL</option>
            <option value='PAYMENT'>PAYMENT</option>
          </select>
          {errors.base_entity ? <div className='error'>{JSON.stringify(errors.base_entity)}</div> : null}
        </div>
      </div>
      {values.base_entity ?
      <>
        <div className='row custom-background'>
          <label className='form-label'>Fields<span style={{color: 'red'}}>&#42;</span></label>
          <div className='col-9'>
            <Select
              isMulti
              name='multi-select'
              options={[{label: 'Select all', value: '*'}, ...fields[values.base_entity].map(field => ({label: field.display_name, value: field.field_name}))]}
              value={optionSelected}
              className='basic-multi-select'
              classNamePrefix='select'
              onChange={selected => {
                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === '*') {
                  return handleMultiSelect(fields[values.base_entity].map(field => ({label: field.display_name, value: field.field_name})));
                }
                handleMultiSelect(selected);
              }}
            />
          </div>
        </div>
        <div className='row custom-background'>
          <label className='form-label'>Filters</label>
          <AdvancedFilter
            key={values.base_entity}
            fields={[...basicSearchFields, ...getFields(values.base_entity)]}
            getAdvOpts={getAdvOpts(values.base_entity)}
            getOperators={getOperators}
            onQueryChange={q => setSearch(q)}
          />
        </div>
      </> : null}
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <button className='btn btn-info' type='submit' onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  )
}

const processFields = (fields) => {
  const native_fields = fields.filter(field => field.type === 'native').map(field => field.field_name);
  const custom_fields = fields.filter(field => field.type === 'custom').map(field => ({field_set_id: field.custom_field_set_id, field_name: field.field_name.slice(7)}));
  const annotated_fields = fields.filter(field => field.type === 'annotation').map(field => field.field_name);
  return {native_fields, custom_fields, annotated_fields}
}

export default EntityForm;