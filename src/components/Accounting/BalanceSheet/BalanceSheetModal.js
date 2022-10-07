import React from 'react';
import MiniLoader from '../../Loader/MiniLoader';

const BalanceSheetModal = ({modalAccounts,modalHeader,loadingModalAccounts,setModalAccounts,open,setOpen}) => {

    const handleClose = () => {
        setOpen(curr => !curr);
    }

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
        <div className='modal-dialog modal-lg modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className="form-title">[ {modalHeader} ]</label>
              <button type='button' className='close' onClick={handleClose} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
            </div>
            <div className='modal-body'>
  
                {loadingModalAccounts ? 
                    <MiniLoader />:
                    <table className='table'>
                        <thead>
                            <tr className="journal-details">
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