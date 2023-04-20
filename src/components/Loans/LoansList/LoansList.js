import React, {useState} from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';

function LoansList({products}) {
  const [loanData, setLoanData] = useState({count: 0, next_page_num: 0, loans: []});
  const [loanDetails, setLoanDetails] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [clientType, setClientType] = useState('Clients/Pure Groups');

  return (
    <>
      <Filter
        products={products}
        setLoanData={setLoanData}
        setClientType={setClientType}
        setLoanId={setLoanId}
        setLoanDetails={setLoanDetails}
      />
      <div style={{paddingTop: '2rem'}}></div>
      <LoansTable
        loanData={loanData}
        setLoanData={setLoanData}
        clientType={clientType}
        loanDetails={loanDetails}
        setLoanDetails={setLoanDetails}
        loanId={loanId}
        setLoanId={setLoanId}
      />
    </>
  )
}

export default LoansList;