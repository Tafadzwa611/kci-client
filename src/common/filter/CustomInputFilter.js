import React from 'react';
import { useField } from 'formik';

const CustomInputFilter = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div>
        <label className='form-label row-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div className='input-group' style={{margin:"0"}}>
          <input
            {...field}
            {...props}
            className={`custom-select-form row-form input-background ${meta.touched && meta.error ? 'input-error' : ''}`}
            autoComplete='new-password'
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};
export default CustomInputFilter;