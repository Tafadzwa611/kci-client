import React from 'react';
import { useField } from 'formik';

const CustomSelectFilter = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div>
        <label className='form-label row-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div>
          <select {...field} {...props} className={`custom-select-form row-form ${meta.touched && meta.error ? 'input-error' : ''}`}/>
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};
export default CustomSelectFilter;
