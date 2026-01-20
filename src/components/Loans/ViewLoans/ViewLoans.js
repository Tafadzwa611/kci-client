import React, {useEffect} from 'react';
import OnlineApplications from '../OnlineApplications/OnlineApplications';
import LoansList from '../LoansList/LoansList';
import AddLoan from '../AddLoan/AddLoan';
import BatchApproval from '../BatchApproval/BatchApproval';
import Report from '../BatchApproval/Report';
import EditLoan from '../AddLoan/EditLoan';
import Calculator from '../Calculator/Calculator';
import CollectionHome from '../CollectionSheet/CollectionHome';
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
        <Route path='approval' element={<BatchApproval />} />
        <Route path='approval-report/:reportId' element={<Report />} />
        <Route path='onlineapplications' element={<OnlineApplications />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='/collection_sheet/*' element={<CollectionHome />} />
        <Route
          path='editloan/:loanType/:loanId'
          element={
            <Fetcher urls={['/loansapi/loan_products_list/', '/clientsapi/client_controls/', '/usersapi/list_units/', '/acc-api/cash-accounts-list/']}>
              {({data}) => (
                <EditLoan
                  products={data[0]}
                  clientControls={data[1]}
                  units={data[2]}
                  cashAccounts={data[3]}
                />
              )}
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
  const urls = [
    '/loansapi/loan_products_list/?allowed_in_user_branch_only=1', 
    '/loansapi/loan_controls/', 
    '/usersapi/list_field_sets/?entity_type=LOAN&active=1', 
    '/usersapi/list_units/?active_only=1',
    '/clientsapi/client_controls/',
    '/acc-api/cash-accounts-list/'
  ];
  return (
    <Fetcher urls={urls}>
        {({data}) => (
          <AddLoan 
            products={data[0]}
            lcontrols={data[1]}
            customForms={data[2]}
            units={data[3]}
            clientControls={data[4]}
            cashAccounts={data[5]}
          />
        )}
    </Fetcher>
  )
}

const LoanListComponent = () => {
  return (
    <Fetcher urls={['/loansapi/loan_products/', '/usersapi/list_units/']}>
      {({data}) => <LoansList products={data[0].loan_products} units={data[1]}/>}
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
            <Link to='/loans/viewloans/approval' id='add' className={location.pathname === '/loans/viewloans/approval' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Batch Approval
            </Link>
            <Link to='/loans/viewloans/onlineapplications' id='onlineapplications' className={location.pathname === '/loans/viewloans/onlineapplications' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
             Online Applications
            </Link>
            <Link to='/loans/viewloans/calculator' id='calculator' className={location.pathname === '/loans/viewloans/calculator' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Loan Calculator
            </Link>
            <Link to='/loans/viewloans/collection_sheet' id='calculator' className={location.pathname === '/loans/viewloans/collection_sheet' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Collection Sheet
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
