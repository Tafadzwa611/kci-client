import React from 'react';
import { useField } from 'formik';

const CustomCheckBoxfilter = ({ label, ...props }) => {
  props['type'] = 'checkbox';
  const [field, meta] = useField(props);

  return (
    <>
      <div className='row custom-background' style={{columnGap:'7px', alignItems:'center'}}>
        <label >{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div>
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

export default CustomCheckBoxfilter;
