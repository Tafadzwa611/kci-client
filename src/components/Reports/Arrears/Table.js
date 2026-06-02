import React from "react";
import axios from "axios";

function Table({ report, setReport, params }) {
  return (
    <div>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='loans-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th>Branch</th>
                <th>Client_Name</th>
                <th>Mobile#</th>
                <th>Client_ID</th>
                <th>Loan_Number</th>
                <th>Disbursed_Date</th>
                <th>Maturity_Date</th>
              </tr>
            </thead>
            <tbody>
              {report.loans.map(txn => {
                return (
                  <tr key={txn.id}>
                    <td>{txn.branch_name}</td>
                    <td>{txn.client_name}</td>
                    <td>{txn.client_phone_number}</td>
                    <td>{txn.client_id}</td>
                    <td>{txn.loan_num}</td>
                    <td>{txn.disbursement_date}</td>
                    <td>{txn.maturity}</td>
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
          Showing {report.loans.length} of {report.count} loans.
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

export default Table;
