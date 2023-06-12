// import React, { useState, useRef, useEffect } from 'react';
// import DateRange from './DateRange';
// import Table from './Table';
// import Footer from './Footer';
// import Summary from './Summary';
// import NoData from '../ClientsReport/NoData';
// import { makeRequest } from '../../../utils/utils';
// import MiniLoader from '../../Loader/MiniLoader';


// const FeesReport = ({loggedInUser}) => {
//     const [report, setReport] = useState([]);
//     const [summary, setSummary] = useState([]);
//     const [order, setOrder] = useState('-id');
//     const [minDate, setMinDate] = useState('');
//     const [maxDate, setMaxDate] = useState('');
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [reportLoaded, setReportLoaded] = useState(false);
//     const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
//     const [currencies, setCurrencies] = useState(null);
//     const [currencyId, setCurrencyId] = useState(null);
//     const [currencyIso, setCurrencyIso] = useState(null);
//     const [selectedBranches, setSelectedBranches] = useState([]);
//     const [msg, setMsg] = useState('Select date range and at least one branch, then click Apply Filters to view report.');
//     const isFirstRun = useRef(true);
//     const pageNum = useRef(1);
  
//     useEffect(() => {
//         pageNum.current = 1;
//         setReport([]);
//     }, [currencyId, minDate, maxDate, selectedBranchesIds]);
  
//     useEffect(() => {
//         getReportData();
//     }, [order]);

//     const getReportData = async () => {
//         if (!isFirstRun.current) {
//             pageNum.current = 1;
//             const data = await getReport();
//             updateUi(data);
//             console.log(order);
//         }
//     }
  
//     useEffect(() => {
//         fetchCurrencies();
//     }, []);
  
//     const onSubmit = async (evt) => {
//         evt.preventDefault();
//         pageNum.current = 1;
//         const data = await getReport();
//         updateUi(data);
//     }
  
//     const loadMore = async (evt) => {
//         evt.preventDefault();
//         setLoadingMore(true);
//         const data = await getReport();
//         updateUi(data, true);
//         setLoadingMore(false);
//     }
  
//     const changeOrder = async (evt) => {
//         evt.preventDefault();
//         isFirstRun.current = false;
//         setOrder(evt.target.value);
//     }
  
//     const updateUi = (newData, extendReport=false) => {
//         setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
//         if (extendReport) {
//             setReport(curr => ([...curr, ...newData.report]));
//         } else {
//             setReport(newData.report);
//             setSummary(newData.summary);
//         }
//         if (!reportLoaded){setReportLoaded(true)};
//     }
  
//     async function getReport() {
//         const url = getUrl();
//         const response = await makeRequest.get(url, {timeout: 8000});
//         if (response.ok) {
//             const data = await response.json();
//             pageNum.current = data.next_page_num;
//         return data
//         } else {
//             const error = await response.json();
//             console.log(error);
//         }
//     }
  
//     const getUrl = () => {
//         let url = `/reportsapi/loans-fees-report/?page_num=${pageNum.current}&order=${order}&currency_id=${currencyId}`;
//         if (maxDate !== '') {url += `&max_date=${maxDate}`};
//         if (minDate !== '') {url += `&min_date=${minDate}`};
//         selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
//         return url
//     }
  
//     async function fetchCurrencies() {
//         try {
//         const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
//         if (response.ok) {
//             const data = await response.json();
//             if (currencyId===null) {
//                 const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
//                 setCurrencyId(zwlId);
//             }
//             return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
//         }else {
//             const error = await response.json();
//             console.log(error);
//         }
//         }catch(error) {
//             console.log(error);
//         }
//     }
  
//     if (currencies===null) {
//       return <MiniLoader />
//     }

//     console.log(report)

//     return (
//             <>
//                 <DateRange 
//                     currencies={currencies}
//                     currencyId={currencyId}
//                     setCurrencyId={setCurrencyId}
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     disableFetch={selectedBranchesIds.length === 0}
//                     onSubmit={onSubmit}
//                     setMaxDate={setMaxDate}
//                     setMinDate={setMinDate}
//                     updateSelectedBranchesId={setSelectedBranchesIds}
//                     setSelectedBranches={setSelectedBranches}
//                 />
//                 {(reportLoaded && report.length > 0) &&
//                     <Summary summary={summary} currencyIso={currencyIso} minDate={minDate} maxDate={maxDate} selectedBranches={selectedBranches} loggedInUser={loggedInUser} />
//                 }
//                 {reportLoaded && report.length > 0 ?
//                     <>
//                         <Table 
//                             report={report} 
//                             currencyIso={currencyIso} 
//                             minDate={minDate} 
//                             maxDate={maxDate} 
//                             selectedBranches={selectedBranches} 
//                             loggedInUser={loggedInUser}
//                             changeOrder={changeOrder} 
//                             order={order} 
//                             disableSelect={report.length === 0} 
//                         />
//                         <Footer nextPageNumber={pageNum} loadMoreLoans={loadMore} loadingMore={loadingMore} />
//                     </> :
//                     <NoData msg={msg} />
//                 }
//             </>
//     );
// }

// export default FeesReport;

import React, {useState} from 'react';
import DateRange from './DateRange';
import Table from './Table';

function FeesReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [feesReportData, setFeesReportData] = useState({count: 0, next_page_num: 0, report: []});
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <DateRange setFeesReportData={setFeesReportData} setParams={setParams} setIntValues={setIntValues}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            feesReportData={feesReportData} 
            setFeesReportData={setFeesReportData}
            params={params}
            loggedInUser={loggedInUser}
            intValues={intValues}
          />
        </>
    </>
  )
}

export default FeesReport;