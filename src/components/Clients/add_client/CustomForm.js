import React from 'react';
import {CustomInput} from '../../../common';

function  CustomForm({form}) {
  return (
    <>
      {form.fields.map(
        field => {
          return (
            <React.Fragment key={field.id}>
              {getElement(field.data_type, field.id, field.name)}
            </React.Fragment>
          )
        }
      )}
    </>
  )
}

const getElement = (dataType, id, label) => {
  const dataTypes = {
    free_text: 'text'
  };

  return {
    free_text: <CustomInput label={label} name={`custom_${id}`} type={dataTypes[dataType]}/>
  }[dataType]
}

export default CustomForm;
