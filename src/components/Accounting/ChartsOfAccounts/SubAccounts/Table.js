import React from 'react';
import { convertDate } from '../../Journals/utils';
import AccountStatement from './AccountStatement/AccountStatement';

const Table = ({ subaccounts, selectedSubAccID, setSelectedSubAccID }) => {

    const [generalLedger, setGeneralLedger] = React.useState([])

    const handleClickSubAcc = (evt) => {
        setSelectedSubAccID(evt.target.id)
    }

    const getGLN = async () => {
        const subacc = await subaccounts.filter(acc => acc.id == selectedSubAccID)
        if (subacc.length == 1){
            setGeneralLedger(subacc[0])
        }
    }

    React.useEffect(() => {
        getGLN();
    }, [selectedSubAccID])

    return (
        <div style={{padding:"0", border:"none", marginTop:"2rem"}} className={selectedSubAccID ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
            <div className={selectedSubAccID ? "table-responsive journal__table-container acc__statement" : "table-responsive full__table"}>
                <div style={{position:"sticky", top:"0"}}>

                    {subaccounts != "" && 
                        <table className="table">
                            <thead>
                                {selectedSubAccID ?
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th>GL Code</th>
                                    </tr>:
                                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                        <th>Date Created</th>
                                        <th>GL Code</th>
                                        <th>Sub Account Name</th>
                                        <th>Currency</th>
                                        <th>Balance</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {subaccounts.map(account => {
                                    if (selectedSubAccID){
                                        if (selectedSubAccID == account.id) {
                                            return (
                                                <tr key={account.id}>
                                                    <td>
                                                        <span 
                                                            onClick={handleClickSubAcc} 
                                                            id={account.id} 
                                                            style={{fontSize:"0.75rem",color:"red", cursor:"pointer"}} 
                                                            className="link">
                                                            {account.general_ledger_code}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        }else{
                                            return (
                                                <tr key={account.id}>
                                                    <td>
                                                        <span 
                                                            onClick={handleClickSubAcc} 
                                                            id={account.id} 
                                                            style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                            className="link">
                                                            {account.general_ledger_code}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    }else {
                                        return (
                                            <tr key={account.id}>
                                                <td>{convertDate(account.date_created)}</td>
                                                <td>
                                                     <span 
                                                         onClick={handleClickSubAcc} 
                                                         id={account.id} 
                                                         style={{fontSize:"0.75rem", cursor:"pointer"}} 
                                                         className="link">
                                                         {account.general_ledger_code}
                                                     </span>
                                                 </td>
                                                <td>{account.general_ledger_name}</td>
                                                <td>{account.currency_shortname}</td>
                                                <td>{account.account_balance}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    }

                    {subaccounts == "" && 
                        <div style={{textAlign:"center"}} className="text-light">
                            <span>Account type has no sub accounts OR filter above.</span>
                        </div>
                    }
                    
                </div>
                {selectedSubAccID && (
                    <>
                        <div id='loan-details'>
                            <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                                <div className="row" style={{marginBottom:"1rem", marginTop:"0"}}>
                                    <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
                                        <button><a onClick={e => setSelectedSubAccID(null)} className="btn btn-default client__details" style={{borderRadius:"0"}}>Close</a></button>
                                        <div>
                                            <b style={{fontSize:"1rem"}}>{generalLedger.currency_shortname} {generalLedger.account_balance}</b>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    <div style={{width:"30%"}}>
                                        <ul>
                                            <li>General Ledger Name: {generalLedger.general_ledger_name}</li>
                                            <li>General Ledger Code: {generalLedger.general_ledger_code}</li>
                                            <li>Branch: {generalLedger.branch}</li>
                                        </ul>
                                    </div>
                                    <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
                                        <ul>
                                            <li>Currency: {generalLedger.currency_fullname}</li>
                                            <li>Date Created: {generalLedger.date_created}</li>
                                        </ul>
                                    </div>
                                    <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
                                        <ul>
                                            <li>Suspended: {generalLedger.suspended? 'True' : 'False'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Table;