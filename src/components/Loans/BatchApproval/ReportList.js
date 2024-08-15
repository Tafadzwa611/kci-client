import React from 'react';
import { Fetcher } from '../../../common';

function ReportList() {
  return (
    <Fetcher urls={['/loansapi/approval_reports/']}>
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
                      <th style={{textAlign:'start'}}>Started_At</th>
                      <th style={{textAlign:'start'}}>Completed_At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0].length > 0 ? data[0].map(report => {
                      return (
                        <tr key={report.id}>
                          <td><a href={`/app/#/loans/viewloans/approval-report/${report.id}`}>{report.status}</a></td>
                          <td>{report.uploader_fullname}</td>
                          <td>{report.ref_col}</td>
                          <td>{report.start_time}</td>  
                          <td>{report.complete_time}</td>
                        </tr>
                      )
                    }) :
                    <tr><td colSpan={5} style={{textAlign: 'center'}}>No Excel Approvals Reports could be found.</td></tr>}
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

export default ReportList;