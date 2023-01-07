import React from 'react';
import { CustomInput, CustomSelect } from '../../../common';
import { countryPhoneCodes } from './data';

const ClientInformation = ({clientTypes}) => {
  return (
    <>
      <CustomInput label='Forenames' name='first_name' type='text'/>
      <CustomInput label='Lastnames' name='last_name' type='text'/>
      <CustomSelect label='Client Type' name='client_type_id'>
        <option value=''>------</option>
        {clientTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
      </CustomSelect>
      <CustomSelect label='Gender' name='gender'>
        <option value=''>------</option>
        <option value='MALE'>Male</option>
        <option value='FEMALE'>Female</option>
      </CustomSelect>
      <CustomInput label='Date Of Birth' name='date_of_birth' type='date'/>
      <CustomInput label='Registration Date' name='registration_date' type='date'/>
      <CustomSelect label='' name='mobile_number_code'>
        {countryPhoneCodes.map((code, index) => <option key={index} value={code.code}>{`+${code.code}-${code.country}`}</option>)}
      </CustomSelect>
      <CustomInput label='Mobile Number' name='mobile_number' type='text'/>
      <CustomInput label='Secondary Mobile Number' name='phone_number_secondary' type='text'/>
      <CustomInput label='Home Phone' name='home_phone' type='text'/>
      <CustomInput label='Whatsapp Number' name='whatsapp_number' type='text'/>
      <CustomInput label='Email' name='email' type='text'/>
    </>
  )
}

export default ClientInformation;