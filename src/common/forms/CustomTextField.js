import React from 'react';
import { useField } from 'formik';

const CustomTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  if (field.value === null) {
    field.value = '';
  }

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}</label>
        <div className='col-9'>
          <textarea {...props} {...field} className='custom-select-form'></textarea>
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};

export default CustomTextField;