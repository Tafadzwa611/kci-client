import React, {useEffect} from 'react';
import List from './ViewOtherIncome/List';
import AddOtherIncome from './ViewOtherIncome/AddOtherIncome';
import { Fetcher } from '../../common';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';

const ViewOtherIncome = () => {
  useEffect(() => {
    document.title = 'View Other Income';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<OtherIncomeListComponent />} />
        <Route path='addotherincome' element={<AddOtherIncomeComponent />} />
      </Route>
    </Routes>
  )
}

const AddOtherIncomeComponent = () => {
  return (
    <Fetcher urls={['/otherincomeapi/otherincometypeslist/', '/acc-api/cash-accounts-list/']}>
      {({data}) => <AddOtherIncome incometypes={data[0]} fundaccounts={data[1].accounts} />}
    </Fetcher>
  )
}

const OtherIncomeListComponent = () => {
  return (
    <List />
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Other Income</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/otherincome/viewotherincome' id='list' className={location.pathname === '/otherincome/viewotherincome' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View OtherIncome
            </Link>
            <Link to='/otherincome/viewotherincome/addotherincome' id='add' className={location.pathname === '/otherincome/viewotherincome/addotherincome' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Other Income
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

export default ViewOtherIncome;
