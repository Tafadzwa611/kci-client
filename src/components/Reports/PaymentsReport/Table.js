import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const Table = ({ report, params, setReport }) => {
  return (
    <>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='payments-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'> 
                <th style={{textAlign:'right'}}>Client_Name</th>
                <th style={{textAlign:'right'}}>Phone_Number</th>
                <th style={{textAlign:'right'}}>Loan_Account_No</th>
                <th style={{textAlign:'right'}}>Payment_Branch</th>
                <th style={{textAlign:'right'}}>Loan_Branch</th>
                <th style={{textAlign:'right'}}>Collected_By</th>
                <th style={{textAlign:'right'}}>Product_Name</th>
                <th style={{textAlign:'right'}}>Principal</th>
                <th style={{textAlign:'right'}}>Interest</th>
                <th style={{textAlign:'right'}}>Penalty</th>
                <th style={{textAlign:'right'}}>Fees</th>
                <th style={{textAlign:'right'}}>Overpayment</th>
                <th style={{textAlign:'right'}}>Total_Paid</th>
                <th style={{textAlign:'right'}}>Value_Date</th>
                <th style={{textAlign:'right'}}>Entry_Date</th>
                <th style={{textAlign:'right'}}>Receipt_Number</th>
                <th style={{textAlign:'right'}}>Payment_Channel</th>
                <th style={{textAlign:'right'}}>Disbursement_Channel</th>
              </tr>
            </thead>
            <tbody>
              {report.payments.map(payment => {
                return (
                  <tr key={payment.id}>
                    <td>{payment.client_name}</td>
                    <td>{payment.phone_number}</td>
                    <td>{payment.loan_account}</td>
                    <td>{payment.payment_branch}</td>
                    <td>{payment.loan_branch}</td>
                    <td>{payment.collected_by_name}</td>
                    <td>{payment.product_name}</td>
                    <td>{payment.principal}</td>
                    <td>{payment.interest}</td>
                    <td>{payment.penalty}</td>
                    <td>{payment.fees}</td>
                    <td>{payment.overpayment}</td>
                    <td>{payment.total_paid}</td>
                    <td>{payment.value_date}</td>
                    <td>{payment.receipt_number}</td>
                    <td>{payment.payment_channel}</td>
                    <td>{payment.loan_fund_account}</td>
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
        <div style={{marginTop:'6px'}}>Showing {report.payments.length} of {report.count} payments.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {report.number} of {report.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='payments-report'
            filename='payments-report'
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
      const response = await axios.get('/reportsapi/payments-report/', {params: params});
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