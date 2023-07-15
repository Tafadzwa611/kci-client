import React, {Fragment} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

const LoansReportTable = ({loansReportData, intValues, loggedInUser, setLoansReportData, params}) => {

    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
            return `loans report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
            return `loans report for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
            return `loans report for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `loans report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <TableHeader 
                loansReportData={loansReportData} 
                params={params} 
                setLoansReportData={setLoansReportData} 
                intValues={intValues}
                loggedInUser={loggedInUser}
            />
            <div className="table-container" style={{padding:"0", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" style={{width:"100%"}} id="loans-report">
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
                                <td className='text-bold text-left' colSpan={9}>Loans Report</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{getFileName()}</td>
                            </tr>
                            {/* <tr>
                                <td className='text-bold text-left' colSpan={9}>
                                    Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr> */}
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Currency: {loansReportData.currency}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {loansReportData.loans.map(loan => {
                                return (
                                    <Fragment key={loan.id}>
                                        <tr>
                                            <td className='text-bold journal-details header text-left' colSpan='9'>{ loan.client }</td>
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
                                            <td style={{textAlign: 'right'}}></td>
                                            <td style={{textAlign: 'right'}}>{loan.principal}</td>
                                            <td style={{textAlign: 'right'}}>{loan.principal_amount_due}</td>
                                            <td className='text-bold text-red text-right'>Amount:</td>
                                            <td className='text-bold text-red text-right'>{loan.principal}</td>
                                            <td className='text-bold text-red text-right'>{loan.interest}</td>
                                            <td className='text-bold text-red text-right'>{loan.non_deductable_fees_reference}</td>
                                            <td className='text-bold text-red text-right'>{loan.penalty_reference}</td>
                                            <td className='text-bold text-red text-right'>{loan.total_due}</td>
                                        </tr>   
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{loan.total_principal_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{loan.total_interest_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{loan.total_fees_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{loan.total_penalty_paid}</td>
                                            <td className='text-bold text-green' style={{textAlign: 'right'}}>{loan.total_amount_paid}</td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}} className="last__row__border"></td>
                                            <td style={{textAlign:"right"}} className="last__row__border"></td>
                                            <td style={{textAlign:"right"}} className="last__row__border"></td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", width:"9%"}}>Net Due:</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{loan.principal_amount_due}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{loan.interest_amount_due}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{loan.non_deductable_fees}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{loan.penalty}</td>
                                            <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{loan.total_outstanding_balance}</td>
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

const TableHeader = ({loansReportData, params, setLoansReportData, loggedInUser, intValues }) => {
    return (
        <div className='table-header'>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <Pager
                    nextPageNumber={loansReportData.next_page_num}
                    params={params}
                    loadMoreLoans={() => console.log('loadMoreLoans')}
                    loadingMore={false}
                    prevPageNumber={loansReportData.prev_page_num}
                    setLoansReportData={setLoansReportData}
                />
                <div style={{marginTop:'6px'}}>Showing {loansReportData.loans.length} of {loansReportData.count} loans.</div>
            </div>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
            <div style={{marginTop:'6px'}}>Page {loansReportData.number} of {loansReportData.num_of_pages}</div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='btn btn-default'
                        table='loans-report'
                        filename={` Loans Report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`}
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
        </div>
    )
}

export default LoansReportTable;