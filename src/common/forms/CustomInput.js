import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}</label>
        <div className='col-9'>
          <input
            {...field}
            {...props}
            className={`custom-select-form ${meta.touched && meta.error ? 'input-error' : ''}`}
            autoComplete='new-password'
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};
export default CustomInput;
