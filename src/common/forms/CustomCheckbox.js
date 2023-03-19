import React from 'react';
import { useField } from 'formik';

const CustomCheckbox = ({ label, ...props }) => {
  props['type'] = 'checkbox';
  const [field, meta] = useField(props);

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}</label>
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

export default CustomCheckbox;
