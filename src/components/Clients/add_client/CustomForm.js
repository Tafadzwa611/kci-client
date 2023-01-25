import React from 'react';
import {CustomInput, CustomSelect, CustomCheckbox} from '../../../common';


function  CustomForm({form}) {
  return (
    <>
      {form.fields.map(
        field => {
          return (
            <React.Fragment key={field.id}>
              {getElement(field)}
            </React.Fragment>
          )
        }
      )}
    </>
  )
}

const getElement = (field) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  if (field.data_type === 'select') {
    return (
      <CustomSelect label={field.name} name={`custom_${field.id}`}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox label={field.name} name={`custom_${field.id}`}/>
  }

  return {
    free_text: <CustomInput label={field.name} name={`custom_${field.id}`} type={dataTypes[field.data_type]}/>,
    integer: <CustomInput label={field.name} name={`custom_${field.id}`} type={dataTypes[field.data_type]} onKeyDown={e => {if(e.key==='.')e.preventDefault()}}/>,
    decimal: <CustomInput label={field.name} name={`custom_${field.id}`} type={dataTypes[field.data_type]}/>,
    date: <CustomInput label={field.name} name={`custom_${field.id}`} type={dataTypes[field.data_type]}/>
  }[field.data_type]
}

export default CustomForm;
