import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { useField } from 'formik';

function CustomSelectRemote({url, label, queryParamName, setFieldValue, placeholder, isMulti, ...props}) {
  const [field, meta] = useField(props);
  const [selected, setSelected] = useState('');

  const onChange = selected => {
    setSelected(selected);
    if (isMulti) {
      setFieldValue(field.name, selected.map(opt => opt.value));
    } else {
      setFieldValue(field.name, selected.value);
    }
  }

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length > 2) {
      axios.get(`${url}?${queryParamName}=${inputValue}`).then((response) => callback(response.data))
    }
  };

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-5'>
        {isMulti ?
        <AsyncSelect onChange={onChange} value={selected} loadOptions={loadOptions} placeholder={placeholder} isMulti /> :
        <AsyncSelect onChange={onChange} value={selected} loadOptions={loadOptions} placeholder={placeholder} />}
        {meta.error && <div className='error'>{meta.error}</div>}
      </div>
    </div>
  )
}

export default CustomSelectRemote;