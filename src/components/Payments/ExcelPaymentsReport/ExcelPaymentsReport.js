import React, {useState} from 'react';
import Filter from './Filter';
import Payments from './Payments';
import { useSearchParams, useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import ReportCard from './ReportCard';

function ExcelPaymentsReport() {
  const {reportId} = useParams();

    return (
      <>
        <Fetcher urls={[`/loansapi/excel_payments_report/${reportId}/`]}>
          {({data}) => <PaymentsReport report={data[0]} reportId={reportId}/>}
        </Fetcher>
      </>
    )
}

export default ExcelPaymentsReport;

function PaymentsReport({report, reportId}) {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState(null);
  const [payments, setPayments] = useState({count: 0, next_page_num: 0, payments: []});

  const statusClasses = {
    'In Queue': 'badge-info',
    'Failed': 'badge-danger',
    'In Progress': 'badge-primary',
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

  return (
      <>
          <>
              <div style={{marginBottom:'20px'}}>
                <a className="btn btn-default" href={`/app/#/payments/viewpayments/excelpayments/`}>Back</a>
                <div style={{display:"flex", alignItems:"center", columnGap:"10px", marginTop:"1.5rem"}}>
                  <span>Excel Payments Report</span>
                  <span className={statusClasses[report.status]} style={state}><b>{report.status}</b></span>
                </div>
              </div>
              <Filter setPayments={setPayments} setParams={setParams} reportId={reportId}/>
              {report.status === 'Completed' &&
                <>
                  <ReportCard report={report}/>
                  <div style={{paddingTop: '2rem'}}></div>
                  <Payments
                      payments={payments} 
                      params={params}
                      setPayments={setPayments}
                  />
                </>
              }
          </>
      </>
  )
}
