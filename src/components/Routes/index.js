import React, { Suspense, lazy, useEffect } from 'react';
import AccountingRoutes from './AccountingRoutes';
import AssetRoutes from './AssetRoutes';
import ClientRoutes from './ClientRoutes';
import GroupRoutes from './GroupRoutes';
import ExpenseRoutes from './ExpenseRoutes';
import LoanRoutes from './LoanRoutes';
import DepositRoutes from './DepositRoutes';
import OtherIncomeRoutes from './OtherIncomeRoutes';
import PaymentRoutes from './PaymentRoutes';
import ReportRoutes from './ReportRoutes';
import DataRoutes from './DataRoutes';
import UserRoutes from './UserRoutes';
import LocalExportRoutes from './LocalExportsRoutes';
import {useLoggedInUser} from '../../contexts/LoggedInUserContext';
import { useBranches } from '../../contexts/BranchesContext';
import { useCurrencies } from '../../contexts/CurrenciesContext';
import { useLoanControls } from '../../contexts/LoanControlsContext';
import { useProducts } from '../../contexts/ProductsContext';
import { useUnits } from '../../contexts/UnitsContext';
import { useCash } from '../../contexts/CashContext';
import { useClientControls } from '../../contexts/ClientControlsContext';
import { useLoanForms } from '../../contexts/LoanFormsContext';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

const Home = lazy(() => import('../Home/Home'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));

const Routes = ({
  loggedInUser,
  branches,
  currencies,
  loanControls,
  loanProducts,
  units,
  cashAccounts,
  clientControls,
  loanForms
}) => {
  const {setLoggedInUser} = useLoggedInUser();
  const {setBranches} = useBranches();
  const {setCurrencies} = useCurrencies();
  const {setLoanControls} = useLoanControls();
  const { setProducts } = useProducts();
  const { setUnits } = useUnits();
  const { setCash } = useCash();
  const { setClientControls } = useClientControls();
  const { setLoanForms } = useLoanForms();

  useEffect(() => {
    setLoggedInUser(loggedInUser);
    setBranches(branches.results);
    setCurrencies(currencies);
    setLoanControls(loanControls);
    setProducts(loanProducts);
    setUnits(units);
    setCash(cashAccounts);
    setClientControls(clientControls);
    setLoanForms(loanForms);
  }, []);

  return (
    <Suspense fallback='Loading...'>
      <ReactRoutes >
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        {AccountingRoutes}
        {AssetRoutes}
        {ClientRoutes}
        {GroupRoutes}
        {ExpenseRoutes}
        {DepositRoutes}
        {LoanRoutes}
        {OtherIncomeRoutes}
        {PaymentRoutes}
        {ReportRoutes}
        {UserRoutes}
        {DataRoutes}
        {LocalExportRoutes}
      </ReactRoutes>
    </Suspense>
  )
}

export default Routes;