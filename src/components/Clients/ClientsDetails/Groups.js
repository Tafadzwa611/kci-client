import React from 'react';
import { Link } from 'react-router-dom';

const statusClasses = {
  'Active': 'badge badge-success',
  'Blacklisted': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Pending Approval': 'badge badge-info-light',
  'Inactive': 'badge badge-info',
  'Left': 'badge badge-semi-dark',
  'Rejected': 'badge badge-danger',
}

function Groups({client}) {
  return (
    <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
      <div style={{border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='clients'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Group ID</th>
                  <th style={{textAlign:'start'}}>Group Name</th>
                  <th style={{textAlign:'start'}}>Group Type</th>
                  <th style={{textAlign:'start'}}>Group Date</th>
                  <th style={{textAlign:'start'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {client.groups.map(group => {
                  return (
                    <tr key={group.id}>
                      <td>
                        <span style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          <Link to={`/groups/viewgroups?group_id=${group.id}`}>{group.group_id}</Link>
                        </span>
                      </td>
                      <td>{group.group_name}</td>
                      <td>{group.group_type}</td>
                      <td>{group.group_date}</td>
                      <td><button className={statusClasses[group.status]}>{group.status}</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Groups;