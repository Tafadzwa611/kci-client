import React from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniLoanDetails from './MiniLoanDetails';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Fetcher } from '../../../common';
import Pager from './Pager';

function LoansTable({
  loanData,
  loanDetails,
  setLoanDetails,
  loanId,
  setLoanId,
  setLoanData,
  params
}) {
  const handleClick = (e) => setLoanId(e.target.id);

  return (
    <>
      {loanId ?
        <>
          <TableHeader loanData={loanData}/>
          <div style={{padding:'0', border:'none'}} className='table-container journal__table font-12'>
            <Pager
              nextPageNumber={loanData.next_page_num}
              params={params}
              prevPageNumber={loanData.prev_page_num}
              setLoanData={setLoanData}
            />
            <div className='table-responsive journal__table-container-journals'>
              <MiniTable loanData={loanData} handleClick={handleClick} selectedLoanId={loanId}/>
              <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]} extra={{loanDetails, setLoanDetails, setLoanId, setLoanData}}>
                {({data, extra}) => <MiniLoanDetails loanData={data[0]} extra={extra}/>}
              </Fetcher>
            </div>
          </div>
        </> :
        <>
          <TableHeader loanData={loanData}/>
          <div style={{padding: '0', border: 'none'}} className='table-container full__width font-12'>
            <div className='table-responsive full__table'>
              <Pager
                nextPageNumber={loanData.next_page_num}
                params={params}
                loadMoreLoans={() => console.log('loadMoreLoans')}
                loadingMore={false}
                prevPageNumber={loanData.prev_page_num}
                setLoanData={setLoanData}
              />
              <MainTable loanData={loanData} handleClick={handleClick}/>
            </div>
          </div>
        </>}
    </>
  )
}

const TableHeader = ({loanData}) => {
  return (
    <div className='table-header'>
      <div>Showing {loanData.loans.length} of {loanData.count} loans.</div>
      <div>Page {loanData.number} of {loanData.num_of_pages}</div>
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
  )
}

export default LoansTable;