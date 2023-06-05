import React from 'react';
import {
  CustomInput,
  CustomSelect,
  ButtonSuccess,
  ButtonDefault,
  CustomPhoneNumber
} from '../../../common';
import { uuidv4 } from '../../../utils';

function NextOfKin({next_of_kin_list, setFieldValue}) {
  return (
    <>
      {next_of_kin_list.map((nok, index) => {
        return(
          <React.Fragment key={index}>
            <NokForm index={index} setFieldValue={setFieldValue} nok={nok} noks={next_of_kin_list}/>
          </React.Fragment>
        )
      })}
      <AddNok next_of_kin_list={next_of_kin_list} setFieldValue={setFieldValue}/>
    </>
  )
}

function NokForm({index, setFieldValue, noks, nok}) {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('next_of_kin_list', noks.filter(f => f.id !== nok.id));
  }

  return (
    <>
      <CustomInput label='First Name' name={`next_of_kin_list[${index}].first_name`} type='text'/>
      <CustomInput label='Last Name' name={`next_of_kin_list[${index}].last_name`} type='text'/>
      <CustomSelect label='Gender' name={`next_of_kin_list[${index}].gender`}>
        <option value=''>------</option>
        <option value='MALE'>MALE</option>
        <option value='FEMALE'>FEMALE</option>
      </CustomSelect>
      <CustomInput label='Relationship' name={`next_of_kin_list[${index}].relationship`} type='text'/>
      <CustomPhoneNumber label='Phone Number' name={`next_of_kin_list[${index}].phone_number`} setFieldValue={setFieldValue}/>
      <CustomInput label='Address' name={`next_of_kin_list[${index}].address`} type='text'/>
      <CustomInput label='City' name={`next_of_kin_list[${index}].city`} type='text'/>
      <CustomInput label='Country' name={`next_of_kin_list[${index}].country`} type='text'/>
      <CustomSelect label='Ownership' name={`next_of_kin_list[${index}].ownership`}>
        <option value=''>------</option>
        <option value='OWNER'>OWNER</option>
        <option value='RENTING'>RENTING</option>
      </CustomSelect>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Next Of Kin'} handler={remove} />
      </div>
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
    </>
  )
}

function AddNok({setFieldValue, next_of_kin_list}) {
  const add = (evt) => {
    evt.preventDefault();
    const nok = {
      id: uuidv4(),
      first_name: '',
      last_name: '',
      gender: '',
      relationship: '',
      mobile_number_code: '',
      phone_number: '',
      ownership: '',
      address: '',
      city: '',
      country: ''
    };
    setFieldValue('next_of_kin_list', [...next_of_kin_list, nok]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Next Of Kin'} handler={(evt) => add(evt)} />
    </div>
  )
}

export default NextOfKin;