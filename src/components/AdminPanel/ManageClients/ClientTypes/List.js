import React, { useState } from 'react';
import { Table, SuccessBtn, EditBtn, DeleteBtn } from '../../../../common';
import CreateTypes from './CreateTypes';
import EditType from './EditType';
import DeleteType from './DeleteType';

const List = ({data}) => {
  const [types, setTypes] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
  const [openUpdateFieldModal, setOpenUpdateFieldModal] = useState(false);
  const [openDeleteFieldModal, setOpenDeleteFieldModal] = useState(false);
  const [typeId, setTypeId] = useState();

  const openEditModal = (evt) => {
    setOpenUpdateFieldModal(true);
    setTypeId(evt.target.attributes.id.value);
  }

  const openDeleteModal = (evt) => {
    setOpenDeleteFieldModal(true);
    setTypeId(evt.target.attributes.id.value);
  }

  const headers = ['Name', 'Allow opening accounts', 'Allow as guarantor', 'Action'];
  const rows = getTableRows(types, openEditModal, openDeleteModal);

  return (
    <>
      <SuccessBtn value={'Add Client Type'} handler={_ => setOpenCreateFieldModal(true)}/>
      <CreateTypes open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setTypes={setTypes}/>
      <Table rows={rows} headers={headers}/>
      {types.some(type => type.id==typeId) &&
        <>
          <EditType
            key={JSON.stringify(types.find(t => t.id==typeId))}
            type={types.find(t => t.id==typeId)}
            open={openUpdateFieldModal}
            setOpen={setOpenUpdateFieldModal}
            setTypes={setTypes}
          />
          {openDeleteFieldModal &&
            <DeleteType
              key={typeId}
              setOpen={setOpenDeleteFieldModal}
              type={types.find(t => t.id==typeId)}
              setTypes={setTypes}
            />
          }
        </>
      }
    </>
  )
}


const getTableRows = (types, openEditModal, openDeleteModal) => {
  return types.map(type => {
    return (
      <tr key={type.id}>
        <td>{type.name}</td>
        <td>{type.allow_opening_loan_accounts ? 'Yes': 'No'}</td>
        <td>{type.allow_as_guarantor ? 'Yes': 'No'}</td>
        <td>
          <EditBtn id={type.id} handler={openEditModal}/>
          <DeleteBtn id={type.id} handler={openDeleteModal}/>
        </td>
      </tr>
    )
  })
}

export default List;