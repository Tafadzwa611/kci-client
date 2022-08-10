import React from 'react';
// import Loader from './Loader';

const BalanceSheetModal = ({
    modalAccounts,
    modalHeader,
    loadingModalAccounts,
    open,
    setOpen
}) => {
    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
        <div className='modal-dialog modal-lg modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className="form-title">[ {modalHeader} ]</label>
              <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
            </div>
            <div className='modal-body'>
  
                {loadingModalAccounts ? 
                    <div>Loading...</div>:
                    <table className='table table-head-fixed text-nowrap'>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Branch</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalAccounts.length > 0 ?
                                modalAccounts.map(account => {
                                    return (
                                        <tr key={account.id}>
                                        <td>{account.general_ledger_name}</td>
                                        <td>{account.account_branch}</td>
                                        <td>{account.account_balance}</td>
                                        </tr>
                                    )
                                }) :
                                <tr>
                                    <td>No accounts could be found.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                }


            </div>
            <div className='modal-footer justify-content-between'>
              <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default BalanceSheetModal;