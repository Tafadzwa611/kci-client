import React from 'react';
import { CustomInput, CustomSelect } from '../../../common';

function ClientId({id_nums, idTemplates}) {
  return (
    <>
      {id_nums.map((idNum, index) => {
        return(
          <React.Fragment key={index}>
            <ClientIdForm index={index} idTemplates={idTemplates}/>
          </React.Fragment>
        )
      })}
    </>
  )
}

function ClientIdForm({index, idTemplates}) {
  return (
    <>
      <CustomSelect label='Id Number Template' name={`id_nums[${index}].id_template_id`}>
        <option value=''>------</option>
        {idTemplates.map((tmp, index) => (
          <option key={index} value={tmp.id}>
            {`${tmp.id_type}-${tmp.issuer}-${tmp.template}`}
          </option>
        ))}
      </CustomSelect>
      <CustomInput label='Id Number' name={`id_nums[${index}].id_number`} type='text'/>
    </>
  )
}

export default ClientId;