import React, { useEffect } from 'react';
import { Fetcher } from '../../../common';
import TransferList from '../TransferList/TransferList';
import CreateTransfer from '../CreateTransfer/CreateTransfer';
import TransferRequests from '../TransferRequests/TransferRequests'
import {
  Routes,
  Route,
  Outlet,
  NavLink
} from 'react-router-dom';

const ViewTransfers = () => {
  useEffect(() => {
    document.title = 'View Transfers';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TransferComponent />} />
        <Route path='addtransfer' element={<AddTransferComponent />} />
        <Route path='transferrequests' element={<TransferRequests />} />
      </Route>
    </Routes>
  );
};

const AddTransferComponent = () => {
  return (
    <Fetcher urls={['/acc-api/get_transfertype_list/']}>
      {({ data }) => <CreateTransfer transfertypes={data[0]} />}
    </Fetcher>
  );
};

const TransferComponent = () => {
  return (
    <Fetcher urls={['/acc-api/get_tenant_transfertype_list/']}>
      {({ data }) => <TransferList transferTypes={data[0]} />}
    </Fetcher>
  );
};

function Layout() {
  return (
    <div className='card ui-card'>
      <div className='card-body ui-card-body'>
        <div className='ui-page-head'>
          <h5 className='table-heading ui-page-title'>View Transfers</h5>
        </div>

        <div className='ui-tabs' aria-label='Transfers tabs'>
          <Tab to='/transfers/viewtransfers' end>
            View Transfers
          </Tab>
          <Tab to='/transfers/viewtransfers/addtransfer'>
            Add Transfer
          </Tab>
          <Tab to='/transfers/viewtransfers/transferrequests'>
            Requests
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

export default ViewTransfers;