import React, {useState} from 'react';
import Select from 'react-select';
import { useField } from 'formik';

function CustomMultiSelect({label, options, setFieldValue, ...props}) {
  const [optionSelected, setOptionSelected] = useState([]);
  const [field, meta] = useField(props);

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    const newVals = selected.map(val => val.value);
    setFieldValue(field.name, newVals);
  }

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}</label>
      <div className='col-5'>
        <Select
          isMulti
          name='multi-select'
          options={options}
          value={optionSelected}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={selected => handleMultiSelect(selected)}
        />
        {meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
  )
}

export default CustomMultiSelect;