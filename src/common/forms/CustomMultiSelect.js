import React, {useState} from 'react';
import Select from 'react-select';
import { useField } from 'formik';

function CustomMultiSelect({label, options, initVals, setFieldValue, ...props}) {
  const [optionSelected, setOptionSelected] = useState(initVals);
  const [field, meta] = useField(props);

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    setFieldValue(field.name, selected);
  }

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-9'>
        <Select
          isMulti
          name='multi-select'
          options={options}
          value={optionSelected}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={selected => handleMultiSelect(selected)}
        />
        {meta.error && <div className='error'>{JSON.stringify(meta.error)}</div>}
      </div>
    </div>
  )
}

export default CustomMultiSelect;