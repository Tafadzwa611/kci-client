import React, {useEffect} from 'react';
import { Fetcher } from '../../../common';
import TransferList from '../TransferList/TransferList';
import CreateTransfer from '../CreateTransfer/CreateTransfer';
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation
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
      </Route>
    </Routes>
  )
}

const AddTransferComponent = () => {
    return (
        <Fetcher urls={['/acc-api/get_transfertype_list/']}>
            {({data}) => <CreateTransfer transfertypes={data[0]} />}
        </Fetcher>
    )
}

const TransferComponent = () => {
    return (
        <Fetcher urls={['/acc-api/get_tenant_transfertype_list/']}>
            {({data}) => <TransferList transferTypes={data[0]} />}
        </Fetcher>
    )
}

function Layout() {
  const location = useLocation();
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Transfers</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/transfers/viewtransfers' id='list' className={location.pathname === '/transfers/viewtransfers' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Transfers
            </Link>
            <Link to='/transfers/viewtransfers/addtransfer' id='add' className={location.pathname === '/transfers/viewtransfers/addtransfer' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Transfer
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

export default ViewTransfers;