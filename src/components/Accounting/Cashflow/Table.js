import React from 'react';
import Receipts from './Receipts';
import Payments from './Payments';

const Table = ({statement, currencyIso}) => {
    return (
        <div className="table-container font-12 cashflow" style={{marginTop:"2rem",border:"none", padding:"0"}}>
            <div className="table-responsive">
                <div className="col-6">
                    <table className="table cashflow_table">
                        <thead>
                            <tr className="table-head-row">
                                <th></th>
                                <th className="text-right text-bold text-light">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Receipts currencyIso={currencyIso} statement={statement}/>
                            <Payments currencyIso={currencyIso} statement={statement}/>
                            <tr className="danger">
                                <td><b>Total Cash Balance (A) - (B)</b></td>
                                <td style={{textAlign:"right"}}><b>{currencyIso} {statement.cash_balance}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;