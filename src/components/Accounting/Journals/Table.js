import React from 'react';
import { convertDate } from './utils';

const Table = ({journals, currencyIso, setDetails, setSelectedJrnlID, details, selectedjrnlID, selectedjrnl}) => {

    const handleClick = (e) => {
        setSelectedJrnlID(e.target.id)
        if (e.target.id != selectedjrnlID){
            setDetails(true)
        }else{
            setDetails(curr => !curr)
        }
    }

    return (

        <div className="table-container font-12" style={{padding:"0", border:"none"}} className={details ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
            <div className={details ? "table-responsive journal__table-container" : "table-responsive full__table"} >
                <div className="table__height">
                    <table className="table">
                        <thead>
                            {details ?
                                <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                    <th>Transaction ID</th>
                                </tr>:
                                <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                                    <th>Transaction ID</th>
                                    <th>Account Debited</th>
                                    <th>Account Credited</th>
                                    <th>Amount Debited</th>
                                    <th>Amount Credited</th>
                                    <th>Date Created</th>
                                </tr>
                            }
                        </thead>
                        <tbody>
                        {journals.map(journal => {
                            if (details) {
                                if (selectedjrnl.id == journal.id) {
                                    return (
                                        <tr key={journal.id}>
                                            <td><a href onClick={handleClick} id={journal.id} style={{color:"red"}}>{journal.transaction_id}</a></td>
                                        </tr>
                                    )
                                }else{
                                    return (
                                        <tr key={journal.id}>
                                            <td><a href onClick={handleClick} id={journal.id}>{journal.transaction_id}</a></td>
                                        </tr>
                                    )
                                }
                            }else { 
                                return (
                                    <tr key={journal.id}>
                                        <td><a href onClick={handleClick} id={journal.id}>{journal.transaction_id}</a></td>
                                        <td>{journal.account_debited} <em><small>({journal.branch_debited})</small></em></td>
                                        <td>{journal.account_credited} <em><small>({journal.branch_credited})</small></em></td>
                                        <td>{`${currencyIso} ${journal.amount_debited}`}</td>
                                        <td>{`${currencyIso} ${journal.amount_credited}`}</td>
                                        <td>{convertDate(journal.date_created)}</td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </table>
                </div>
                {details && (
                    <div style={{position:"sticky", top:"0", width:"100%"}}>
                        <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <div>
                                    <ul>
                                        <li><b>Debit</b></li>
                                        <li>Account Debited: {selectedjrnl.account_debited}</li>
                                        <li>Branch Debited: {selectedjrnl.branch_debited}</li>
                                        <li>Amount Debited: {`${currencyIso} ${selectedjrnl.amount_debited}`}</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li><b>Credit</b></li>
                                        <li>Account Credited: {selectedjrnl.account_credited}</li>
                                        <li>Branch Credited: {selectedjrnl.branch_credited}</li>
                                        <li>Amount Credited: {`${currencyIso} ${selectedjrnl.amount_credited}`}</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li><b>Additional Details</b></li>
                                        <li>Date: {convertDate(selectedjrnl.date_created)}</li>
                                        <li>Created By: {selectedjrnl.created_by}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{display:"flex", justifyContent:"flex-end"}}>
                                    <button><a onClick={e => setDetails(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table;