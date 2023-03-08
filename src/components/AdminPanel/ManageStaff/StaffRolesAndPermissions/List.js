import React, { useState } from 'react';
import { Table, SuccessBtn, EditBtn, DeleteBtn } from '../../../../common';
import CreateRoles from './CreateStaffRole/CreateStaffRoleModal';
import EditStaffRole from './EditStaffRole/EditStaffRoleModal';

const List = ({data}) => {
  const [roles, setRoles] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
  const [openUpdateFieldModal, setOpenUpdateFieldModal] = useState(false);
  const [roleId, setRoleId] = useState();

  const openEditModal = (evt) => {
    setOpenUpdateFieldModal(true);
    setRoleId(evt.target.attributes.id.value);
  }

  const headers = ['Staff_Role_Name', 'Permissions', 'Action'];
  const rows = getTableRows(roles, openEditModal);

  return (
    <>
      <SuccessBtn value={'Add Staff Role'} handler={_ => setOpenCreateFieldModal(true)}/>
      <CreateRoles open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setRoles={setRoles}/>
      <Table rows={rows} headers={headers}/>
      {roles.some(role => role.id==roleId) &&
        <>
          <EditStaffRole
            key={JSON.stringify(roles.find(r => r.id==roleId))}
            role={roles.find(r => r.id==roleId)}
            open={openUpdateFieldModal}
            setOpen={setOpenUpdateFieldModal}
            setRoles={setRoles}
          />
        </>
      }
    </>
  )
}


const getTableRows = (roles, openEditModal) => {
  return roles.map(srole => {
    return (
      <tr key={srole.id}>
        <td>{srole.role}</td>
        <td>
          <button className="btn btn-info">Set Permissions</button>
        </td>
        <td>
          <EditBtn id={srole.id} handler={openEditModal}/>
        </td>
      </tr>
    )
  })
}

export default List;