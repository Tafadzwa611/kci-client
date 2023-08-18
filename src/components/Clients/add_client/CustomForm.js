import React from 'react';
import {CustomInput, CustomSelect, CustomCheckbox, CustomDatePicker} from '../../../common';


function  CustomForm({form, setFieldValue}) {
  return (
    <>
      {form.fields.map(
        field => {
          return (
            <React.Fragment key={field.id}>
              {getElement(field, setFieldValue)}
            </React.Fragment>
          )
        }
      )}
    </>
  )
}

const getElement = (field, setFieldValue) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  const fieldName = field.is_required ? field.name : `${field.name} (Optional)`;

  if (field.data_type === 'select') {
    return (
      <CustomSelect label={fieldName} name={`custom_${field.id}`} required={field.is_required}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox label={fieldName} name={`custom_${field.id}`} required={field.is_required}/>
  }

  return {
    free_text: <CustomInput label={fieldName} name={`custom_${field.id}`} type={dataTypes[field.data_type]} required={field.is_required}/>,
    integer: <CustomInput
      label={fieldName}
      required={field.is_required}
      name={`custom_${field.id}`}
      type={dataTypes[field.data_type]}
      onKeyDown={e => {if(e.key==='.')e.preventDefault()}}
    />,
    decimal: <CustomInput label={fieldName} name={`custom_${field.id}`} type={dataTypes[field.data_type]} required={field.is_required}/>,
    date: <CustomDatePicker label={fieldName} name={`custom_${field.id}`} setFieldValue={setFieldValue} required={field.is_required}/>
  }[field.data_type]
}

export default CustomForm;
