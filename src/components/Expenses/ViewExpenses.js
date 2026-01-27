import React from 'react';
import List from './ViewExpenses/List';
import AddExpense from './ViewExpenses/AddExpense';
import { Fetcher } from '../../common';
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';


const ViewExpenses = () => {
  React.useEffect(() => {
    document.title = 'View Expenses';
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ExpenseListComponent />} />
        <Route path='addexpense' element={<AddExpenseComponent />} />
      </Route>
    </Routes>
  )
}

const AddExpenseComponent = () => {
  return (
    <Fetcher urls={['/expensesapi/expensetypeslist/?header=0', '/acc-api/cash-accounts-list/']}>
      {({data}) => <AddExpense expensetypes={data[0]} fundaccounts={data[1].accounts} />}
    </Fetcher>
  )
}

const ExpenseListComponent = () => {
  return (
    <Fetcher urls={['/expensesapi/expensetypeslist/?header=1']}>
      {({data}) => <List expensetypes={data[0]} />}
    </Fetcher>
  )
}

function Layout() {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='table-heading' style={{marginBottom:'20px'}}>View Expenses</h5>
        <>
          <div className='bloc-tabs'>
            <Link to='/expenses/viewexpenses' id='list' className={location.pathname === '/expenses/viewexpenses' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              View Expenses
            </Link>
            <Link to='/expenses/viewexpenses/addexpense' id='add' className={location.pathname === '/expenses/viewexpenses/addexpense' ? 'tabs-client_a active-tabs' : 'tabs-client_a'}>
              Add Expense
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

export default ViewExpenses;
