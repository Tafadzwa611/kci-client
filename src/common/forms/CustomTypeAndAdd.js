import React, { useState } from 'react';
import { useField } from 'formik';

const CustomTypeAndAdd = ({values, setFieldValue, ...props}) => {
  const [text, setText] = useState('');
  const [field, meta] = useField(props);

  const addText = (evt) => {
    evt.preventDefault();
    if (!values.includes(text)) {
      setFieldValue(field.name, [text, ...values]);
      setText('');
    }
  }

  const removeText = (evt) => {
    const newVals = values.filter(val => val != evt.target.attributes.name.value);
    setFieldValue(field.name, newVals);
  }

  return (
    <>
      <input value={text} onChange={evt => setText(evt.target.value)} type={'text'}/>
      <button onClick={addText} >Add</button>
      {values.map((val, idx) => {
        return (
          <div key={idx}>
            <button type='button' className='close' onClick={removeText}>
              <span aria-hidden='true' name={val}>&times;</span>
            </button>
            {val}
          </div>
        )
      })}
      {meta.error && <div className='error'>{meta.error}</div>}
    </>
  )
}

export default CustomTypeAndAdd;