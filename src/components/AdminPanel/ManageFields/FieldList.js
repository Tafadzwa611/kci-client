import React, {useState} from 'react';
import CreateField from './CreateField';
import { SuccessBtn, EditBtn, DeleteBtn, Table } from '../../../common';
import { dataTypes } from './data';
import EditField from './EditField';
import DeleteField from './DeleteField';

function FieldList({data, fieldSetId}) {
  const [fields, setFields] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
  const [openUpdateFieldModal, setOpenUpdateFieldModal] = useState(false);
  const [openDeleteFieldModal, setOpenDeleteFieldModal] = useState(false);
  const [fieldId, setFieldId] = useState();

  const openEditModal = (evt) => {
    setOpenUpdateFieldModal(true);
    setFieldId(evt.target.attributes.id.value);
  }

  const openDeleteModal = (evt) => {
    setOpenDeleteFieldModal(true);
    setFieldId(evt.target.attributes.id.value);
  }

  const headers = ['Field Name', 'Data Type', 'Status', 'Actions'];
  const rows = getTableRows(fields, openEditModal, openDeleteModal);

  return (
    <>
      <SuccessBtn value={'Add Field'} handler={() => setOpenCreateFieldModal(true)}/>
      <CreateField open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setFields={setFields} fieldSetId={fieldSetId}/>
      <Table rows={rows} headers={headers}/>
      {fields.some(field => field.id == fieldId) &&
        <>
          <EditField
            key={JSON.stringify(fields.find(fs => fs.id == fieldId))}
            field={fields.find(f => f.id==fieldId)}
            open={openUpdateFieldModal}
            setFields={setFields}
            setOpen={setOpenUpdateFieldModal}
          />
          {openDeleteFieldModal &&
            <DeleteField
              key={fieldId}
              open={openDeleteFieldModal}
              setOpen={setOpenDeleteFieldModal}
              field={fields.find(f => f.id==fieldId)}
              setFields={setFields}
            />
          }
        </>
      }
    </>
  )
}

const getTableRows = (fields, openEditModal, openDeleteModal) => {
  const sortedFields = fields.sort((a, b) => a.listing_position_id - b.listing_position_id);
  return sortedFields.map((field) => (
      <tr key={field.id}>
        <td>{field.name}</td>
        <td>{dataTypes[field.data_type]}</td>
        <td>{field.active ? 'Active' : 'Inactive'}</td>
        <td>
          <EditBtn id={field.id} handler={openEditModal}/>
          <DeleteBtn id={field.id} handler={openDeleteModal}/>
        </td>
      </tr>
    )
  )
}

export default FieldList;