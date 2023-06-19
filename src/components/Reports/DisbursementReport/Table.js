import React, { Fragment, useState } from 'react';
import Header from './Header';
import { convertDate } from '../../Accounting/Journals/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = (
    {
        report, intValues, loggedInUser, currency
    }) => {
    const [groupByDate, setGroupByDate] = useState(true);

    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
            return `${currency} Disbursement Report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
            return `${currency} Disbursement Report for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
            return `${currency} Disbursement Report for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `${currency} Disbursement Report for ${loggedInUser.company_name} all time.`
    }

    const handleOnChange = () => {
        setGroupByDate(!groupByDate);
    };

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-between", marginTop:"2rem"}}>
                <div style={{display:"flex", alignItems:"center", columnGap:"10px"}}>
                    <div style={{display:"flex", alignItems:"center", columnGap:"5px"}}>
                        <input
                            type='checkbox'
                            id='topping'
                            name='topping'
                            value='Paneer'
                            checked={groupByDate}
                            onChange={handleOnChange}
                        /> 
                        <span>Group By Date</span>
                    </div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='download-table-xls-button btn btn-default'
                        table='db-report'
                        filename={getFileName()}
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
            <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" id="db-report">
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th style={{textAlign:"right"}}>Date</th>
                                <th style={{textAlign:"right"}}>Client</th>
                                <th style={{textAlign:"right"}}>Loan</th>
                                <th style={{textAlign:"right"}}>Branch</th>
                                <th style={{textAlign:"right"}}>Principal Released</th>
                                <th style={{textAlign:"right"}}>Interest</th>
                                <th style={{textAlign:"right"}}>Total Due</th>
                                <th style={{textAlign:"right"}}>Total Amount Paid</th>
                                <th style={{textAlign:"right"}}>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Disbursement Report</td>
                            </tr>
                            <tr>
                                <td title={getFileName()} className='text-bold text-left' colSpan={9} style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                {getFileName()}
                                </td>
                            </tr>
                            {/* <tr>
                                <td
                                    title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                    className='text-bold text-left'
                                    colSpan={9}
                                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                                >Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}</td>
                            </tr> */}
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>
                                    Currency: {currency}
                                </td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.report.map(date => {
                                return (
                                <Fragment key={date.day}>
                                    {date.loans && 
                                        <>
                                            {groupByDate &&
                                                <tr>
                                                    <td className='text-bold journal-details header text-left' colSpan='9'>{convertDate(date.day)}</td>
                                                    <td style={{display: 'none'}}></td>
                                                    <td style={{display: 'none'}}></td>
                                                    <td style={{display: 'none'}}></td>
                                                </tr> 
                                            }
                                            {date.loans.map(loan => (
                                                <tr key={loan.id}>
                                                    <td style={{textAlign: 'right'}}>{convertDate(date.day)}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.fullname}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.loan_id}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.branch}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.principal}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.interest}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.amount_due}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.total_amount_paid}</td>
                                                    <td style={{textAlign: 'right'}}>{loan.balance}</td>
                                                </tr>
                                            ))}
                                        </>
                                    }
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