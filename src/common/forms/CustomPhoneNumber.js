import React, { useState } from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import { countryPhoneCodes } from './data';

const CustomPhoneNumber = ({ label, ...props }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [field, meta] = useField(props);

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}</label>
        <div className='col-9'>
          <Select
            name='codes'
            options={countryPhoneCodes}
            value={optionSelected}
            classNamePrefix='select'
            className='basic-multi-select'
            placeholder='Select Branches'
            onChange={selected => {
            if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
            return handleMultiSelect(selectorBranches);
            }
            handleMultiSelect(selected);
            }}
            isDisabled={details ? true: false}
          />
          <input
            {...field}
            {...props}
            className={`custom-select-form ${meta.touched && meta.error ? 'input-error' : ''}`}
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  )
}

export default CustomPhoneNumber