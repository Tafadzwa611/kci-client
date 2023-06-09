import React from 'react';

const DBREFS = {
  loan_id: 'Loan Number',
  client__client_id: 'Client Number',
  client__ec_number: 'Client EC Number',
  client__identification_number: 'Client ID Number'
};

function ReportCard({report}) {
  return (
    <div className="search_background">
      <div style={{padding:"20px"}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            <div style={{marginBottom:"0.25rem"}}><b>Uploaded By:</b> {report.uploader_fullname}</div>
            <div style={{marginBottom:"0.25rem"}}><b>Excel Reference Col:</b> {report.ref_col}</div>
          </div>
          <div>
            <div style={{marginBottom:"0.25rem"}}><b>Excel Amount Col:</b> {report.amount_col}</div>
            <div style={{marginBottom:"0.25rem"}}><b>Database Reference Field:</b> {DBREFS[report.field_name]}</div>
          </div>
          <div>
            <div style={{marginBottom:"0.25rem"}}><b>Start DateTime:</b> {report.started_at}</div>
            <div style={{marginBottom:"0.25rem"}}><b>Completion DateTime:</b> {report.completed_at}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCard;
