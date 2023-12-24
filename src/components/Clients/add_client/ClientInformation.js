import React from 'react';
import {
  CustomInput,
  CustomSelect,
  CustomDatePicker,
  CustomPhoneNumber,
  CustomCheckbox
} from '../../../common';

const ClientInformation = ({clientControls, setFieldValue, staff}) => {
  return (
    <>
      <CustomInput label='Forenames' name='first_name' type='text' required/>
      <CustomInput label='Lastnames' name='last_name' type='text' required/>
      <CustomSelect label='Gender' name='gender' required>
        <option value=''>------</option>
        <option value='MALE'>Male</option>
        <option value='FEMALE'>Female</option>
      </CustomSelect>
      <CustomDatePicker label='Date Of Birth' setFieldValue={setFieldValue} name='date_of_birth' required/>
      <CustomDatePicker label='Registration Date' setFieldValue={setFieldValue} name='registration_date' required/>
      <CustomPhoneNumber label='Mobile Number' name='mobile_number' setFieldValue={setFieldValue} required/>
      <CustomPhoneNumber label='Secondary Mobile Number (Optional)' name='phone_number_secondary' setFieldValue={setFieldValue}/>
      <CustomPhoneNumber label='Whatsapp Number (Optional)' name='whatsapp_number' setFieldValue={setFieldValue}/>
      <CustomCheckbox label='Activate Whatsapp Banking' name='whatsapp_banking_active'/>
      <CustomInput label='Home Phone (Optional)' name='home_phone' type='text'/>
      <CustomInput label='Email (Optional)' name='email' type='text'/>
      {clientControls.client_officer_required ? 
      <CustomSelect label='Client Officer' name='client_manager_id' required>
        <option value=''>------</option>
        {staff.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
      </CustomSelect> :
      <CustomSelect label='Client Officer' name='client_manager_id'>
        <option value=''>------</option>
        {staff.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
      </CustomSelect>}
    </>
  )
}

export default ClientInformation;