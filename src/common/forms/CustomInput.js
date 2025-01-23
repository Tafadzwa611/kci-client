import React, { useRef, useEffect } from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const inputRef = useRef(null);

  useEffect(() => {
    const disableWheel = (event) => {
      event.preventDefault();
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", disableWheel, { passive: false });
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", disableWheel);
      }
    };
  }, []);

  return (
    <>
      <div className='row custom-background'>
        <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
        <div className='col-9'>
          <input
            {...field}
            {...props}
            className={`custom-select-form ${meta.touched && meta.error ? 'input-error' : ''}`}
            autoComplete='new-password'
            ref={inputRef}
          />
          {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </>
  );
};
export default CustomInput;
