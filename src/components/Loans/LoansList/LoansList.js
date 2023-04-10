import React, {useState} from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';
import LoanDetails from './LoanDetails';
import SolidarityDetails from './SolidarityDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function LoansList({products}) {
  const [searchParams] = useSearchParams();
  const [loanData, setLoanData] = useState({count: 0, next_page_num: 0, loans: []});
  const [loanDetails, setLoanDetails] = useState(null);
  const [clientType, setClientType] = useState('Clients/Pure Groups');

  return (
    <>
      {searchParams.get('loan_id') && searchParams.get('loan_type') ?
        <LoanDetailsView loanId={searchParams.get('loan_id')} loanType={searchParams.get('loan_type')} loanDetails={loanDetails}/> :
        <>
          <Filter products={products} setLoanData={setLoanData} setClientType={setClientType} />
          <div style={{paddingTop: '2rem'}}></div>
          <LoansTable loanData={loanData} clientType={clientType} setLoanDetails={setLoanDetails} />
        </>}
    </>
  )
}

const LoanDetailsView = ({loanId, loanType, loanDetails}) => {
  if (loanDetails) {
    return {
      cli: <LoanDetails loanDetails={loanDetails}/>,
      sol: <SolidarityDetails loan={loanDetails}/>
    }[loanType]
  }

  const solidarity = () => {
    return (
      <Fetcher urls={[`/loansapi/get_sloan/${loanId}/`]}>
        {({data}) => <SolidarityDetails loan={data[0]}/>}
      </Fetcher>
    )
  }

  const pure = () => {
    return (
      <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]}>
        {({data}) => <LoanDetails loanDetails={data[0]}/>}
      </Fetcher>
    )
  }

  return {cli: pure(), sol: solidarity()}[loanType]
}

export default LoansList;