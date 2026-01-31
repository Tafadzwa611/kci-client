import React from 'react';
import { Link } from 'react-router-dom';
import { Fetcher } from '../../../../common';

function TransferTypes() {
  return (
    <Fetcher urls={['/acc-api/transfer-types/']}>
      {({data}) => (
        <>
          <div style={{padding:'0', border:'none', marginTop:'20px'}} className='table-container full__width font-12'>
            <div className='full__table'>
              <div className='table-responsive'>
                <div className='table__height'>
                  <table className='table'>
                    <tbody>
                      <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                        <th>Transfer Type Name</th>
                        <th>Receiving Accounts</th>
                        <th>Sending Accounts</th>
                      </tr>
                      {data[0].map(transfer_type => {
                        return (
                          <tr key={transfer_type.id}>
                            <td>
                              <Link to={`/users/admin/managetransfers/createtransfertype/${transfer_type.id}`}>
                                {transfer_type.name}
                              </Link>
                            </td>
                            <td>
                              {(transfer_type.receiving_accounts || [])
                                .map(a => a.label || `${a.general_ledger_name} - ${a.general_ledger_code}`)
                                .join(", ")}
                            </td>
                                                        <td>
                              {(transfer_type.sending_accounts || [])
                                .map(a => a.label || `${a.general_ledger_name} - ${a.general_ledger_code}`)
                                .join(", ")}
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