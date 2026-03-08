import React from 'react';
import { CustomInput, CustomSelect, ButtonSuccess, ButtonDefault } from '../../../common';
import { uuidv4 } from '../../../utils';


function Addresses({address_list, setFieldValue}) {
  return (
    <>
      {address_list.map((address, index) => {
        return(
          <React.Fragment key={index}>
            <AddressForm index={index} setFieldValue={setFieldValue} address={address} addresses={address_list}/>
          </React.Fragment>
        )
      })}
      <AddAddress address_list={address_list} setFieldValue={setFieldValue}/>
    </>
  )
}

function AddressForm({index, setFieldValue, addresses, address}) {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('address_list', addresses.filter(f => f.id !== address.id));
  }

  return (
    <>
      <CustomSelect label='Ownership' name={`address_list[${index}].ownership`} required>
        <option value=''>------</option>
        <option value='OWNER'>OWNER</option>
        <option value='RENTING'>RENTING</option>
      </CustomSelect>
      <CustomInput label='Address' name={`address_list[${index}].address`} type='text' required/>
      <CustomInput label='City' name={`address_list[${index}].city`} type='text' required/>
      <CustomInput label='Country' name={`address_list[${index}].country`} type='text' required/>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Address'} handler={remove} />
      </div>
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
    </>
  )
}

function AddAddress({setFieldValue, address_list}) {
  const add = (evt) => {
    evt.preventDefault();
    const address = {id: uuidv4(), ownership: '', address: '', city: '', country: 'Zimbabwe'};
    setFieldValue('address_list', [...address_list, address]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Address'} handler={(evt) => add(evt)} />
    </div>
  )
}

export default Addresses;