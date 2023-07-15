import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useField } from 'formik';
import { uuidv4 } from '../../utils';

function CustomMultiSelect({label, options, initVals, setFieldValue, ...props}) {
  const [optionSelected, setOptionSelected] = useState(initVals);
  const [field, meta] = useField(props);

  const inputId = uuidv4();

  useEffect(() => {
    const el = document.getElementById(inputId);
    el.required = props.required;
  }, []);

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    setFieldValue(field.name, selected);
    const el = document.getElementById(inputId);
    if (selected === null) {
      el.required = props.required;
    }else if (selected.length === 0) {
      el.required = props.required;
    }else {
      el.required = false;
    }
  }

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-9'>
        {props.isMulti === false ?
        <Select
          isClearable
          name='multi-select'
          options={options}
          value={optionSelected}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={selected => handleMultiSelect(selected)}
          inputId={inputId}
        /> :
        <Select
          isMulti
          name='multi-select'
          options={options}
          value={optionSelected}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={selected => handleMultiSelect(selected)}
          inputId={inputId}
        />}
        {meta.error && <div className='error'>{JSON.stringify(meta.error)}</div>}
      </div>
    </div>
  )
}

export default CustomMultiSelect;