import React from 'react';
import { Link } from 'react-router-dom';
import { Fetcher } from '../../../../common';

function List() {
  return (
    <Fetcher urls={['/usersapi/branch-list/']}>
      {({data}) => (
        <>
          <button className='btn btn-success'>
            <Link to='/users/admin/managebranches/addbranch'>
              Add Branch
            </Link>
          </button>
          <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
            <div className='full__table'>
              <div className='table-responsive'>
                <div className='table__height'>
                  <table className='table'>
                    <tbody>
                      <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                        <th>Branch Name</th>
                      </tr>
                      {data[0].map(branch => {
                        return (
                          <tr key={branch.id}>
                            <td>
                              <Link to={`/users/admin/managebranches/branch/${branch.id}`}>
                                {branch.name}
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                </div>
            </div>
          </div>
        </>
      )}
    </Fetcher>
  )
}

export default List;