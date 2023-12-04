import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Table({apps, params, setApps}) {
  return (
    <>
      <TableHeader data={apps} params={params} setApps={setApps}/>
      <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
        <div className='table-responsive full__table'>
          <div style={{display:'block'}}>
            <div style={{padding:'0', border:'none'}}>
              <div style={{width:'100%', overflowX:'auto'}}>
                <div className='table__height'>
                  <table className='table' id='loans'>
                    <thead>
                      <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                        <th>Client_Name</th>
                        <th>Loan_Product</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.applications.map(application => {
                        return (
                          <tr className='tr-class' key={application.id}>
                            <td>{application.client__fullname}</td>
                            <td>{application.loan_product__name}</td>
                            <td>{application.loan_product__currency__shortname}{application.amount}</td>
                            <td>{application.app_date}</td>
                            <td>{application.status}</td>
                            <td>
                              <Link to={{pathname: '/loans/viewloans/addloan', search: `?application_id=${application.id}&application_id=${application.id}`}}>
                                <button className='btn btn-olive' onClick={() => console.log('approve')}>
                                  Create Loan
                                </button>
                              </Link>
                              <button className='btn btn-danger' onClick={() => console.log('approve')}>Reject</button>
                            </td>
                          </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const TableHeader = ({data, params, setApps}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={data.next_page_num}
          params={params}
          prevPageNumber={data.prev_page_num}
          setApps={setApps}
        />
        <div style={{marginTop:'6px'}}>Showing {data.applications.length} of {data.count} applications.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {data.number} of {data.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='loans'
            filename='loans'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const Pager = ({
  prevPageNumber,
  nextPageNumber,
  setApps,
  params
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/loansapi/applications/', {params: params});
      setApps(response.data);
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
      {nextPageNumber && <button className='btn btn-default' onClick={onClick}>Next</button>}
    </div>
  )
}

export default Table;