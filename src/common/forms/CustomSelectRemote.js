import React, {useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { useField } from 'formik';
import { uuidv4 } from '../../utils';

function CustomSelectRemote({url, label, selected, queryParamName, params, setFieldValue, placeholder, isMulti, ...props}) {
  const [field, meta] = useField(props);

  const inputId = uuidv4();

  useEffect(() => {
    setIsRequired(selected);
  }, []);

  const setIsRequired = (selected) => {
    const el = document.getElementById(inputId);
    if (selected === null || selected === '') {
      el.required = props.required;
    }else if (selected.length === 0) {
      el.required = props.required;
    }else {
      el.required = false;
    }
  }

  const onChange = selected => {
    setFieldValue(field.name, selected);
    setIsRequired(selected);
  }

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length <= 1) return
    let search = '';
    if (params) {
      params.forEach(param => {
        search += `&${param.key}=${param.value}`;
      });
    }
    axios.get(`${url}?${queryParamName}=${inputValue}${search}`).then((response) => callback(response.data))
  };

  return (
    <div className='row custom-background'>
      <label className='form-label'>{label}{props.required && <span style={{color: 'red'}}>&#42;</span>}</label>
      <div className='col-9'>
        <div style={{width:"50%"}}>
          {isMulti ?
          <AsyncSelect 
            onChange={onChange} 
            value={selected} 
            loadOptions={loadOptions} 
            placeholder={placeholder} 
            inputId={inputId} 
            isMulti 
            isClearable 
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '',
              },
            })}
          /> :
          <AsyncSelect 
            onChange={onChange} 
            value={selected} 
            loadOptions={loadOptions} 
            placeholder={placeholder} 
            inputId={inputId} 
            isClearable 
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '',
              },
            })}
          />}
          {meta.error && <div className='error'>{meta.error}</div>}
        </div>
      </div>
    </div>
  )
}

export default CustomSelectRemote;