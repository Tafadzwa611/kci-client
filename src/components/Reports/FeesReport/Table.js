import React, { Fragment } from 'react';
import Header from './Header';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

const Table = ({feesReportData, loggedInUser, intValues, setFeesReportData, params, currency}) => {
    
    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
            return `Fees Report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
            return `Fees Report for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
            return `Fees Report for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `Fees Report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <TableHeader 
                feesReportData={feesReportData} 
                params={params} 
                setFeesReportData={setFeesReportData} 
            />
            <div className="table-container" style={{padding:"0", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" id="fees-report">
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th style={{textAlign:"right"}}>Date</th>
                                <th style={{textAlign:"right"}}>Client</th>
                                <th style={{textAlign:"right"}}>Loan</th>
                                <th style={{textAlign:"right"}}>Branch</th>
                                <th style={{textAlign:"right"}}>Fee Name</th>
                                <th style={{textAlign:"right"}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={9}>Fees Report</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>
                                    {getFileName()}
                                </td>
                            </tr>
                            {/* <tr>
                                <td
                                    title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                
                                    colSpan={9}
                                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                                >Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}</td>
                            </tr> */}
                            <tr>
                                <td colSpan={9}>Currency: {currency}</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {feesReportData.report.map(date => {
                                return (
                                    <Fragment key={date.day}>
                                        {date.fees_recorded.map(fee => (
                                            <tr key={fee.loan_pk} className="table-row">
                                                <td style={{textAlign:"right"}}>{ date.day }</td>
                                                <td style={{textAlign:"right"}}>{ fee.fullname }</td>
                                                <td style={{textAlign:"right"}}>{ fee.loan_id }</td>
                                                <td style={{textAlign:"right"}}>{ fee.branch }</td>
                                                <td style={{textAlign:"right"}}>{ fee.fee_name }</td>
                                                <td style={{textAlign:"right"}}>{ fee.amount }</td>
                                            </tr>
                                        ))}
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

const TableHeader = ({feesReportData, params, setFeesReportData }) => {
    return (
        <div className='table-header'>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <Pager
                    nextPageNumber={feesReportData.next_page_num}
                    params={params}
                    loadMoreFees={() => console.log('loadMoreFees')}
                    loadingMore={false}
                    prevPageNumber={feesReportData.prev_page_num}
                    setFeesReportData={setFeesReportData}
                />
                <div style={{marginTop:'6px'}}>Showing {feesReportData.report.length} of {feesReportData.count} fees.</div>
            </div>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
            <div style={{marginTop:'6px'}}>Page {feesReportData.number} of {feesReportData.num_of_pages}</div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='btn btn-default'
                        table='fees-report'
                        filename='fees-report'
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
        </div>
    )
}

export default Table;