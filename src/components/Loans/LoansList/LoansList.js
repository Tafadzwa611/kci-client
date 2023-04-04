import React, {useState} from 'react';
import Filter from './Filter';
import LoansTable from './LoansTable';
import LoanDetails from './LoanDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function LoansList({products}) {
  const [searchParams] = useSearchParams();
  const [loanData, setLoanData] = useState({count: 0, next_page_num: 0, loans: []});

  return (
    <>
      <Filter products={products} setLoanData={setLoanData}/>
      <div style={{paddingTop: '2rem'}}></div>
      {searchParams.get('loan_id') ?
        <Fetcher urls={[`/loansapi/get_loan/${searchParams.get('loan_id')}/`]}>
          {({data}) => <LoanDetails loanData={data[0]}/>}
        </Fetcher> :
        <LoansTable loanData={loanData} />
      }
    </>
  )
}

export default LoansList;