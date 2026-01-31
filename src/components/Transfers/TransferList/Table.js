import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

function Table({transferData, setTransferData, params}) {

  return (
    <>
      <TableHeader transferData={transferData} params={params} setTransferData={setTransferData}/>
      <div style={{padding:"0", border:"none"}} className='table-container full__width font-12'>
        <div className="table-responsive full__table">
            <div style={{display:'block'}}>
                <div style={{padding:'0', border:'none'}}>
                <div style={{width:'100%', overflowX:'auto'}}>
                    <div className='table__height'>
                    <table className='table' id='transfers'>
                        <thead>
                        <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                            <th style={{textAlign:"start"}}>Receiving_Account</th>
                            <th style={{textAlign:"start"}}>Sending_Account</th>
                            <th style={{textAlign:"start"}}>Amount</th>
                            <th style={{textAlign:"start"}}>Date_Created</th>
                            <th style={{textAlign:"start"}}>TransferDate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transferData.transfers.map(transfer => {
                            return (
                            <tr key={transfer.id}>
                                <td style={{verticalAlign:"middle"}}>{transfer.receiving_branch_name}</td>
                                <td style={{verticalAlign:"middle"}}>{transfer.sending_branch_name}</td>
                                <td style={{verticalAlign:"middle"}}>{transfer.amount}</td>
                                <td style={{verticalAlign:"middle"}}>{transfer.db_date_created}</td>
                                <td style={{verticalAlign:"middle"}}>{transfer.date_added}</td>
                            </tr>
                            )
                        })}
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

const TableHeader = ({transferData, params, setTransferData}) => {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={transferData.next_page_num}
          params={params}
          loadMoreTransfers={() => console.log('loadMoreTransfers')}
          loadingMore={false}
          prevPageNumber={transferData.prev_page_num}
          setTransferData={setTransferData}
        />
        <div style={{marginTop:'6px'}}>Showing {transferData.transfers.length} of {transferData.count} transfers.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {transferData.number} of {transferData.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='loans'
              filename='transfers'
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
  setTransferData,
  params
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/acc-api/transfers-list/', {params: params});
      setTransferData(response.data);
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


















































