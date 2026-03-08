import React from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';
import { useProducts } from '../../../contexts/ProductsContext';
import { useUnits } from '../../../contexts/UnitsContext';


function LoansList() {
  const [loanData, setLoanData] = React.useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    loans: []
  });
  const [params, setParams] = React.useState(null);
  const [loanDetails, setLoanDetails] = React.useState(null);
  const [loanId, setLoanId] = React.useState(null);

  const { units } = useUnits();
  const { products } = useProducts();

  return (
    <>
      <Filter
        units={units}
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