import React, { useState } from 'react';
import { Table, SuccessBtn, EditBtn, DeleteBtn } from '../../../../common';
import CreateRole from './CreateRole';
import EditRole from './EditRole';
import DeleteRole from './DeleteRole';

const List = ({data}) => {
  const [roles, setRoles] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
  const [openUpdateFieldModal, setOpenUpdateFieldModal] = useState(false);
  const [openDeleteFieldModal, setOpenDeleteFieldModal] = useState(false);
  const [roleId, setRoleId] = useState();

  const openEditModal = (evt) => {
    setOpenUpdateFieldModal(true);
    setRoleId(evt.target.attributes.id.value);
  }

  const openDeleteModal = (evt) => {
    setOpenDeleteFieldModal(true);
    setRoleId(evt.target.attributes.id.value);
  }

  const headers = ['Name', 'Action'];
  const rows = getTableRows(roles, openEditModal, openDeleteModal);

  return (
    <>
      <SuccessBtn value={'Add Group Role'} handler={_ => setOpenCreateFieldModal(true)}/>
      <CreateRole open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setRoles={setRoles}/>
      <Table rows={rows} headers={headers}/>
      {roles.some(type => type.id==roleId) &&
        <>
          <EditRole
            key={JSON.stringify(roles.find(r => r.id==roleId))}
            role={roles.find(r => r.id==roleId)}
            open={openUpdateFieldModal}
            setOpen={setOpenUpdateFieldModal}
            setRoles={setRoles}
          />
          {openDeleteFieldModal &&
            <DeleteRole
              key={roleId}
              setOpen={setOpenDeleteFieldModal}
              role={roles.find(r => r.id==roleId)}
              setRoles={setRoles}
            />
          }
        </>
      }
    </>
  )
}


const getTableRows = (roles, openEditModal, openDeleteModal) => {
  return roles.map(role => {
    return (
      <tr key={role.id}>
        <td>{role.name}</td>
        <td>
          <EditBtn id={role.id} handler={openEditModal}/>
          <DeleteBtn id={role.id} handler={openDeleteModal}/>
        </td>
      </tr>
    )
  })
}

export default List;