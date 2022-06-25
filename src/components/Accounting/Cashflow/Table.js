import React from 'react';

const Table = () => {
    return (
        <div className="table-container font-12 cashflow" style={{marginTop:"40px"}}>
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
                            <tr>
                                <td className="text-green text-bold">Receipts</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Cash</b><em><small> ( @ opening )</small></em></td>
                                <td style={{textAlign:"right"}}>ZWL 100000.00</td>
                            </tr>
                            <tr>
                                <td><b>Cash</b><em><small> ( from overpaid loans )</small></em></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Cash</b><em><small> ( from creditors )</small></em></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Loan Principal Repayments</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Loan Interest Repayments</b></td>
                                <td style={{textAlign:"right"}}>ZWL 100.00</td>
                            </tr>
                            <tr>
                                <td><b>Loan Penalty Repayments</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Non Deductable Loan Fees</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Deductable Loan Fees</b></td>
                                <td style={{textAlign:"right"}}>ZWL 250.00</td>
                            </tr>
                            <tr>
                                <td><b>Other Income</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-green"><b>Total Receipts (A)</b></td>
                                <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-bold text-green">ZWL 100350.00</td>
                            </tr>
                            <tr>
                                <td className="text-red text-bold"><b>Payments</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Expenses</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Refunds</b></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Payments</b><em><small> ( to creditors )</small></em></td>
                                <td style={{textAlign:"right"}}>ZWL 0.00</td>
                            </tr>
                            <tr>
                                <td><b>Loans Released (Principal)</b></td>
                                <td style={{textAlign:"right"}}>ZWL 2000.00</td>
                            </tr>
                            <tr>
                                <td style={{borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-red"><b>Total Payments (B)</b></td>
                                <td style={{textAlign:"right", borderBottom:"1px solid rgb(0, 0, 0)"}} className="text-red text-bold">ZWL 2000.00</td>
                            </tr>
                            <tr className="danger">
                                <td><b>Total Cash Balance (A) - (B)</b></td>
                                <td style={{textAlign:"right"}}><b>ZWL 98350.00</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table;