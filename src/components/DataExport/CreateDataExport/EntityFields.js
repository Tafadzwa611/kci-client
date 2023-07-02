import React from 'react';
import { CustomMultiSelect } from '../../../common';

function EntityFields({fields, setFieldValue}) {
  return (
    <CustomMultiSelect
      label='Select Fields'
      name='fields'
      options={fields.map(field => ({label: field.display_name, value: field.field_name}))}
      setFieldValue={(fieldName, selected) => {
        const selectedFields = [];
        selected.forEach(opt => {
          const field = fields.find(field => field.field_name === opt.value);
          selectedFields.push(field);
        });
        setFieldValue(fieldName, selectedFields);
      }}
    />
  )
}

export default EntityFields;