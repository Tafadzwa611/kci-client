import React from 'react';
import { useField } from 'formik';

const CustomPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div style={{width: '100%'}}>
      <input style={{width:'100%', fontSize:'12px'}} {...field} {...props} className='custom-select-form' autoComplete='new-password'/>
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </div>
  )
}

export default CustomPasswordInput;