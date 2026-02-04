import React, {useState} from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function DebtorsListTable({report, setReport, params}) {
    return (
        <>
            <TableHeader report={report} params={params} setReport={setReport}/>
            <div className='table-container' style={{padding:'0', border:'none'}}>
                <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
                    <table className='table' style={{width:'100%'}} id='loans-report'>
                        <thead className='clients-report-table'>
                            <tr className='journal-details fees__report_thead'>
                                <th>Branch</th>
                                <th>Client_Name</th>
                                <th>Client_ID</th>
                                <th>Loan_Number</th>
                                <th>Disbursed_Date</th>
                                <th>Maturity_Date</th>
                                <th>Principal</th>
                                <th>Claimable_Balance</th>
                                <th>Current_Balance</th>
                                <th>Balance_At</th>
                                <th>Num_Of_Repayments</th>
                                <th>Repayment_Cycle</th>
                                <th>Sector</th>
                                <th>Male</th>
                                <th>Female</th>
                                <th>Consumer Loans</th>
                                <th>Commercial Loans</th>
                                <th>Agriculture</th>
                                <th>Construction</th>
                                <th>CrossBoarder</th>
                                <th>Distribution</th>
                                <th>Education</th>
                                <th>Health</th>
                                <th>Housing</th>
                                <th>Manufacturing</th>
                                <th>Mining</th>
                                <th>Retail</th>
                                <th>Transport</th>
                                <th>Vendors</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.loans.map(loan => {
                                return (
                                    <tr key={loan.id}>
                                        <td>{loan.branch_name}</td>
                                        <td>{loan.client_name}</td>
                                        <td>{loan.client_id_num}</td>
                                        <td>{loan.loan_num}</td>
                                        <td>{loan.db_date}</td>
                                        <td>{loan.last_date}</td>
                                        <td>{loan.principal}</td>
                                        <td>{loan.claimable_balance}</td>
                                        <td>{loan.current_balance}</td>
                                        <td>{loan.balance}</td>
                                        <td>{loan.num_of_repayments}</td>
                                        <td>{loan.repayment_cycle}</td>
                                        <td>{loan.reason_for_borrowing}</td>
                                        <td>{loan.male}</td>
                                        <td>{loan.female}</td>
                                        <td>{loan.consumer}</td>
                                        <td>{loan.commercial}</td>
                                        <td>{loan.agriculture}</td>
                                        <td>{loan.construction}</td>
                                        <td>{loan.crossbordertraders}</td>
                                        <td>{loan.distributionservices}</td>
                                        <td>{loan.education}</td>
                                        <td>{loan.health}</td>
                                        <td>{loan.housing}</td>
                                        <td>{loan.manufacturing}</td>
                                        <td>{loan.mining}</td>
                                        <td>{loan.retail}</td>
                                        <td>{loan.transport}</td>
                                        <td>{loan.vendors}</td>
                                        <td>{loan.other}</td>
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
            const response = await axios.get('/reportsapi/debtors_list/', {params: params});
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

export default DebtorsListTable;