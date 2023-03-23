import React from 'react';
import { useField } from 'formik';

const CustomRadio = ({ label, ...props }) => {
  props['type'] = 'radio';
  const [field, meta] = useField(props);

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div className='col-9'>
          <input
            {...field}
            {...props}
            className={`${meta.touched && meta.error ? 'input-error' : ''}`}
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};
export default CustomRadio;
