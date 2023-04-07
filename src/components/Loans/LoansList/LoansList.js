import React, {useState} from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';
import LoanDetails from './LoanDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function LoansList({products}) {
  const [searchParams] = useSearchParams();
  const [loanData, setLoanData] = useState({count: 0, next_page_num: 0, loans: []});
  const [loanDetails, setLoanDetails] = useState(null);

  return (
    <>
      {searchParams.get('loan_id') ?
        <LoanDetailsView loanId={searchParams.get('loan_id')} loanDetails={loanDetails}/> :
        <>
          <Filter products={products} setLoanData={setLoanData}/>
          <div style={{paddingTop: '2rem'}}></div>
          <LoansTable loanData={loanData} setLoanDetails={setLoanDetails} />
        </>
      }
    </>
  )
}

const LoanDetailsView = ({loanId, loanDetails}) => {
  if (loanDetails) {
    return <LoanDetails loanDetails={loanDetails}/>
  }

  return (
    <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]}>
      {({data}) => <LoanDetails loanDetails={data[0]}/>}
    </Fetcher>
  )
}

export default LoansList;