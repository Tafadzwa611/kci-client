import React from 'react';
import {
  CustomCheckbox,
  CustomSelect,
  ButtonDefault,
  ButtonSuccess 
} from '../../../../../common';
import { uuidv4 } from '../../../../../utils';
import { initialFormValues } from './data';

function CustomLoanForm({customForm, fieldSets, index, custom_forms, setFieldValue}) {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('custom_forms', custom_forms.filter(f => f.id !== customForm.id));
  }

  return (
    <div>
      <CustomSelect label='Form' name={`custom_forms[${index}].custom_field_set_id`} required>
        <option value=''>------</option>
        {fieldSets.map(fieldSet => <option key={fieldSet.id} value={fieldSet.id}>{fieldSet.name}</option>)}
      </CustomSelect>
      <CustomSelect label='Required On' name={`custom_forms[${index}].required_on`} required>
        <option value=''>------</option>
        <option value='CREATION'>Loan Creation</option>
        <option value='APPROVAL'>Loan Approval</option>
        <option value='DISBURSEMENT'>Loan Disbursement</option>
      </CustomSelect>
      <CustomCheckbox label='Ask In Clients Portal' name={`custom_forms[${index}].ask_in_clients_portal`}/>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Form'} handler={remove}/>
      </div>
      <div className="divider divider-default" style={{padding: "1.25rem"}}></div>
    </div>
  )
}

function AddCustomLoanForm({setFieldValue, custom_forms}) {
  const add = (evt) => {
    evt.preventDefault();
    const id = uuidv4();
    setFieldValue('custom_forms', [...custom_forms, {...initialFormValues, id: id}]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Form'} handler={(evt) => add(evt)} />
    </div>
  )
}

export {CustomLoanForm, AddCustomLoanForm};