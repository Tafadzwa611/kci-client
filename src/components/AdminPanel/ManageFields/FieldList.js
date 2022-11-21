import React, {useState} from 'react';
import CreateField from './CreateField';
import { SuccessBtn, EditBtn, DeleteBtn, Table } from '../../../common';

const dataTypes = {
  free_text: 'Free Text',
  select: 'Select',
  integer: 'Integer',
  decimal: 'Decimal',
  checkbox: 'Checkbox',
  date: 'Date',
  date_time: 'Date Time',
  client_id: 'Client',
  group_id: 'Group',
  user_id: 'User'
}

function FieldList({data, fieldSetId}) {
  const [fields, setFields] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);

  const headers = ['Field Name', 'Data Type', 'Status', 'Actions'];
  const rows = fields.map(field => {
    return (
      <tr key={field.id}>
        <td>{field.name}</td>
        <td>{dataTypes[field.data_type]}</td>
        <td>{field.active ? 'Active' : 'Inactive'}</td>
        <td>
          <>
            <EditBtn handler={(evt) => console.log(evt.target.value)}/>
            <DeleteBtn handler={(evt) => console.log(evt.target.value)}/>
          </>
        </td>
      </tr>
    )
  });

  return (
    <>
      <SuccessBtn value={'Add Field'} handler={evt => setOpenCreateFieldModal(true)}/>
      <CreateField open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setFields={setFields} fieldSetId={fieldSetId}/>
      <Table rows={rows} headers={headers}/>
    </>
  )
}

export default FieldList;