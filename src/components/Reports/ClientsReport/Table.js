import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const Table = ({ clientsReportData, params, setClientsReportData }) => {
  return (
    <>
      <TableHeader clientsReportData={clientsReportData} params={params} setClientsReportData={setClientsReportData}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='clients-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'> 
                <th style={{textAlign:'right'}}>Client_Name</th>
                <th style={{textAlign:'right'}}>Client_ID</th>
                <th style={{textAlign:'right'}}>Gender</th>
                <th style={{textAlign:'right'}}>Status</th>
                <th style={{textAlign:'right'}}>Phone_Number</th>
                <th style={{textAlign:'right'}}>Loan_Count</th>
                <th style={{textAlign:'right'}}>Principal</th>
                <th style={{textAlign:'right'}}>Principal_Paid</th>
                <th style={{textAlign:'right'}}>Principal_Due</th>
                <th style={{textAlign:'right'}}>Interest</th>
                <th style={{textAlign:'right'}}>Interest_Paid</th>
                <th style={{textAlign:'right'}}>Interest_Due</th>
                <th style={{textAlign:'right'}}>Fees</th>
                <th style={{textAlign:'right'}}>Fees_Paid</th>
                <th style={{textAlign:'right'}}>Fees_Due</th>
                <th style={{textAlign:'right'}}>Penalty</th>
                <th style={{textAlign:'right'}}>Penalty_Paid</th>
                <th style={{textAlign:'right'}}>Penalty_Due</th>
                <th style={{textAlign:'right'}}>Total_Amount</th>
                <th style={{textAlign:'right'}}>Total_Paid</th>
                <th style={{textAlign:'right'}}>Total_Due</th>
              </tr>
            </thead>
            <tbody>
              {clientsReportData.clients.map(client => {
                return (
                  <tr key={client.id}>
                    <td>{client.fullname}</td>
                    <td>{client.client_id}</td>
                    <td>{client.gender}</td>
                    <td>{client.status}</td>
                    <td>{client.phone_number}</td>
                    <td>{client.loan_count}</td>
                    <td>{client.sum_principal}</td>
                    <td>{client.sum_principal_paid}</td>
                    <td>{client.sum_principal_due}</td>
                    <td>{client.sum_interest}</td>
                    <td>{client.sum_interest_paid}</td>
                    <td>{client.sum_interest_amount_due}</td>
                    <td>{client.sum_fees}</td>
                    <td>{client.sum_fees_paid}</td>
                    <td>{client.sum_fees_due}</td>
                    <td>{client.sum_penalty}</td>
                    <td>{client.sum_penalty_paid}</td>
                    <td>{client.sum_penalty_due}</td>
                    <td>{client.total_amount}</td>
                    <td>{client.total_paid}</td>
                    <td>{client.total_due}</td>
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

const TableHeader = ({clientsReportData, params, setClientsReportData }) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={clientsReportData.next_page_num}
          params={params}
          prevPageNumber={clientsReportData.prev_page_num}
          setClientsReportData={setClientsReportData}
        />
        <div style={{marginTop:'6px'}}>Showing {clientsReportData.clients.length} of {clientsReportData.count} clients.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {clientsReportData.number} of {clientsReportData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='clients-report'
            filename='clients-report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setClientsReportData, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/clients-report/', {params: params});
      setClientsReportData(response.data);
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
