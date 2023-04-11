import React from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniLoanDetails from './MiniLoanDetails';
import SolidarityMainTable from './SolidarityMainTable';
import SolidarityMiniTable from './SolidarityMiniTable';
import MiniSolidarity from './MiniSolidarity';
import { Fetcher } from '../../../common';

function LoansTable({loanData, clientType, loanDetails, setLoanDetails, loanId, setLoanId}) {
  const handleClick = (e) => {
    setLoanId(e.target.id);
  }

  if (clientType === 'Solidarity') {
    return (
      <div style={{padding:"0", border:"none"}} className={loanId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={loanId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
          <div className="table__height">
            {loanId ?
              <SolidarityMiniTable loanData={loanData} handleClick={handleClick} selectedLoanId={loanId}/> :
              <SolidarityMainTable loanData={loanData} handleClick={handleClick}/>}
          </div>
          {loanId &&
          <Fetcher urls={[`/loansapi/get_sloan/${loanId}/`]} extra={{loanDetails, setLoanDetails}}>
            {({data, extra}) => <MiniSolidarity loanData={data[0]} extra={extra}/>}
          </Fetcher>}
        </div>
      </div>
    )
  }

  return (
    <div style={{padding:"0", border:"none"}} className={loanId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
      <div className={loanId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
        <div className="table__height">
          {loanId ?
            <MiniTable loanData={loanData} handleClick={handleClick} selectedLoanId={loanId}/> :
            <MainTable loanData={loanData} handleClick={handleClick}/>}
        </div>
        {loanId &&
          <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]} extra={{loanDetails, setLoanDetails}}>
            {({data, extra}) => <MiniLoanDetails loanData={data[0]} extra={extra}/>}
          </Fetcher>}
      </div>
    </div>
  )
}

export default LoansTable;