import React, { Fragment, useState } from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const Table = ({report, setReport, params}) => {
  return (
    <>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='db-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th style={{textAlign:'right'}}>Date</th>
                <th style={{textAlign:'right'}}>Client</th>
                <th style={{textAlign:'right'}}>Loan</th>
                <th style={{textAlign:'right'}}>Branch</th>
                <th style={{textAlign:'right'}}>Principal Released</th>
                <th style={{textAlign:'right'}}>Interest</th>
                <th style={{textAlign:'right'}}>Total Due</th>
                <th style={{textAlign:'right'}}>Total Amount Paid</th>
                <th style={{textAlign:'right'}}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {report.db_dates.map(date => (
                <Fragment key={date.day}>
                  <tr>
                    <td className='text-bold journal-details header text-left' colSpan='9'>{convertDate(date.day)}</td>
                    <td style={{display: 'none'}}></td>
                    <td style={{display: 'none'}}></td>
                    <td style={{display: 'none'}}></td>
                  </tr>
                  {date.loans.map(loan => (
                    <tr key={loan.id}>
                    <td style={{textAlign: 'right'}}>{convertDate(date.day)}</td>
                    <td style={{textAlign: 'right'}}>{loan.fullname}</td>
                    <td style={{textAlign: 'right'}}>{loan.loan_id}</td>
                    <td style={{textAlign: 'right'}}>{loan.branch}</td>
                    <td style={{textAlign: 'right'}}>{loan.principal}</td>
                    <td style={{textAlign: 'right'}}>{loan.interest}</td>
                    <td style={{textAlign: 'right'}}>{loan.amount_due}</td>
                    <td style={{textAlign: 'right'}}>{loan.total_amount_paid}</td>
                    <td style={{textAlign: 'right'}}>{loan.balance}</td>
                  </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableHeader = ({report, params, setReport }) => {
  return (
    <div className='table-header' style={{marginTop:'1rem'}}>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager nextPageNumber={report.next_page_num} params={params} prevPageNumber={report.prev_page_num} setReport={setReport}/>
        <div style={{marginTop:'6px'}}>Showing {report.db_dates.length} of {report.count} days.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {report.number} of {report.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='db-report'
            filename='db-report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setReport, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/disbursement-report/', {params: params});
      setReport(response.data);
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