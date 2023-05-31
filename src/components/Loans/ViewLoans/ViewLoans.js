import React, {useEffect} from 'react';
import LoansList from '../LoansList/LoansList';
import AddLoan from '../AddLoan/AddLoan';
import EditLoan from '../AddLoan/EditLoan';
import { Fetcher } from '../../../common';
import LoanDetails from '../LoansList/LoanDetails';
import { useParams } from 'react-router-dom';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation
} from 'react-router-dom';

const ViewLoans = () => {
  useEffect(() => {
    document.title = 'View Loans';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LoanListComponent />} />
        <Route path='addloan' element={<AddLoanComponent />} />
        <Route
          path='editloan/:loanType/:loanId'
          element={
            <Fetcher urls={['/loansapi/loan_products_list/']}>
              {({data}) => <EditLoan products={data[0]}/>}
            </Fetcher>
          } 
        />
        <Route path='loandetails/:loanType/:loanId' element={<FullLoanDetails/>}/>
      </Route>
    </Routes>
  )
}

function FullLoanDetails() {
  const params = useParams();
  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
      {({data}) => <LoanDetails loanApiData={data[0]}/>}
    </Fetcher>
  )
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

function Layout() {
  const location = useLocation();
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Loans</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/loans/viewloans' id='list' className={location.pathname === '/loans/viewloans' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Loans
            </Link>
            <Link to='/loans/viewloans/addloan' id='add' className={location.pathname === '/loans/viewloans/addloan' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Loan
            </Link>
          </div>
          <div className='tab-content font-12' style={{marginTop:'3rem'}}>
            <Outlet />
          </div>
        </>
      </div>
    </div>
  )
}

export default ViewLoans;
