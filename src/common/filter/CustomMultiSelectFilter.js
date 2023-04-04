import React, {useState} from 'react';
import Select from 'react-select';
import { useField } from 'formik';

function CustomMultiSelectFilter({label, options, initVals, setFieldValue, ...props}) {
  const [optionSelected, setOptionSelected] = useState(initVals);
  const [field, meta] = useField(props);

  const handleMultiSelect = selected => {
    setOptionSelected(selected);
    const newVals = selected.map(val => val.value);
    setFieldValue(field.name, newVals);
  }

  return (
    <div>
      <label className='form-label row-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div>
        <Select
          isMulti
          name='multi-select'
          options={options}
          value={optionSelected}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={selected => handleMultiSelect(selected)}
          styles={style}
        />
        {meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
  )
}

const style = {
    control: base => ({
        ...base,
        border: '1px solid #dee2e6',
        boxShadow: "none",
        '&:hover':'1px solid #dee2e6',
    })
};

export default CustomMultiSelectFilter;