import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

function PaymentsList({data, params, setData}) {
  return (
    <>
      <TableHeader data={data} params={params} setData={setData}/>
      <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
        <div className='table-responsive full__table' >
          <Table data={data}/>
        </div>
      </div>
    </>
  )
}

function Table({data}) {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='payments'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Loan #</th>
                  <th style={{textAlign:'start'}}>Collection_Date</th>
                  <th style={{textAlign:'start'}}>Collected_By</th>
                  <th style={{textAlign:'start'}}>Branch</th>
                  <th style={{textAlign:'start'}}>Client</th>
                  <th style={{textAlign:'start'}}>Group</th>
                  <th style={{textAlign:'start'}}>Sub Loan</th>
                  <th style={{textAlign:'start'}}>Amount_Paid</th>
                </tr>
              </thead>
              <tbody>
                {data.payments.map(payment => {
                  return (
                    <tr key={payment.id}>
                      <td style={{verticalAlign:'middle'}}>{payment.loan_number}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.db_date_created}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.collected_by_username}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.branch_name}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.client}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.group}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.sub_loan_name}</td>
                      <td style={{verticalAlign:'middle'}}>{payment.amount_paid}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableHeader = ({data, params, setData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={data.next_page_num}
          params={params}
          prevPageNumber={data.prev_page_num}
          setData={setData}
        />
        <div style={{marginTop:'6px'}}>Showing {data.payments.length} of {data.count} payments.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {data.number} of {data.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='payments'
              filename='payments'
              sheet='tablexls'
              buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({prevPageNumber, nextPageNumber, setData, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/loansapi/payments_list/', {params: params});
      setData(response.data);
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

export default PaymentsList;
















































