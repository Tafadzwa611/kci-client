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
  const [loanId, setLoanId] = useState(null);
  const [clientType, setClientType] = useState('Clients/Pure Groups');

  return (
    <>
      {searchParams.get('loan_id') && searchParams.get('loan_type') ?
        <LoanDetailView
          loanId={searchParams.get('loan_id')}
          loanType={searchParams.get('loan_type')}
          loanDetails={loanDetails}
          setLoanDetails={setLoanDetails}
        /> :
        <>
          <Filter products={products} setLoanData={setLoanData} setClientType={setClientType} setLoanId={setLoanId} />
          <div style={{paddingTop: '2rem'}}></div>
          <LoansTable
            loanData={loanData}
            clientType={clientType}
            loanDetails={loanDetails}
            setLoanDetails={setLoanDetails}
            loanId={loanId}
            setLoanId={setLoanId}
          />
        </>}
    </>
  )
}

const LoanDetailView = ({loanId, loanType, loanDetails, setLoanDetails}) => {
  if (loanDetails) {
    return {
      cli: <LoanDetails loanDetails={loanDetails} setLoanDetails={setLoanDetails}/>,
      sol: <SolidarityDetails loan={loanDetails}/>
    }[loanType]
  }

  if (loanType === 'sol') {
    return (
      <Fetcher urls={[`/loansapi/get_sloan/${loanId}/`]}>
        {({data}) => <SolidarityDetails loan={data[0]}/>}
      </Fetcher>
    )
  }

  if (loanType === 'cli') {
    return (
      <Fetcher urls={[`/loansapi/get_loan/${loanId}/`]}>
        {({data}) => <LoanDetails loanData={data[0]} loanDetails={loanDetails} setLoanDetails={setLoanDetails}/>}
      </Fetcher>
    )
  }
}

export default LoansList;