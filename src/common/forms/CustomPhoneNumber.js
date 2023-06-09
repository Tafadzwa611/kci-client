import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import { countryPhoneCodes } from './data';

const CustomPhoneNumber = ({ label, setFieldValue, ...props }) => {
  const [field, meta] = useField(props);
  const options = countryPhoneCodes.map(code => ({label: `+${code.code} - ${code.country}`, value: code.code}));
  const defaultCode = field.value.countryCode ? options.find(code => `+${code.value}` == field.value.countryCode) : options[0];
  const [countryCode, setCountryCode] = useState(`+${defaultCode.value}`);
  const [phoneNumber, setPhoneNumber] = useState(field.value.phoneNumber || '');

  useEffect(() => {
    setFieldValue(field.name, {countryCode, phoneNumber});
  }, [countryCode, phoneNumber]);

  const onCodeChange = newValue => {
    setCountryCode(`+${newValue.value}`);
  }

  const onPhoneNumChange = evt => {
    if (evt.target.value[0] === '0') return;
    setPhoneNumber(evt.target.value);
  }

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div style={{width:'50%'}}>
          <div className='col-9' style={{display:'flex', columnGap:'10px'}}>
            <div style={{width:'350px'}}>
              <Select
                defaultValue={defaultCode}
                isSearchable={true}
                name='code'
                options={options}
                onChange={onCodeChange}
              />
            </div>
            <input
              {...field}
              {...props}
              value={field.value.phoneNumber || ''}
              type='number'
              name='phoneNumber'
              onChange={onPhoneNumChange}
              style={{width: '-webkit-fill-available'}}
              className={`custom-select-form ${meta.touched && meta.error ? 'input-error' : ''}`}
            />
            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomPhoneNumber;