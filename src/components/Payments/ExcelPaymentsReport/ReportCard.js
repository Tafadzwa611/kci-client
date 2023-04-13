import React from 'react';

const DBREFS = {
  loan_id: 'Loan Number',
  client__client_id: 'Client Number',
  client__ec_number: 'Client EC Number',
  client__identification_number: 'Client ID Number'
};

function ReportCard({report, status, setStatus}) {
  return (
    <div className="search_background">
      <div className='row' style={{padding:"20px"}}>
        <div style={{display:"flex", columnGap:"2%", width:"100%"}}>
          <div style={{width:"49%"}}>
            <select className='custom-select-form' style={{width:"100%"}} value={status} onChange={e => setStatus(e.target.value)}>
              <option value=''>Status</option>
              <option value='Failed'>Failed</option>
              <option value='Paid'>Paid</option>
              <option value='Over Paid'>Over Paid</option>
            </select>
          </div>
          <div style={{width:"49%", display:"flex", justifyContent:"space-around"}}>
            <div>
              <div style={{marginBottom:"0.25rem"}}><b>Uploaded By:</b> {report.uploader_fullname}</div>
              <div style={{marginBottom:"0.25rem"}}><b>Excel Reference Col:</b> {report.ref_col}</div>
              <div style={{marginBottom:"0.25rem"}}><b>Excel Amount Col:</b> {report.amount_col}</div>
            </div>
            <div>
              <div style={{marginBottom:"0.25rem"}}><b>Database Reference Field:</b> {DBREFS[report.field_name]}</div>
              <div style={{marginBottom:"0.25rem"}}><b>Start DateTime:</b> {report.started_at}</div>
              <div style={{marginBottom:"0.25rem"}}><b>Completion DateTime:</b> {report.completed_at}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCard;
