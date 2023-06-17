import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, intValues, loggedInUser}) => {
    
    const getFileName = () => {
        return `Daily Report for ${loggedInUser.company_name} on ${intValues.date_of_report}`
    }

    console.log(report.fees_summary.length);

    return (
        <>
            <div style={{display:"flex", justifyContent:"flex-end", marginTop:"1.5rem"}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='daily-report'
                    filename={getFileName()}
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className="table-container font-12" style={{border:"none", padding:"0", marginTop:"1rem"}}>
                <div className="table-responsive" style={{maxHeight:"800px"}}>
                    <table className="table" id="daily-report">
                        <tbody>
                            <tr>
                                <td colSpan={9}>Daily Report</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>
                                    {getFileName()}
                                </td>
                            </tr>
                            {/* <tr>
                                <td colSpan={9}>
                                    Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr> */}
                            <tr>
                                <td colSpan={9}>Currency: {report.currency}</td>
                            </tr>
                            <tr>
                                <td className="text-bold journal-details header text-left" colSpan="6">Clients</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-bold">New Clients</td>
                                <td className="text-bold">Returning Clients</td>
                                <td className="text-bold">{intValues.date_of_report === ''? 'Current Number of Clients': `Number of Clients on ${(new Date(intValues.date_of_report)).toDateString()}`}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{report.number_of_new_clients}</td>
                                <td>0</td>
                                <td>{report.total_clients}</td>
                            </tr>
                            <tr>
                                <td className="text-bold journal-details header text-left" colSpan="6">Loans</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-bold">Number Of Loans Disbursed</td>
                                <td className="text-bold">Total Principal Disbursed</td>
                                <td className="text-bold">Loans Awaiting Approval</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{report.loan_summary.count_new_loans}</td>
                                <td>{report.currency} {report.loan_summary.sum_principal}</td>
                                <td>{report.count_processing_loans}</td>
                            </tr>
                            <tr>
                                <td className="text-bold journal-details header text-left" colSpan="6">Payments</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-bold">Payment Method</td>
                                <td className="text-bold">Amount Paid</td>
                                <td className="text-bold">Number of Payments</td>
                            </tr>
                            {report.payment_summary.length == 0 ? 
                                <tr>
                                    <td>
                                        No payments were recorded on this day {intValues.date_of_report} .
                                    </td>
                                </tr>
                                : 
                                <tr key={summary.payment_method}>
                                    <td></td>
                                    <td>{summary.payment_method}</td>
                                    <td>{report.currency} {summary.sum_amount_paid}</td>
                                    <td>{summary.count_payment}</td>
                                </tr>
                            }
                            <tr>
                                <td className="text-bold journal-details header text-left" colSpan="6">Fees</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-bold">Fee Name</td>
                                <td className="text-bold">Number Of Fees Recorded</td>
                                <td className="text-bold">Total Amount Recorded</td>
                            </tr>
                            {report.fees_summary.length == 0 ? 
                                <tr>
                                    <td>
                                        No fees were recorded on this day {intValues.date_of_report}.
                                    </td>
                                </tr>
                                : 
                                <tr key={summary.name}>
                                    <td></td>
                                    <td>{summary.name}</td>
                                    <td>{summary.count_fees}</td>
                                    <td>{report.currency} {summary.sum_amount}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table;