import React, {useState} from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';

function LoansList({products}) {
  const [loanData, setLoanData] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    loans: []
  });
  const [params, setParams] = useState(null);
  const [loanDetails, setLoanDetails] = useState(null);
  const [loanId, setLoanId] = useState(null);

  return (
    <>
      <Filter
        products={products}
        setLoanData={setLoanData}
        setLoanId={setLoanId}
        setParams={setParams}
        setLoanDetails={setLoanDetails}
      />
      <div style={{paddingTop: '2rem'}}></div>
      <LoansTable
        loanData={loanData}
        setLoanData={setLoanData}
        loanDetails={loanDetails}
        setLoanDetails={setLoanDetails}
        loanId={loanId}
        setLoanId={setLoanId}
        params={params}
      />
    </>
  )
}

export default LoansList;