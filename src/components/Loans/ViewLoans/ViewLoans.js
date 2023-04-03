import React, {useEffect, useState} from 'react';
import LoansList from '../LoansList/LoansList';
import DueLoansList from '../DueLoans/DueLoansList';
import ViewDefaultsAndArrears from '../DefaultedAndArrearsLoans/ViewDefaultsAndArrears';
import AddLoan from '../AddLoan/AddLoan';
import { Fetcher } from '../../../common';

const ViewLoans = () => {
  const [tab, setTab] = useState('loans');

  useEffect(() => {
    document.title = 'View Loans';
  }, []);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Loans</h5>
        <>
          <div className='bloc-tabs'>
            <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}> View Loans </button>
            <button className={tab === 'addloan' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('addloan')}> Add Loan </button>
            <button className={tab === 'dueloans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('dueloans')}> Due Loans </button>
            <button className={tab === 'arrsloans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('arrsloans')}> Arrears loans </button>
            </div>
            <div className='tab-content font-12' style={{marginTop:'3rem'}}>
              {{
                'loans': <LoanListComponent />,
                'dueloans': <DueLoansList setMainTab={setTab}/>,
                'arrsloans': <ViewDefaultsAndArrears setMainTab={setTab}/>,
                'addloan': <AddLoanComponent />,
              }[tab]}
          </div>
        </>
      </div>
    </div>
  );
}

const AddLoanComponent = () => {
  return (
    <Fetcher urls={['/loansapi/loan_products_list/']}>
      {({data}) => <AddLoan products={data[0]}/>}
    </Fetcher>
  )
}

const LoanListComponent = () => {
  return (
    <Fetcher urls={['/loansapi/loan_products/']}>
      {({data}) => <LoansList products={data[0].loan_products}/>}
    </Fetcher>
  )
}

export default ViewLoans;