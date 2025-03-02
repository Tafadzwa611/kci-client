import React, { useState } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function LoansGrantedTable({report, setReport, params}) {
    return (
        <>
            <TableHeader report={report} params={params} setReport={setReport}/>
            <div className='table-container' style={{padding:'0', border:'none'}}>
                <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
                    <table className='table' style={{width:'100%'}} id='loans-report'>
                        <thead className='clients-report-table'>
                            <tr className='journal-details fees__report_thead'>
                                <th>Disbursement Date</th>
                                <th>Branch</th>
                                <th>Client_Name</th>
                                <th>Loan_Product</th>
                                <th>Loan_Number</th>
                                <th>Maturity_Date</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                {report.fee_names.map(fee_name => <th key={fee_name}>{fee_name}</th>)}
                                <th>Claimable Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.loans.map((loan, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{loan.disbursement_date}</td>
                                        <td>{loan.branch}</td>
                                        <td>{loan.client_name}</td>
                                        <td>{loan.loan_product}</td>
                                        <td>{loan.loan_number}</td>
                                        <td>{loan.maturity_date}</td>
                                        {loan.loan_number ? <td>{loan.principal}</td> : <td><b>{loan.principal}</b></td>}
                                        {loan.loan_number ? <td>{loan.interest}</td> : <td><b>{loan.interest}</b></td>}
                                        {report.fee_names.map(fee_name => (
                                            loan.loan_number ? <td key={fee_name}>{loan[fee_name]}</td> : <td key={fee_name}><b>{loan[fee_name]}</b></td>
                                        ))}
                                        {loan.loan_number ? <td>{loan.claimable_balance}</td> : <td><b>{loan.claimable_balance}</b></td>}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


const TableHeader = ({report, params, setReport}) => {
    return (
        <div className='table-header'>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <Pager nextPageNumber={report.next_page_num} params={params} prevPageNumber={report.prev_page_num} setReport={setReport}/>
                <div style={{marginTop:'6px'}}>
                    Showing {report.loans.length} of {report.count} loans.
                </div>
            </div>
            <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
                <div style={{marginTop:'6px'}}>
                    Page {report.number} of {report.num_of_pages}
                </div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='btn btn-default'
                        table='loans-report'
                        filename='Loans Report'
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
        </div>
    )
}

const Pager = ({prevPageNumber, nextPageNumber, setReport, params}) => {
    const [errors, setErrors] = useState(null);

    const onClick = async (evt) => {
        try {
            const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
            params.set('page_num', pageNum);
            const response = await axios.get('/reportsapi/loans_granted/', {params: params});
            setReport(response.data);
        } catch (error) {
            if (error.message === 'Network Error') {
                setErrors({detail: 'Network Error'});
            } else {
                setErrors({detail: 'Server Error'});
            }
        }
    }

    return (
        <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
            {errors && JSON.stringify(errors)}
            {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br/></>}
            {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button>: null}
        </div>
    )
}

export default LoansGrantedTable;