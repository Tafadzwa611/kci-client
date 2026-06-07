import React from 'react';
import axios from 'axios';

function SummaryTable({ report, setReport, params }) {
  return (
    <div>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='loans-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th>Date</th>
                <th>Principal</th>
                <th>Claimable_Balance</th>
                <th>Amount_Paid</th>
                <th>Bad_Debt_Recovered</th>
                <th>Written_Off_Amount</th>
              </tr>
            </thead>
            <tbody>
              {report.months.map((txn, idx) => {
                return (
                  <tr key={idx}>
                    <td>{txn.write_off_date}</td>
                    <td>{txn.principal_amount}</td>
                    <td>{txn.claimable}</td>
                    <td>{txn.amount_paid}</td>
                    <td>{txn.bad_debt_recovered}</td>
                    <td>{txn.written_off_amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TableHeader = ({report, params, setReport}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={report.next_page_num}
          params={params}
          prevPageNumber={report.prev_page_num}
          setReport={setReport}
        />
        <div style={{marginTop:'6px'}}>
          Showing {report.current_count} of {report.count} loans.
        </div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>
          Page {report.number} of {report.num_of_pages}
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setReport, params}) => {
  const [errors, setErrors] = React.useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/reportsapi/txns_report/', {params: params});
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
      {prevPageNumber && (
        <>
          <button className='btn btn-default' onClick={onClick}>Back</button><br/>
        </>
      )}
      {nextPageNumber && (
        <button className='btn btn-default' onClick={onClick}>
          Next
        </button>
      )}
    </div>
  )
}

export default SummaryTable;
