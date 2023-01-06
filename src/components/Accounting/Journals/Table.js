// import React from 'react';
// import { convertDate } from './utils';

// const Table = ({journals, currencyIso, setDetails, setSelectedJrnlID, details, selectedjrnlID, selectedjrnl}) => {

//     const handleClick = (e) => {
//         setSelectedJrnlID(e.target.id)
//         if (e.target.id != selectedjrnlID){
//             setDetails(true)
//         }else{
//             setDetails(curr => !curr)
//         }
//     }

//     return (
//         <div style={details ? {display:"grid", gridTemplateColumns:"1fr 2fr", columnGap:"1rem"} : {display:"block"}}>
//             <div style={{padding:"0", border:"none"}}>
//                 <div style={{width:"100%", overflowX:"auto"}}>
//                     <div className="table__height">
//                         <table className="table">
//                             <thead>
//                                 {details ?
//                                     <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
//                                         <th>Transaction ID</th>
//                                     </tr>:
//                                     <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
//                                         <th>Transaction ID</th>
//                                         <th>Account Debited</th>
//                                         <th>Account Credited</th>
//                                         <th>Amount Debited</th>
//                                         <th>Amount Credited</th>
//                                         <th>Date Created</th>
//                                     </tr>
//                                 }
//                             </thead>
//                             <tbody>
//                                 {journals.map(journal => {
//                                     if (details) {
//                                         if (selectedjrnl.id == journal.id) {
//                                             return (
//                                                 <tr key={journal.id}>
//                                                     <td><span onClick={handleClick} id={journal.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{journal.transaction_id}</span></td>
//                                                 </tr>
//                                             )
//                                         }else{
//                                             return (
//                                                 <tr key={journal.id}>
//                                                     <td><span onClick={handleClick} id={journal.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{journal.transaction_id}</span></td>
//                                                 </tr>
//                                             )
//                                         }
//                                     }else { 
//                                         return (
//                                             <tr key={journal.id}>
//                                                 <td><span onClick={handleClick} id={journal.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{journal.transaction_id}</span></td>
//                                                 <td>{journal.account_debited} <em><small>({journal.branch_debited})</small></em></td>
//                                                 <td>{journal.account_credited} <em><small>({journal.branch_credited})</small></em></td>
//                                                 <td>{`${currencyIso} ${journal.amount_debited}`}</td>
//                                                 <td>{`${currencyIso} ${journal.amount_credited}`}</td>
//                                                 <td>{convertDate(journal.date_created)}</td>
//                                             </tr>
//                                         )
//                                     }
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             {details && (
//                 <div style={{position:"sticky", top:"0", width:"100%"}}>
//                     <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">
//                         <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                             <div>
//                                 <ul>
//                                     <li><b>Debit</b></li>
//                                     <li>Account Debited: {selectedjrnl.account_debited}</li>
//                                     <li>Branch Debited: {selectedjrnl.branch_debited}</li>
//                                     <li>Amount Debited: {`${currencyIso} ${selectedjrnl.amount_debited}`}</li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <ul>
//                                     <li><b>Credit</b></li>
//                                     <li>Account Credited: {selectedjrnl.account_credited}</li>
//                                     <li>Branch Credited: {selectedjrnl.branch_credited}</li>
//                                     <li>Amount Credited: {`${currencyIso} ${selectedjrnl.amount_credited}`}</li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <ul>
//                                     <li><b>Additional Details</b></li>
//                                     <li>Date: {convertDate(selectedjrnl.date_created)}</li>
//                                     <li>Created By: {selectedjrnl.created_by}</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-12" style={{display:"flex", justifyContent:"flex-end"}}>
//                                 <button><a onClick={e => setDetails(false)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Table;

import React, { Fragment } from 'react';
import { convertDate } from './utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import NoData from './NoData';
import Footer from './Footer';


export default function Table({ journals, asStatement, accountId, openBal, msg, nextPageNumber, loadMoreJournals, loadingMore }) {
  if (journals.length === 0 && asStatement) {
    return (
      <div style={{marginTop:"1rem"}}>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='download-table-xls-button btn btn-default'
            table='journals'
            filename='Journals'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
        <div style={{maxHeight: '600px'}}>
          <table className='table' id='journals'>
            <thead>
              <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                <th className="th-sm">Transaction_ID</th>
                <th className="th-sm">Booking_Date</th>
                <th className="th-sm">Date_Created</th>
                <th className="th-sm">Branch</th>
                <th className="th-sm">GL_Code</th>
                <th className="th-sm">Account_Name</th>
                <th className="th-sm">Credit</th>
                <th className="th-sm">Debit</th>
                <th className="th-sm">Balance</th>
                <th className="th-sm">Client_ID</th>
                <th className="th-sm">Client_Name</th>
                <th className="th-sm">Account_ID</th>
                <th className="th-sm">Created_By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8}>Opening Balance</td>
                <td>{openBal}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer nextPageNumber={nextPageNumber} loadMoreJournals={loadMoreJournals} loadingMore={loadingMore}/>
      </div>
    )
  }

  if (journals.length === 0) {
    return <NoData msg={msg} />
  }

  return (
    <div style={{marginTop:"1rem"}}>
      <div style={{marginBottom:"1rem"}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button btn btn-default'
          table='journals'
          filename='Journals'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div className='table-responsive p-0' style={{maxHeight: '600px'}}>
        <table className='table table-bordered table-head-fixed text-nowrap' id='journals'>
          <thead>
            <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
              <th className="th-sm">Transaction_ID</th>
              <th className="th-sm">Booking_Date</th>
              <th className="th-sm">Date_Created</th>
              <th className="th-sm">Branch</th>
              <th className="th-sm">GL_Code</th>
              <th className="th-sm">Account_Name</th>
              <th className="th-sm">Credit</th>
              <th className="th-sm">Debit</th>
              <th className="th-sm">Balance</th>
              <th className="th-sm">Client_ID</th>
              <th className="th-sm">Client_Name</th>
              <th className="th-sm">Account_ID</th>
              <th className="th-sm">Created_By</th>
            </tr>
          </thead>
          <tbody>
            {asStatement && 
            <tr>
            <td>Opening Balance</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{openBal}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            }
            {journals.map(journal => {
              return (
                <Fragment key={journal.id}>
                  {asStatement ?
                    <>
                      {accountId == journal.account_debited_id && 
                        <tr>
                          <td><a href={`/reports/reportsapp/#/jDetails/${journal.id}`}>{journal.transaction_id}</a></td>
                          <td>{convertDate(journal.booking_date)}</td>
                          <td>{convertDate(journal.date_logged)}</td>
                          <td>{journal.branch_debited_name}</td>
                          <td>{journal.account_debited_code}</td>
                          <td>{journal.account_debited_name}</td>
                          <td></td>
                          <td>{journal.amount}</td>
                          <td>{journal.account_debited_bal}</td>
                          <td>{journal.client_id}</td>
                          <td>{journal.client_name}</td>
                          <td>{journal.account_id}</td>
                          <td>{journal.created_by_name}</td>
                        </tr>
                      }
                      {accountId == journal.account_credited_id &&
                        <tr>
                          <td><a href={`/reports/reportsapp/#/jDetails/${journal.id}`}>{journal.transaction_id}</a></td>
                          <td>{convertDate(journal.booking_date)}</td>
                          <td>{convertDate(journal.date_logged)}</td>
                          <td>{journal.branch_credited_name}</td>
                          <td>{journal.account_credited_code}</td>
                          <td>{journal.account_credited_name}</td>
                          <td>{journal.amount}</td>
                          <td></td>
                          <td>{journal.account_credited_bal}</td>
                          <td>{journal.client_id}</td>
                          <td>{journal.client_name}</td>
                          <td>{journal.account_id}</td>
                          <td>{journal.created_by_name}</td>
                        </tr>
                      }
                    </> :
                    <>
                      <tr>
                        <td><a href={`/reports/reportsapp/#/jDetails/${journal.id}`}>{journal.transaction_id}</a></td>
                        <td>{convertDate(journal.booking_date)}</td>
                        <td>{convertDate(journal.date_logged)}</td>
                        <td>{journal.branch_debited_name}</td>
                        <td>{journal.account_debited_code}</td>
                        <td>{journal.account_debited_name}</td>
                        <td></td>
                        <td>{journal.amount}</td>
                        <td>{journal.account_debited_bal}</td>
                        <td>{journal.client_id}</td>
                        <td>{journal.client_name}</td>
                        <td>{journal.account_id}</td>
                        <td>{journal.created_by_name}</td>
                      </tr>
                      <tr>
                        <td><a href={`/reports/reportsapp/#/jDetails/${journal.id}`}>{journal.transaction_id}</a></td>
                        <td>{convertDate(journal.booking_date)}</td>
                        <td>{convertDate(journal.date_logged)}</td>
                        <td>{journal.branch_credited_name}</td>
                        <td>{journal.account_credited_code}</td>
                        <td>{journal.account_credited_name}</td>
                        <td>{journal.amount}</td>
                        <td></td>
                        <td>{journal.account_credited_bal}</td>
                        <td>{journal.client_id}</td>
                        <td>{journal.client_name}</td>
                        <td>{journal.account_id}</td>
                        <td>{journal.created_by_name}</td>
                      </tr>
                    </>
                    }
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <Footer nextPageNumber={nextPageNumber} loadMoreJournals={loadMoreJournals} loadingMore={loadingMore}/>
    </div>
  )
}