import React from 'react';
import { Link } from 'react-router-dom';
import { Fetcher } from '../../../../common';

function TransferTypes() {
  return (
    <Fetcher urls={['/acc-api/transfer-types/']}>
      {({data}) => (
        <>
          <button className='btn btn-success'>
            <Link to='/users/admin/managetransfers/createtransfertype'>
              Add Transfer Type
            </Link>
          </button>
          <div style={{padding:'0', border:'none', marginTop:'20px'}} className='table-container full__width font-12'>
            <div className='full__table'>
              <div className='table-responsive'>
                <div className='table__height'>
                  <table className='table'>
                    <tbody>
                      <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                        <th>Transfer Type Name</th>
                      </tr>
                      {data[0].map(transfer_type => {
                        return (
                          <tr key={transfer_type.id}>
                            <td>
                              <Link to={`/users/admin/managetransfers/createtransfertype/${transfer_type.id}`}>
                                {transfer_type.name}
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

export default TransferTypes;