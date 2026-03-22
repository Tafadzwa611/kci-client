import React, { useEffect } from 'react';
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
  NavLink
} from 'react-router-dom';

const ViewLoans = () => {
  useEffect(() => {
    document.title = 'View Loans';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LoansList />} />
        <Route path='addloan' element={<AddLoan />} />
        <Route path='approval' element={<BatchApproval />} />
        <Route path='approval-report/:reportId' element={<Report />} />
        <Route path='onlineapplications' element={<OnlineApplications />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='/collection_sheet/*' element={<CollectionHome />} />
        <Route path='editloan/:loanType/:loanId' element={<EditLoan />} />
        <Route path='loandetails/:loanType/:loanId' element={<FullLoanDetails />} />
      </Route>
    </Routes>
  );
};

function FullLoanDetails() {
  const params = useParams();

  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
      {({ data }) => <LoanDetails loanApiData={data[0]} />}
    </Fetcher>
  );
}

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Loans</h5>
        </div>

        <div className='ui-tabs' aria-label='Loans tabs'>
          <Tab to='/loans/viewloans' end>
            View Loans
          </Tab>
          <Tab to='/loans/viewloans/addloan'>
            Add Loan
          </Tab>
          <Tab to='/loans/viewloans/approval'>
            Batch Approval
          </Tab>
          <Tab to='/loans/viewloans/onlineapplications'>
            Online Applications
          </Tab>
          <Tab to='/loans/viewloans/calculator'>
            Loan Calculator
          </Tab>
          <Tab to='/loans/viewloans/collection_sheet'>
            Collection Sheet
          </Tab>
        </div>

        <div className='tab-content font-12 ui-tab-panel'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Tab({ to, end, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `ui-tab ${isActive ? 'is-active' : ''}`}
    >
      {children}
    </NavLink>
  );
}

export default ViewLoans;