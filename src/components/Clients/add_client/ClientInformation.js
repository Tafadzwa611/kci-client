import React from 'react';
import {
  CustomInput,
  CustomSelect,
  CustomDatePicker,
  CustomPhoneNumber
} from '../../../common';

const ClientInformation = ({setFieldValue}) => {
  return (
    <>
      <CustomInput label='Forenames' name='first_name' type='text' />
      <CustomInput label='Lastnames' name='last_name' type='text' />
      <CustomSelect label='Gender' name='gender' >
        <option value=''>------</option>
        <option value='MALE'>Male</option>
        <option value='FEMALE'>Female</option>
      </CustomSelect>
      <CustomDatePicker label='Date Of Birth' setFieldValue={setFieldValue} name='date_of_birth' />
      <CustomDatePicker label='Registration Date' setFieldValue={setFieldValue} name='registration_date' />
      <CustomPhoneNumber label='Mobile Number' name='mobile_number' setFieldValue={setFieldValue} />
      <CustomPhoneNumber label='Secondary Mobile Number (Optional)' name='phone_number_secondary' setFieldValue={setFieldValue}/>
      <CustomPhoneNumber label='Whatsapp Number (Optional)' name='whatsapp_number' setFieldValue={setFieldValue}/>
      <CustomInput label='Home Phone (Optional)' name='home_phone' type='text'/>
      <CustomInput label='Email (Optional)' name='email' type='text'/>
    </>
  )
}

export default ClientInformation;