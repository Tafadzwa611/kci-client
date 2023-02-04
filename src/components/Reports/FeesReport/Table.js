import React, { Fragment } from 'react';
import Header from './Header';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, currencyIso, minDate, maxDate, selectedBranches, loggedInUser, changeOrder, order, disableSelect}) => {
    const getStrDate = (date) => {
        const mydate = new Date(date);
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
        return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
      }
    
    const getFileName = () => {
        if (minDate != '' && maxDate != '') {
            return `Fees Report for ${loggedInUser.company_name} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
        }
        if (minDate == '' && maxDate != '') {
            return `Fees Report for ${loggedInUser.company_name} upto ${getStrDate(maxDate)}`
        }
        if (minDate != '' && maxDate == '') {
            return `Fees Report for ${loggedInUser.company_name} from ${getStrDate(minDate)}`
        }
        return `Fees Report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:"1.5rem"}}>
                <Header 
                    changeOrder={changeOrder}
                    order={order}
                    disableSelect={disableSelect}
                />
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='fees-report'
                    filename={getFileName()}
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <div className="table-container" style={{padding:"0", paddingTop:"1rem", border:"none"}}>
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
                            <tr>
                                <td
                                    title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                
                                    colSpan={9}
                                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                                >Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>Currency: {currencyIso}</td>
                            </tr>
                            <tr>
                                <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.map(date => {
                                return (
                                    <Fragment key={date.day}>
                                        {date.fees_recorded.map(fee => (
                                            <tr key={fee.loan_pk} className="table-row">
                                                <td style={{textAlign:"right"}}>{ date.day }</td>
                                                <td style={{textAlign:"right"}}>{ fee.fullname }</td>
                                                <td style={{textAlign:"right"}}>{ fee.loan_id }</td>
                                                <td style={{textAlign:"right"}}>{ fee.branch }</td>
                                                <td style={{textAlign:"right"}}>{ fee.fee_name }</td>
                                                <td style={{textAlign:"right"}}>{`${currencyIso} ${fee.amount}`}</td>
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

export default Table;