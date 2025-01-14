import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const Table = ({report, setReport, params}) => {
  return (
    <>
      <TableHeader report={report} params={params} setReport={setReport}/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' id='fees-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th style={{textAlign:'right'}}>Date</th>
                <th style={{textAlign:'right'}}>Client</th>
                <th style={{textAlign:'right'}}>Group</th>
                <th style={{textAlign:'right'}}>Loan</th>
                <th style={{textAlign:'right'}}>Branch</th>
                <th style={{textAlign:'right'}}>Fee Name</th>
                <th style={{textAlign:'right'}}>Receipt Number</th>
                <th style={{textAlign:'right'}}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {report.fees_list.map(fee => (
                <tr key={fee.id} className='table-row'>
                  <td style={{textAlign:'right'}}>{fee.payment_date}</td>
                  <td style={{textAlign:'right'}}>{fee.client_name}</td>
                  <td style={{textAlign:'right'}}>{fee.group_name}</td>
                  <td style={{textAlign:'right'}}>{fee.loan_num}</td>
                  <td style={{textAlign:'right'}}>{fee.branch_name}</td>
                  <td style={{textAlign:'right'}}>{fee.fee_name}</td>
                  <td style={{textAlign:'right'}}>{fee.receipt_number}</td>
                  <td style={{textAlign:'right'}}>{fee.amount}</td>
                </tr>
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
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={report.next_page_num}
          params={params}
          prevPageNumber={report.prev_page_num}
          setReport={setReport}
        />
        <div style={{marginTop:'6px'}}>Showing {report.fees_list.length} of {report.count} fees.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {report.number} of {report.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='fees-report'
            filename='fees-report'
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
      const response = await axios.get('/reportsapi/loans-fees-report/', {params: params});
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