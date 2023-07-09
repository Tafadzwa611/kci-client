import React from 'react';
import { Fetcher } from '../../../common';
import { Table } from '../../../common';
import { Link } from 'react-router-dom';

const ClientRoles = () => {
  return (
    <Fetcher urls={['/usersapi/staffroles/']}>
      {({data}) => <List data={data[0]} />}
    </Fetcher>
  )
}

const List = ({data}) => {
  const handleClick = (e) => console.log(e.target.id);
  const headers = ['Staff Role Name'];
  const rows = getTableRows(data, handleClick);

  return (
    <>
      <Link to='/users/admin/staff/addrole'>
        Add Staff Role
      </Link>
      <Table rows={rows} headers={headers}/>
    </>
  )
}


const getTableRows = (roles) => {
  return roles.map(role => {
    return (
      <tr key={role.id}>
        <td>
          <Link to={`/users/admin/staff/roledetails/${role.id}`}>
            {role.role}
          </Link>
        </td>
      </tr>
    )
  })
}

export default ClientRoles;