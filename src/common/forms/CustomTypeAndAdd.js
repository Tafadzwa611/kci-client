import React, { useState } from 'react';

const CustomTypeAndAdd = ({values, field, setFieldValue}) => {
  const [text, setText] = useState('');

  const addText = (evt) => {
    evt.preventDefault();
    if (!values.includes(text)) {
      setFieldValue(field, [text, ...values]);
      setText('');
    }
  }

  const removeText = (evt) => {
    const newVals = values.filter(val => val != evt.target.attributes.name.value);
    setFieldValue(field, newVals);
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
    </>
  )
}

export default CustomTypeAndAdd;