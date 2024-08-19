import React, {useState} from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Table from './Table';

function Approvals({approvals, params, setApprovals}) {
  return (
    <div>
      <TableHeader approvals={approvals} params={params} setApprovals={setApprovals}/>
      <div style={{padding:"0", border:"none"}} className='table-container full__width font-12'>
        {approvals.approvals && (
          <div className="table-responsive full__table" >
            <Table approvals={approvals}/>
          </div>
        )}
      </div>
    </div>
  )
}

const TableHeader = ({approvals, params, setApprovals}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={approvals.next_page_num}
          params={params}
          prevPageNumber={approvals.prev_page_num}
          setApprovals={setApprovals}
        />
        <div style={{marginTop:'6px'}}>Showing {approvals.approvals.length} of {approvals.count} approvals.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {approvals.number} of {approvals.num_of_pages}</div>
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

const Pager = ({prevPageNumber, nextPageNumber, setApprovals, params}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/loansapi/approvals_list/', {params: params});
      setApprovals(response.data);
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

export default Approvals;