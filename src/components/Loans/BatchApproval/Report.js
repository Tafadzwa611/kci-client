import React, {useState} from 'react';
import { Fetcher } from '../../../common';
import { useParams } from 'react-router-dom';
import ReportFilter from './ReportFilter';
import Approvals from './Approvals';

const statusClasses = {
  'In Queue': 'badge-info',
  'Failed': 'badge-danger',
  'In Progress': 'badge-info',
  'Completed': 'badge-success'
};

const state = {
  border: '1px solid transparent',
  display: 'inline-block',
  padding: '5px 12px',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '20px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '2em',
  color: '#ffffff',
};

function Report() {
  const {reportId} = useParams();
  const [params, setParams] = useState(null);
  const [approvals, setApprovals] = useState({count: 0, next_page_num: 0, approvals: []});

  return (
    <Fetcher urls={[`/loansapi/approval_report/${reportId}/`]}>
      {({data}) => (
        <>
          <div style={{marginBottom: '20px'}}>
            <div style={{display: 'flex', alignItems: 'center', columnGap: '10px', marginTop: '1.5rem'}}>
              <span>Excel Approvals Report</span>
              <span className={statusClasses[data[0].status]} style={state}><b>{data[0].status}</b></span>
            </div>
          </div>
          <ReportFilter setApprovals={setApprovals} setParams={setParams} reportId={reportId}/>
          {data[0].status === 'Completed' && (
            <>
              <ReportCard report={data[0]}/>
              <div style={{paddingTop: '2rem'}}></div>
              <Approvals approvals={approvals} params={params} setApprovals={setApprovals}/>
            </>
          )}
        </>
      )}
    </Fetcher>
  )
}

function ReportCard({report}) {
  return (
    <div className='search_background'>
      <div style={{padding: '20px'}}>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
          <div>
            <div style={{marginBottom: '0.25rem'}}><b>Uploaded By:</b> {report.uploader_fullname}</div>
            <div style={{marginBottom: '0.25rem'}}><b>Excel Reference Col:</b> {report.ref_col}</div>
          </div>
          <div>
            <div style={{marginBottom: '0.25rem'}}><b>Start DateTime:</b> {report.started_at}</div>
            <div style={{marginBottom: '0.25rem'}}><b>Completion DateTime:</b> {report.completed_at}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report;