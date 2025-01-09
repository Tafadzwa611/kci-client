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
import { useBranches } from '../../../contexts/BranchesContext';
import CustomForm from './CustomForm';

function ClientFormFields({
  product,
  lcontrols,
  isSubmitting,
  setFieldValue,
  clientName,
  values,
  edit,
  customForms,
  formIds,
  units,
  clientControls
}) {
  const {branches} = useBranches();
  const hideInterest = Boolean(product.default_interest_rate);
  const hideInstallments = Boolean(product.default_loan_duration);
  // const hideUnits = Boolean(product.default_loan_duration);
  console.log(units);

  return (
    <>
      <div className='divider divider-info'>
        <span>Loan Details</span>
      </div>
      {clientName ?
        <div className='row custom-background'>
          <label className='form-label'>Client <span style={{color: 'red'}}>&#42;</span></label>
          <div className='col-9'>
            <div style={{width: '50%'}}>
              {clientName}
            </div>
          </div>
        </div> : 
        <ClientSelect values={values} product={product} setFieldValue={setFieldValue}/>}
      <CustomSelectRemote
        selected={values.guarantor || ''}
        label='Client Guarantor'
        url='/clientsapi/search_client/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('guarantor', selected);
          setFieldValue(fieldName, selected.value);
        }}
        queryParamName='query'
        params={[{key: 'guarantors_only', value: 1}, {key: 'all_branches', value: 1}]}
        placeholder='Search Client Guarantor'
        name='guarantor_id'
      />
      <CustomSelectRemote
        selected={values.group_guarantor || ''}
        label='Group Guarantor'
        url='/clientsapi/search_group/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('group_guarantor', selected);
          setFieldValue(fieldName, selected.value);
        }}
        queryParamName='query'
        params={[{key: 'guarantors_only', value: 1}, {key: 'all_branches', value: 1}]}
        placeholder='Search Group Guarantor'
        name='group_guarantor_id'
      />
      {!lcontrols.auto_generate_loan_id && (
        <CustomInput
          label='Loan ID'
          name='loan_id'
          type='text'
          required
        />
      )}
      <CustomInput
        label='Principal'
        name='principal'
        type='number'
        min={product.minimum_principal_amount}
        max={product.maximum_principal_amount}
        step={product.number_of_decimal_places}
        required
      />
      <small><em>Minimum = {product.minimum_principal_amount} Maximum = {product.maximum_principal_amount}</em></small>
      {product.calculate_using_installment ? (
        <CustomInput
          label='Installment Amount'
          name='installment'
          type='number'
          step={product.number_of_decimal_places}
          required
        />
        )
      : (
        <div hidden={hideInterest}>
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
        </div>
      )}
      <CustomDatePicker label='Application Date' name='application_date' setFieldValue={setFieldValue} required/>
      <div hidden={hideInstallments}>
        <CustomInput
          label='Number of Repayments'
          name='number_of_repayments'
          type='number'
          min={product.minimum_loan_duration}
          max={product.maximum_loan_duration}
          required
        />
        <small><em>Minimum = {product.minimum_loan_duration} Maximum = {product.maximum_loan_duration}</em></small>
      </div>
      <CustomDatePicker label='First Repayment Date' name='first_repayment_date' setFieldValue={setFieldValue} required/>
      <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy' required>
        <option value=''>------</option>
        {scheduleStrategies[product.loan_duration_time_unit].map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
      </CustomSelect>
      {clientControls.use_client_units ? 
        <CustomSelect label='Unit' name='unit_id' required>
          <option value=''>------</option>
          {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
        </CustomSelect>:
        <CustomSelect label='Unit' name='unit_id'>
          <option value=''>------</option>
          {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
        </CustomSelect>
      }
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
      {(lcontrols.select_branch_on_loan_creation && !edit) && 
      <CustomSelect label='Branch' name='branch_id' required>
        <option value=''>------</option>
        {branches.map(br => <option key={br.id} value={br.id}>{br.name}</option>)}
      </CustomSelect>}
      {customForms.filter(form => formIds.includes(form.id)).map(form => (
        <React.Fragment key={form.id}>
          <div className='divider divider-info' style={{padding: '1.25rem'}}><span>{form.name}</span></div>
          <CustomForm form={form} setFieldValue={setFieldValue}/>
        </React.Fragment>
      ))}
      <div className='divider divider-info'>
        <span>Loan Fees</span>
      </div>
      {values.fees.map((fee, index) => <Fee key={index} index={index} setFieldValue={setFieldValue} fee={fee} values={values}/>)}
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <SubmitButton isSubmitting={isSubmitting}/>
      </div>
    </>
  )
}

const ClientSelect = ({values, product, setFieldValue}) => {
  if (product.client_type === 'Clients') {
    return (
      <CustomSelectRemote
        key={product.client_type}
        selected={values.client  || ''}
        label='Client'
        url='/clientsapi/search_client/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('client', selected);
          setFieldValue(fieldName, selected.value);
        }}
        params={[{key: 'all_branches', value: 1}]}
        queryParamName='query'
        placeholder='Search Client'
        name='client_id'
        required
      />
    )
  }
  return (
    <CustomSelectRemote
      key={product.client_type}
      selected={values.group || ''}
      label='Group'
      url='/clientsapi/search_group/'
      setFieldValue={(fieldName, selected) => {
        setFieldValue('group', selected);
        setFieldValue(fieldName, selected.value);
      }}
      queryParamName='query'
      placeholder='Search Group'
      name='group_id'
      required
    />
  )
}

export default ClientFormFields;