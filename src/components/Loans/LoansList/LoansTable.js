import React from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniLoanDetails from './MiniLoanDetails';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Fetcher } from '../../../common';

function LoansTable({
  loanData,
  loanDetails,
  setLoanDetails,
  loanId,
  setLoanId,
  setLoanData
}) {
  const handleClick = (e) => setLoanId(e.target.id);

  return (
    <>
      {loanId ?
        <div className='table-header'>
          <div>
            Showing {loanData.loans.length} of {loanData.count} loans.
          </div>
        </div>
      :
        <div className='table-header'>
          <div>
            Showing {loanData.loans.length} of {loanData.count} loans.
          </div>
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
      }
      <div style={{padding:"0", border:"none"}} className={loanId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={loanId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
          {loanId ?
            <>
              <MiniTable loanData={loanData} handleClick={handleClick} selectedLoanId={loanId}/>
              <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]} extra={{loanDetails, setLoanDetails, setLoanId, setLoanData}}>
                {({data, extra}) => <MiniLoanDetails loanData={data[0]} extra={extra}/>}
              </Fetcher>
            </> :
            <MainTable loanData={loanData} handleClick={handleClick}/>}
        </div>
      </div>
    </>
  )
}

export default LoansTable;