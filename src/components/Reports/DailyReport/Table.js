
import React from 'react';

const Table = ({report, dateOfReport, currencyIso}) => {

    return (
        <div className="table-container font-12" style={{border:"none", padding:"0", marginTop:"1.5rem"}}>
            <div className="table-responsive" style={{maxHeight:"800px"}}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="text-bold journal-details header text-left" colspan="6">Clients</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">New Clients</td>
                            <td className="text-bold">Returning Clients</td>
                            <td className="text-bold">{dateOfReport === ''? 'Current Number of Clients': `Number of Clients on ${(new Date(dateOfReport)).toDateString()}`}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{report.number_of_new_clients}</td>
                            <td>0</td>
                            <td>{report.total_clients}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="text-bold journal-details header text-left" colspan="6">Loans</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Number Of Loans Disbursed</td>
                            <td className="text-bold">Total Principal Disbursed</td>
                            <td className="text-bold">Loans Awaiting Approval</td>
                            <td className="text-bold">Loans Issued From Restructured Loans</td>
                            <td className="text-bold">Principal Disbursed From Restructured Loans</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{report.loan_summary.count_new_loans}</td>
                            <td>{`${currencyIso} ${report.loan_summary.sum_principal}`}</td>
                            <td>{report.count_processing_loans}</td>
                            <td>{report.count_restructure_loans}</td>
                            <td>{`${currencyIso} ${report.sum_restructure_loans_principal}`}</td>
                        </tr>
                        <tr>
                            <td className="text-bold journal-details header text-left" colspan="6">Payments</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Payment Method</td>
                            <td className="text-bold">Amount Paid</td>
                            <td className="text-bold">Number of Payments</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {report.payment_summary.map(summary => {
                            return (
                                <tr  key={summary.payment_method}>
                                    <td></td>
                                    <td>{summary.payment_method}</td>
                                    <td>{`${currencyIso} ${summary.sum_amount_paid}`}</td>
                                    <td>{summary.count_payment}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-bold journal-details header text-left" colspan="6">Fees</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Fee Name</td>
                            <td className="text-bold">Number Of Fees Recorded</td>
                            <td className="text-bold">Total Amount Recorded</td>
                            <td></td>
                            <td></td>
                        </tr>
                        {report.fees_summary.map(summary => {
                            if (report.fees_summary.length === 0) {
                                return (
                                    <tr key={summary.name}>
                                        <td>
                                        No fees were recorded {dateOfReport === ''? 'today':  `on ${(new Date(dateOfReport)).toDateString()}`} in the selected branch or branches.
                                        </td>
                                    </tr>
                                )
                            }else {
                                return (
                                    <tr key={summary.name}>
                                        <td></td>
                                        <td>{summary.name}</td>
                                        <td>{summary.count_fees}</td>
                                        <td>{`${currencyIso} ${summary.sum_amount}`}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;