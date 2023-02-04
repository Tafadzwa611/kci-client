import React, { Fragment } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, currencyIso, minDate, maxDate, selectedBranches, loggedInUser}) => {
    const getStrDate = (date) => {
        const mydate = new Date(date);
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
        return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
    }
    
    const getFileName = () => {
        if (minDate != '' && maxDate != '') {
            return `Loan Product Report for ${loggedInUser.company_name} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
        }
        if (minDate == '' && maxDate != '') {
            return `Loan Product Report for ${loggedInUser.company_name} upto ${getStrDate(maxDate)}`
        }
        if (minDate != '' && maxDate == '') {
            return `Loan Product Report for ${loggedInUser.company_name} from ${getStrDate(minDate)}`
        }
        return `Loan Product Report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <div style={{display:"flex", justifyContent:"flex-end", marginTop:"2rem"}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='lp-report'
                    filename={getFileName()}
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" style={{width:"100%"}} id="lp-report">
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th style={{textAlign:"right"}}>Total_Loans_Released</th>
                                <th style={{textAlign:"right"}}>Total_Principal_Released</th>
                                <th style={{textAlign:"right"}}>Current_Principal_At_Risk</th>
                                <th></th>
                                <th style={{textAlign:"right"}}>Principal</th>
                                <th style={{textAlign:"right"}}>Interest</th>
                                <th style={{textAlign:"right"}}>Fees</th>
                                <th style={{textAlign:"right"}}>Penalty</th>
                                <th style={{textAlign:"right"}}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={9}>Loan Product Report</td>
                            </tr>
                            <tr>
                                <td title={getFileName()} colSpan={9} style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                {getFileName()}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                    colSpan={9}
                                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                                    >Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.map(lp => {
                                return (
                                    <Fragment key={lp.id}>
                                        <tr>
                                            <td colSpan={12}>Currency: {lp.currency}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-bold journal-details header text-left" colSpan="9">{ lp.name } - { lp.interest_method }</td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                            <td style={{display:"none"}}></td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}>{ lp.loan_count }</td>
                                            <td style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_principal}`}</td>
                                            <td style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_principal_due}`}</td>
                                            <td className="text-bold text-red text-right">Amount:</td>
                                            <td className='text-bold text-red text-right'>{`${currencyIso} ${lp.sum_principal}`}</td>
                                            <td className='text-bold text-red text-right'>{`${currencyIso} ${lp.sum_interest}`}</td>
                                            <td className='text-bold text-red text-right'>{`${currencyIso} ${lp.sum_fees}`}</td>
                                            <td className='text-bold text-red text-right'>{`${currencyIso} ${lp.sum_penalty}`}</td>
                                            <td className="text-bold text-red text-right ">{`${currencyIso} ${lp.total_amount}`}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="text-bold text-green" style={{textAlign:"right"}}>Total_Payments:</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_principal_paid}`}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_interest_paid}`}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_fees_paid}`}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${lp.sum_penalty_paid}`}</td>
                                            <td className="text-bold text-green " style={{textAlign:"right"}}>{`${currencyIso} ${lp.total_paid}`}</td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}  className="last__row__border"></td>
                                            <td style={{textAlign:"right"}} className="last__row__border"></td>
                                            <td style={{textAlign:"right"}} className="last__row__border"></td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", width:"9%"}}>Net_Due:</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${lp.sum_principal_due}`}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${lp.sum_interest_amount_due}`}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${lp.sum_fees_due}`}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${lp.sum_penalty_due}`}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${lp.total_due}`}</td>
                                        </tr>
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table;