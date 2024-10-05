import React, {Fragment, useState} from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Table({report, setReport, params}) {
  return (
    <>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='loans-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th>Loan_Num</th>
                <th>Client_ID</th>
                <th>Client_Name</th>
                <th>Group_Name</th>
                {report.custom_field_names.map((field_name, idx) => <th key={idx}>{field_name}</th>)}
                <th>Loan_Product</th>
                <th>Branch</th>
                <th>Application_Date</th>
                <th>Disbursement_Date</th>
                <th>First_Installment_Date</th>
                <th>Maturity_Date</th>
                <th>Last_Payment_Date</th>
                <th>Last_Payment_Amount</th>
                <th>Total_Amount_Due</th>
                <th>Installment_Amount</th>
                <th>Number_Of_Installments</th>
                <th>Installment_Cycle</th>
                <th>Original Principal</th>
                <th>Total Interest</th>
              </tr>
            </thead>
            <tbody>
              {report.loans.map(loan => {
                return (
                  <Fragment key={loan.id}>
                    <tr>
                      <td>{loan.loan_id}</td>
                      <td>{loan.identification_number}</td>
                      <td>{loan.client_name}</td>
                      <td>{loan.group_name}</td>
                      {report.custom_field_names.map((field_name, idx) => <td key={idx}>{loan[field_name]}</td>)}
                      <td>{loan.product_name}</td>
                      <td>{loan.branch_name}</td>
                      <td>{loan.app_date}</td>
                      <td>{loan.disbursement_date}</td>
                      <td>{loan.first_installment_date}</td>
                      <td>{loan.maturity_date}</td>
                      <td>{loan.last_payment_date}</td>
                      <td>{loan.last_payment_amount}</td>
                      <td>{loan.total_amount_due}</td>
                      <td>{loan.installment_amount}</td>
                      <td>{loan.number_of_repayments}</td>
                      <td>{loan.repayment_cycle}</td>
                      <td>{loan.org_principal}</td>
                      <td>{loan.interest}</td>
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
          filename='Credit Report'
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
      const response = await axios.get('/reportsapi/credit_report/', {params: params});
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

export default Table;