import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const Table = ({ report, params, setReport }) => {
  return (
    <>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='clients-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'> 
                <th style={{textAlign:'right'}}>Client_Name</th>
                <th style={{textAlign:'right'}}>Client_ID</th>
                <th style={{textAlign:'right'}}>Account_No</th>
                <th style={{textAlign:'right'}}>Installment_Amount</th>
                <th style={{textAlign:'right'}}>Amount_Paid</th>
                <th style={{textAlign:'right'}}>Expected_Princ</th>
                <th style={{textAlign:'right'}}>Expected_Int</th>
                <th style={{textAlign:'right'}}>Expected_Fees</th>
                <th style={{textAlign:'right'}}>Expected_Pen</th>
                <th style={{textAlign:'right'}}>Principal_Paid</th>
                <th style={{textAlign:'right'}}>Interest_Paid</th>
                <th style={{textAlign:'right'}}>Fees_Paid</th>
                <th style={{textAlign:'right'}}>Penalty_Paid</th>
                <th style={{textAlign:'right'}}>Loan_Status</th>
                <th style={{textAlign:'right'}}>Branch</th>
                <th style={{textAlign:'right'}}>Installment_Date</th>
                <th style={{textAlign:'right'}}>Loan_Officer</th>
                <th style={{textAlign:'right'}}>Loan_Product</th>
              </tr>
            </thead>
            <tbody>
              {report.installments.map(installment => {
                return (
                  <tr key={installment.id}>
                    <td>{installment.client_name}</td>
                    <td>{installment.client_id}</td>
                    <td>{installment.loan_number}</td>
                    <td>{installment.amount_expected}</td>
                    <td>{installment.amount_paid}</td>
                    <td>{installment.expected_principal}</td>
                    <td>{installment.expected_interest}</td>
                    <td>{installment.expected_fees}</td>
                    <td>{installment.expected_penalty}</td>
                    <td>{installment.principal_paid}</td>
                    <td>{installment.interest_paid}</td>
                    <td>{installment.fees_paid}</td>
                    <td>{installment.penalty_paid}</td>
                    <td>{installment.loan_status}</td>
                    <td>{installment.branch}</td>
                    <td>{installment.installment_date}</td>
                    <td>{installment.loan_officer}</td>
                    <td>{installment.loan_product}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const TableHeader = ({report, params, setReport}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={report.next_page_num} params={params} prevPageNumber={report.prev_page_num} setReport={setReport}/>
        <div style={{marginTop:'6px'}}>Showing {report.installments.length} of {report.count} installments.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {report.number} of {report.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='clients-report'
            filename='Installments Report'
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
      const response = await axios.get('/reportsapi/expected_installments_report/', {params: params});
      setReport(response.data);
    } catch (error) {
      console.log(error);
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