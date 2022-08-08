import React from "react";
import Export from "./Export";

const AccountTransactions = ({
    transactions,
    openingBalance,
    nextUrl,
    viewMore,
    loadingMoreTransactions,
    general_ledger_name
}) => {
    const getExportData = () => {
        let data = [
            {
                "Date": "",
                "Reference": "Opening Balance",
                "Description": "",
                "Dr": "",
                "Cr": "",
                "Balance": openingBalance,
            }
        ]

        transactions.forEach(txn => {
            data.push({
                "Date": txn.date_posted,
                "Reference": txn.transaction_id,
                "Description": txn.description,
                "Dr": txn.debit ? txn.amount : '',
                "Cr": txn.credit ? txn.amount : '',
                "Balance": txn.account_balance,
            });
        });
        return data
    }

    return (
        <>
            <div className="card" style={{boxShadow:"none", marginBottom:"1.5rem"}}>
                <div className="card-header border-0" style={{padding:"1.5rem 1.5rem 0 1.5rem", display:"grid", gridTemplateColumns:"1fr auto", alignItems:"center"}}>
                    <span>Account Transactions</span>
                    <div style={{float:"right"}}>
                        <Export csvData={getExportData()} fileName={general_ledger_name} />
                    </div><br></br>
                </div>

                <div className="card-body table-responsive p-0" style={{overflow: "auto", maxHeight: "400px"}}>
                    <table className="table table-head-fixed text-nowrap">
                        <thead>
                            <tr className="journal-details header">
                                <th>Date Posted</th>
                                <th>Reference</th>
                                <th>Description</th>
                                <th>Dr</th>
                                <th>Cr</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Opening Balance</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{openingBalance}</td>
                            </tr>
                            {transactions.map(txn => {
                                return (
                                    <tr key={txn.transaction_id}>
                                        <td>{txn.date_posted}</td>
                                        <td>{txn.transaction_id}</td>
                                        <td>{txn.description}</td>
                                        <td>{txn.debit ? txn.amount : ''}</td>
                                        <td>{txn.credit ? txn.amount : ''}</td>
                                        <td>{txn.account_balance}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer clearfix text-center">
                {   nextUrl === null ?
                    <span style={{display:"block", textAlign:"center", paddingBottom:"1rem"}} className="text-light"><i className="uil uil-exclamation-triangle" style={{color:"#ffc107"}}></i> All transactions have been loaded.</span> :
                    loadingMoreTransactions ?
                        <div>
                            <div style={{float:"left", margin:"1.5rem", marginTop:"0"}}>
                                <b>Please wait...</b>
                            </div>
                            <a
                                href="#"
                                style={{pointerEvents: "none", opacity: "0.7"}}
                                className="btn btn-secondary"
                                disabled={loadingMoreTransactions}
                                style={{float:"right", margin:"1.5rem", marginTop:"0"}}
                            >View More</a>
                        </div>
                    :
                    <div>
                        <a
                            href="#"
                            className="btn btn-secondary"
                            onClick={viewMore}
                            style={{margin:"1.5rem", marginTop:"0", float:"right"}}
                        >View More</a>
                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default AccountTransactions;