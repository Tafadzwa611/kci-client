import React from 'react';
import { useField } from 'formik';

const CustomPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <input style={{width:'100%'}} {...field} {...props} className='custom-select-form' autoComplete='new-password'/>
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </div>
  )
}

export default CustomPasswordInput;