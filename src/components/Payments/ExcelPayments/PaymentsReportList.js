import React from 'react';
import { Fetcher } from '../../../common';

const DBREFS = {
  loan_id: 'Loan Number',
  client__client_id: 'Client Number',
  client__identification_number__icontains: 'Client ID Number'
};

function PaymentsReportList() {
  return (
    <Fetcher urls={['/loansapi/excel_payments_report_list/']}>
      {({data}) => (
        <div style={{display:'block'}}>
          <div style={{padding:'0', border:'none'}}>
            <div style={{width:'100%', overflowX:'auto'}}>
              <div className='table__height'>
                <table className='table' id='clients'>
                  <thead>
                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                      <th style={{textAlign:'start'}}>Status</th>
                      <th style={{textAlign:'start'}}>Uploaded_By</th>
                      <th style={{textAlign:'start'}}>Excel_Reference_Col</th>
                      <th style={{textAlign:'start'}}>Excel_Amount_Col</th>
                      <th style={{textAlign:'start'}}>Database_Reference_Field</th>
                      <th style={{textAlign:'start'}}>Started_At</th>
                      <th style={{textAlign:'start'}}>Completed_At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0].length > 0 ? data[0].map(report => {
                      return (
                        <tr key={report.id}>
                          <td><a href={`/app/#/payments/viewpayments/paymentsreport/${report.id}`}>{report.status}</a></td>
                          <td>{report.uploader_fullname}</td>
                          <td>{report.ref_col}</td>
                          <td>{report.amount_col}</td>
                          <td>{DBREFS[report.field_name]}</td>
                          <td>{report.started_at}</td>  
                          <td>{report.completed_at}</td>
                        </tr>
                      )
                    }) :
                    <tr><td colSpan={8} style={{textAlign: 'center'}}>No Excel Payments Reports could be found.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fetcher>
  )
}

export default PaymentsReportList;