// import React, {useEffect, useState, useRef} from 'react';
// import {useParams} from 'react-router-dom';
// import { makeRequest } from '../../../utils/utils';
// import ReportCard from './ReportCard';
// import Payments from './Payments';
// import Footer from './Footer';


// const statusClasses = {
//   'In Queue': 'badge-info',
//   'Failed': 'badge-danger',
//   'In Progress': 'badge-primary',
//   'Completed': 'badge-success'
// };

// const state = {
//   border: '1px solid transparent',
//   display: 'inline-block',
//   padding: '5px 12px',
//   fontSize: '12px',
//   fontWeight: 500,
//   lineHeight: '20px',
//   textAlign: 'center',
//   whiteSpace: 'nowrap',
//   borderRadius: '2em',
//   color: '#ffffff',
// };
// function ExcelPaymentsReport() {
//   const [report, setReport] = useState({});
//   const [payments, setPayments] = useState([]);
//   const [status, setStatus] = useState('');
//   const [initing, setIniting] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const {reportId} = useParams();
//   const pageNum = useRef(1);

//   useEffect(() => {
//     async function runInit() {
//       await Promise.all([fetchReport()]);
//       setIniting(false);
//     }
//     runInit();
//   }, []);

//   useEffect(() => {
//     async function run() {
//       pageNum.current = 1;
//       setPayments([]);
//       await fetchPayments();
//     }
//     if (report.status === 'Completed') {
//       run();
//     }
//   }, [status, report.status]);

//   async function fetchReport() {
//     try {
//       const response = await makeRequest.get(`/loansapi/excel_payments_report/${reportId}/`, {timeout: 80000});
//       if (response.ok) {
//         const data = await response.json();
//         return setReport(data);
//       }else {
//         const error = await response.json();
//         console.log(error);
//       }
//     }catch(error) {
//       console.log(error);
//     }
//   }

//   async function fetchPayments() {
//     try {
//       const url = getUrl();
//       const response = await makeRequest.get(url, {timeout: 80000});
//       if (response.ok) {
//         const data = await response.json();
//         pageNum.current = data.next_page_num;
//         return setPayments(curr => [...curr, ...data.payments]);
//       }else {
//         const error = await response.json();
//         console.log(error);
//       }
//     }catch(error) {
//       console.log(error);
//     }
//   }

//   const getUrl = () => {
//     let url = `/loansapi/excel_payments_list/?report_pk=${reportId}&page_num=${pageNum.current}`;
//     if (status!='') {
//       url += `&status=${status}`;
//     }
//     return url
//   }

//   const loadMore = async (evt) => {
//     evt.preventDefault();
//     setLoadingMore(true);
//     await fetchPayments();
//     setLoadingMore(false);
//   }

//   if (initing) {
//     return <div>Loading</div>
//   }

//   return (
//     <>
//       <div>
//         <a className="btn btn-default" href={`/app/#/payments/viewpayments/excelpayments/`}>Back</a>
//         <div style={{display:"flex", alignItems:"center", columnGap:"10px", marginTop:"1.5rem"}}>
//           <span>Excel Payments Report</span>
//           <span className={statusClasses[report.status]} style={state}><b>{report.status}</b></span>
//         </div>
//       </div>
//       <div>
//         <ReportCard report={report} status={status} setStatus={setStatus}/>
//         <div style={{paddingTop: '17px'}}></div>
//         {report.status === 'Completed' && <div className='row'>
//           <div className='col-12'>
//             <Payments 
//               payments={payments} 
//               setPayments={setPayments}
//             />
//           </div>
//         </div>}
//       </div>
//     </>
//   )
// }

// export default ExcelPaymentsReport;


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

  return (
      <>
          <>
              <Filter setPayments={setPayments} setParams={setParams} reportId={reportId}/>
              <ReportCard report={report}/>
              <div style={{paddingTop: '2rem'}}></div>
              <Payments
                  payments={payments} 
                  params={params}
                  setPayments={setPayments}
              />
          </>
      </>
  )
}
