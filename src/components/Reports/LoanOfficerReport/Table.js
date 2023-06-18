import React,  { Fragment } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, intValues, loggedInUser, currency}) => {
    
    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
            return `Loan Officer Report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
            return `Loan Officer Report for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
            return `Loan Officer Report for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `Loan Officer Report for ${loggedInUser.company_name} all time.`
    }

      
    return (
        <>
            <div style={{display:"flex", justifyContent:"flex-end", marginTop:"1.5rem"}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='lo-report'
                    filename={getFileName()}
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className="table-container" style={{padding:"0", paddingTop:"1rem", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" style={{width:"100%"}} id="lo-report">
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th style={{textAlign:"right"}}>Total_Loans_Released</th>
                                <th style={{textAlign:"right"}}>Total_Principal_Released</th>
                                <th style={{textAlign:"right"}}>Current_Principal_At_Risk</th>
                                <th></th>
                                <th style={{textAlign:"right"}}>Principal</th>
                                <th style={{textAlign:"right"}}>Interest</th>
                                <th style={{textAlign:"right"}}>Penalty</th>
                                <th style={{textAlign:"right"}}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={9}>Loan Officer Report</td>
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
                                <td colSpan={9}>Currency: {currency}</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.map(officer => {
                                return (
                                    <Fragment key={officer.id}>
                                        <tr>
                                            <td className='text-bold journal-details header text-left' colSpan='9'>{officer.first_name} {officer.last_name}</td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                            <td style={{display: 'none'}}></td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign: 'right'}}>{ officer.loan_count }</td>
                                            <td style={{textAlign: 'right'}}>{officer.sum_principal}</td>
                                            <td style={{textAlign: 'right'}}>{officer.sum_principal_due}</td>
                                            <td className='text-bold text-red text-right'>Amount:</td>
                                            <td className='text-bold text-red text-right'>{currency} {officer.sum_principal}</td>
                                            <td className='text-bold text-red text-right'>{currency} {officer.sum_interest}</td>
                                            <td className='text-bold text-red text-right'>{currency} {officer.sum_penalty}</td>
                                            <td className='text-bold text-red text-right'>{currency} {officer.total_amount}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{currency} {officer.sum_principal_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{currency} {officer.sum_interest_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{currency} {officer.sum_penalty_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{currency} {officer.total_paid}</td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}></td>
                                            <td style={{textAlign:"right"}}></td>
                                            <td style={{textAlign:"right"}}></td>
                                            <td className="text-bold" style={{textAlign:"right", width:"9%"}}>Net Due:</td>
                                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{currency} {officer.sum_principal_due}</td>
                                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{currency} {officer.sum_interest_due}</td>
                                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{currency} {officer.sum_penalty_due}</td>
                                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{currency} {officer.total_due}</td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;