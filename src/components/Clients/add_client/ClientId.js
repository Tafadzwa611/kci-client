import React from 'react';
import { CustomInput, CustomSelect, ButtonSuccess, ButtonDefault } from '../../../common';
import { uuidv4 } from '../../../utils';

function ClientId({id_nums, setFieldValue, idTemplates}) {
  return (
    <>
      {id_nums.map((idNum, index) => {
        return(
          <React.Fragment key={index}>
            <ClientIdForm index={index} setFieldValue={setFieldValue} idNum={idNum} id_nums={id_nums} idTemplates={idTemplates}/>
          </React.Fragment>
        )
      })}
      <AddId id_nums={id_nums} setFieldValue={setFieldValue}/>
    </>
  )
}

function ClientIdForm({index, setFieldValue, id_nums, idNum, idTemplates}) {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('id_nums', id_nums.filter(f => f.id !== idNum.id));
  }

  return (
    <>
      <CustomInput label='Id Number' name={`id_nums[${index}].id_number`} type='text'/>
      <CustomSelect label='Id Number Template' name={`id_nums[${index}].id_template_id`}>
        <option value=''>------</option>
        {idTemplates.map((tmp, index) => (
          <option key={index} value={tmp.id}>
            {`${tmp.id_type}-${tmp.issuer}-${tmp.template}`}
          </option>
        ))}
      </CustomSelect>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove ID'} handler={remove} />
      </div>
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
    </>
  )
}

function AddId({setFieldValue, id_nums}) {
  const add = (evt) => {
    evt.preventDefault();
    const idNum = {id: uuidv4(), id_number: '', id_template_id: ''};
    setFieldValue('id_nums', [...id_nums, idNum]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add ID'} handler={(evt) => add(evt)} />
    </div>
  )
}

export default ClientId;