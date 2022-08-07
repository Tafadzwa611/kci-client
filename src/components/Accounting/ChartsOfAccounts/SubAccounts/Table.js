import React from 'react';
import { convertDate } from '../../Journals/utils';

const Table = ({ subaccounts }) => {

    // const [generalLedgerName, setGeneralLedgerName] = React.useState(null)

    // const handleClickMainAcc = (evt) => {
    //     setSelectedMainAccID(evt.target.id)
    //     if (evt.target.id != selectedMainAccID){
    //         setAccDetails(true)
    //     }else{
    //         setAccDetails(curr => !curr)
    //     }
    // }

    // const getGLN = async () => {
    //     const main_account = await mainaccounts.filter(acc => acc.id == selectedMainAccID)
    //     if (main_account.length == 1){
    //         setGeneralLedgerName(main_account[0].general_ledger_name)
    //     }
    // }

    // React.useEffect(() => {
    //     getGLN();
    // }, [selectedMainAccID])

    // console.log(generalLedgerName)

    return (
        // <div style={{padding:"0", border:"none", marginTop:"2rem"}} className={accDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        //     <div className={accDetails ? "table-responsive journal__table-container" : "table-responsive full__table"}>
        //         <div style={{position:"sticky", top:"0"}}>
        //             <table className="table">
        //                 <thead>
        //                     {accDetails ?
        //                         <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
        //                             <th>GL Code</th>
        //                             <th>Main Account Name</th>
        //                         </tr>:
        //                         <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
        //                             <th>GL Code</th>
        //                             <th>Main Account Name</th>
        //                             <th>Type</th>
        //                             <th>Branch</th>
        //                             <th>Date Created</th>
        //                         </tr>
        //                     }
        //                 </thead>
        //                 <tbody>
        //                     {mainaccounts.map(account => {
        //                         if (accDetails) {
        //                             if (selectedMainAccID == account.id) {
        //                                 return (
        //                                     <tr key={account.id}>
        //                                         <td>
        //                                             <span 
        //                                                 onClick={handleClickMainAcc} 
        //                                                 id={account.id} 
        //                                                 style={{fontSize:"0.75rem",color:"red", cursor:"pointer"}} 
        //                                                 className="link">
        //                                                 {account.general_ledger_code}
        //                                             </span>
        //                                         </td>
        //                                         <td><span style={{color:"red"}} >{account.general_ledger_name}</span></td>
        //                                     </tr>
        //                                 )
        //                             }else{
        //                                 return (
        //                                     <tr key={account.id}>
        //                                         <td>
        //                                             <span 
        //                                                 onClick={handleClickMainAcc} 
        //                                                 id={account.id} 
        //                                                 style={{fontSize:"0.75rem", cursor:"pointer"}} 
        //                                                 className="link">
        //                                                 {account.general_ledger_code}
        //                                             </span>
        //                                         </td>
        //                                         <td>{account.general_ledger_name}</td>
        //                                     </tr>
        //                                 )
        //                             }
        //                         }else { 
        //                             return (
        //                                 <tr key={account.id}>
        //                                     <td>
        //                                         <span 
        //                                             onClick={handleClickMainAcc} 
        //                                             id={account.id} 
        //                                             style={{fontSize:"0.75rem", cursor:"pointer"}} 
        //                                             className="link">
        //                                             {account.general_ledger_code}
        //                                         </span>
        //                                     </td>
        //                                     <td>{account.general_ledger_name}</td>
        //                                     <td>{account.account_type}</td>
        //                                     <td>{account.branch}</td>
        //                                     <td>{convertDate(account.date_created)}</td>
        //                                 </tr>
        //                             )
        //                         }
        //                     })}
        //                 </tbody>
        //             </table>
        //         </div>
        //         {accDetails && (
        //             <SubAccounts selectedMainAccID={selectedMainAccID} setAccDetails={setAccDetails} generalLedgerName={generalLedgerName} />
        //         )}
        //     </div>
        // </div>

        <div style={{padding:"0", border:"none", marginTop:"2rem"}} className='table-container full__width font-12'>
            <div className="table-responsive full__table">
                <div style={{position:"sticky", top:"0"}}>
                    <table className="table">
                        <thead>
                            <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                <th>Date Created</th>
                                <th>GL Code</th>
                                <th>Sub Account Name</th>
                                <th>Currency</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subaccounts.map(account => {
                                return (
                                    <tr key={account.id}>
                                        <td>{convertDate(account.date_created)}</td>
                                        <td>{account.general_ledger_code}</td>
                                        <td>{account.general_ledger_name}</td>
                                        <td>{account.currency_shortname}</td>
                                        <td>{account.account_balance}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;