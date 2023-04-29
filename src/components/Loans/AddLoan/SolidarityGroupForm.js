import React from 'react';
import {
  CustomSelect,
  CustomInput,
  CustomDatePicker,
  CustomSelectRemote,
  SubmitButton
} from '../../../common';
import { scheduleStrategies } from './data';
import Fee from './Fee';
import axios from 'axios';

function SolidarityGroupForm({product, isSubmitting, setFieldValue, values}) {
  const fetchMembers = async (group, setFieldValue) => {
    const response = await axios.get(`/clientsapi/group_members/${group.value}/`);
    const principal_distribution = response.data.map(member => ({...member, client_id: member.id, principal: 0}));
    setFieldValue('principal_distribution', principal_distribution);
  }

  return (
    <>
      <div className='divider divider-info'>
        <span>Loan Details</span>
      </div>
      <CustomSelectRemote
        label='Group'
        selected={values.group ? values.group : ''}
        url='/clientsapi/search_group/'
        setFieldValue={(fieldName, newValue) => {
          setFieldValue('group', newValue);
          setFieldValue(fieldName, newValue.value);
          fetchMembers(newValue, setFieldValue);
        }}
        queryParamName='query'
        placeholder='Search Group'
        name='group_id'
        required
      />
      <CustomSelectRemote
        selected={values.guarantor}
        label='Client Guarantor'
        url='/clientsapi/search_client/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('guarantor', selected);
          setFieldValue(fieldName, selected.value);
        }}
        queryParamName='query'
        params={[{key: 'guarantors_only', value: 1}]}
        placeholder='Search Client Guarantor'
        name='guarantor_id'
      />
      <CustomSelectRemote
        selected={values.group_guarantor}
        label='Group Guarantor'
        url='/clientsapi/search_group/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('group_guarantor', selected);
          setFieldValue(fieldName, selected.value);
        }}
        queryParamName='query'
        params={[{key: 'guarantors_only', value: 1}]}
        placeholder='Search Group Guarantor'
        name='group_guarantor_id'
      />
      <CustomInput
        label='Interest Rate'
        name='interest_rate'
        type='number'
        min={product.minimum_interest_rate}
        max={product.maximum_interest_rate}
        step={product.number_of_decimal_places}
        required
      />
      <small><em>Minimum = {product.minimum_interest_rate} Maximum = {product.maximum_interest_rate}</em></small>
      <CustomDatePicker label='Application Date' name='application_date' setFieldValue={setFieldValue} required/>
      <CustomInput
        label='Number of Repayments'
        name='number_of_repayments'
        type='number'
        min={product.minimum_loan_duration}
        max={product.maximum_loan_duration}
        required
      />
      <small><em>Minimum = {product.minimum_loan_duration} Maximum = {product.maximum_loan_duration}</em></small>
      <CustomDatePicker label='First Repayment Date' name='first_repayment_date' setFieldValue={setFieldValue} required/>
      <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy' required>
        <option value=''>------</option>
        {scheduleStrategies[product.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
      </CustomSelect>
      <CustomSelect label='Reason For Loan' name='reason_for_loan' required>
        <option value=''>------</option>
        <option value='CONSUMER'>CONSUMER</option>
        <option value='COMMERCIAL - Agriculture'>COMMERCIAL - Agriculture</option>
        <option value='COMMERCIAL - Manufacturing'>COMMERCIAL - Manufacturing</option>
        <option value='COMMERCIAL - Mining'>COMMERCIAL - Mining</option>
        <option value='COMMERCIAL - Housing'>COMMERCIAL - Housing</option>
        <option value='COMMERCIAL - Distribution & Services'>COMMERCIAL - Distribution & Services</option>
        <option value='COMMERCIAL - Retail'>COMMERCIAL - Retail</option>
        <option value='COMMERCIAL - Transport'>COMMERCIAL - Transport</option>
        <option value='COMMERCIAL - Health'>COMMERCIAL - Health</option>
        <option value='COMMERCIAL - Education'>COMMERCIAL - Education</option>
        <option value='COMMERCIAL - Cross Border Traders'>COMMERCIAL - Cross Border Traders</option>
        <option value='COMMERCIAL - Construction'>COMMERCIAL - Construction</option>
        <option value='COMMERCIAL - Vendors'>COMMERCIAL - Vendors</option>
        <option value='OTHER'>OTHER</option>
      </CustomSelect>
      <div className='divider divider-info'>
        <span>Loan Fees</span>
      </div>
      {product.fees.map((fee, index) => <Fee key={index} setFieldValue={setFieldValue} fee={fee} values={values}/>)}
      <div className='divider divider-info'>
        <span>Group Loan Distribution</span>
      </div>
      <CustomInput
        label='Total Principal'
        name='principal'
        type='number'
        min={product.minimum_principal_amount}
        max={product.maximum_principal_amount}
        step={product.number_of_decimal_places}
        required
      />
      <small><em>Minimum = {product.minimum_principal_amount} Maximum = {product.maximum_principal_amount}</em></small>
      {values.principal_distribution.map(part =>
        <CustomInput
          key={part.client_id}
          label={part.fullname}
          name={part.client_id}
          type='number'
          onChange={(evt) => {
            const principal_distribution = values.principal_distribution.filter(part => {
              if (part.client_id == evt.target.name) {
                part.principal = evt.target.value;
              }
              return part;
            });
            setFieldValue('principal_distribution', principal_distribution);
          }}
          value={part.principal ? part.principal : 0}
          step={product.number_of_decimal_places}
          required
        />)}
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
      <div style={{display:'flex', justifyContent: 'flex-end'}}> 
        <SubmitButton isSubmitting={isSubmitting}/>
      </div>
    </>
  )
}

export default SolidarityGroupForm;