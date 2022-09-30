import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoggedInUserProvider } from './Context';
import ProtectedRoutes from './ProtectedRoutes';
import Cookies from 'js-cookie';

import AdminPanel from './AdminPanel/AdminPanel';

const Home = lazy(() => import('./Home/Home'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const ViewClients = lazy(() => import('./Clients/ViewClients/ViewClients'));
const ClientDetail = lazy(() => import('./Clients/ClientDetail'));
const TransferClient = lazy(() => import('./Clients/TransferClient'));
// Loans 
const AddLoan = lazy(() => import('./Loans/AddLoan'));
const ViewLoans = lazy(() => import('./Loans/ViewLoans/ViewLoans'));
const ViewRefunds = lazy(() => import('./Loans/Refunds/ViewRefunds'));
const LoanDetail = lazy(() => import('./Loans/LoanDetails/LoanDetail'));
const AddLoanPayment = lazy(() => import('./Loans/LoanDetails/AddLoanPayment'));
const AddCollateral = lazy(() => import('./Loans/LoanDetails/AddCollateral'));
const AddComments = lazy(() => import('./Loans/LoanDetails/AddComments'));
const AddLoanPenalty = lazy(() => import('./Loans/LoanDetails/AddLoanPenalty'));
const AddCollateralType = lazy(() => import('./Loans/LoanDetails/AddCollateralType'));
const CollateralTypes = lazy(() => import('./Loans/LoanDetails/CollateralTypes'));
const LoanProducts = lazy(() => import('./Loans/LoanProducts/LoanProducts'));
const AddLoanProduct = lazy(() => import('./Loans/LoanProducts/AddLoanProduct'));
const LoanFees = lazy(() => import('./Loans/LoanFees/LoanFees'));
const AddLoanFee = lazy(() => import('./Loans/LoanFees/AddLoanFee'));
const ViewGuarantors = lazy(() => import('./Loans/Guarantors/ViewGuarantors'));
const AddGuarantor = lazy(() => import('./Loans/Guarantors/AddGuarantor'));
// Payments 
const ViewPayments = lazy(() => import('./Payments/ViewPayments/ViewPayments'));
// Users 
const Notifications = lazy(() => import('./Users/Notifications'));
const BankNames = lazy(() => import('./Users/BankNames'));
const Staff = lazy(() => import('./Users/Staff'));
const AddBankName = lazy(() => import('./Users/AddBankName'));
const Branches = lazy(() => import('./Users/Branches'));
const AddStaff = lazy(() => import('./Users/AddStaff'));
const UserProfile = lazy(() => import('./Users/UserProfile'));
const StaffRoles = lazy(() => import('./Users/StaffRoles'));
const AddBranch = lazy(() => import('./Users/AddBranch'));
const AddStaffRole = lazy(() => import('./Users/AddStaffRole'));
const BranchDetails = lazy(() => import('./Users/BranchDetails'));
// // Other Income 
const OtherIncomeTypes = lazy(() => import('./OtherIncome/OtherIncomeTypes'));
const AddOtherIncomeType = lazy(() => import('./OtherIncome/AddOtherIncomeType'));
const ViewOtherIncome = lazy(() => import('./OtherIncome/ViewOtherIncome'));
const OtherIncomeDetails = lazy(() => import('./OtherIncome/OtherIncomeDetails'));
const AddOtherIncome = lazy(() => import('./OtherIncome/AddOtherIncome'));
// Asset Managemnt 
const AssetTypes = lazy(() => import('./AssetManagement/AssetTypes'));
const AddAssetType = lazy(() => import('./AssetManagement/AddAssetType'));
const AddAsset = lazy(() => import('./AssetManagement/AddAsset'));
const AddNewAsset = lazy(() => import('./AssetManagement/AddNewAsset'));
const AddOldAsset = lazy(() => import('./AssetManagement/AddOldAsset'));
const ViewAssets = lazy(() => import('./AssetManagement/ViewAssets'));
const AssetDetails = lazy(() => import('./AssetManagement/AssetDetails'));
// Expenses 
const ExpenseTypes = lazy(() => import('./Expenses/ExpenseTypes'));
const AddExpenseType = lazy(() => import('./Expenses/AddExpenseType'));
const ViewExpenses = lazy(() => import('./Expenses/ViewExpenses'));
const ExpenseDetails = lazy(() => import('./Expenses/ExpenseDetails'));
const AddExpense = lazy(() => import('./Expenses/AddExpense'));
// Repots 
const ViewReports = lazy(() => import('./Reports/ViewReports/ViewReports'));
// Accounting 
const ViewAccounting = lazy(() => import('./Accounting/ViewAccounting/ViewAccounting'));
const AddMainAccount = lazy(() => import('./Accounting/AddMainAccount/AddMainAccount'));
const Main = lazy(() => import('./Main'));

const AppRoutes = ({isAccountinOn, showIsAccountinOn, propagatePayments, showPropagatePayments, setSidebar}) => {

    const [loggedInUser, setLoggedInUser] = React.useState(null);

    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
          setLoggedInUser(JSON.parse(user));
        }
      }, []);

    return (
        <div className="container">

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/viewrefunds' element={<ViewRefunds/>}/>
                    <Route exact path='/app/otherincome/viewotherincome' element={<ViewOtherIncome/>}/>
                    <Route exact path='/app/payments/viewpayments' element={<ViewPayments/>}/>
                    <Route exact path='/app/assets/viewassets' element={<ViewAssets/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/assets/addnewasset' element={<AddNewAsset/>}/>
                    <Route exact path='/app/assets/addoldasset' element={<AddOldAsset/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/expenses/addexpensetype' element={<AddExpenseType/>}/>
                    <Route exact path='/app/otherincome/addotherincometype' element={<AddOtherIncomeType/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/assets/addassettype' element={<AddAssetType/>}/>
                    <Route exact path='/app/users/addbranch' element={<AddBranch/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/banknames' element={<BankNames/>}/>
                    <Route exact path='/app/users/branches' element={<Branches/>}/>
                    <Route exact path='/app/expenses/expensetypes' element={<ExpenseTypes/>}/>
                    <Route exact path='/app/assets/assettypes' element={<AssetTypes/>}/>
                    <Route exact path='/app/otherincome/otherincometypes' element={<OtherIncomeTypes/>}/>
                    <Route exact path='/app/loans/collateraltypes' element={<CollateralTypes/>}/>
                    <Route exact path='/app/loans/loanfees' element={<LoanFees/>}/>
                    <Route exact path='/app/users/staff' element={<Staff/>}/>
                    <Route exact path='/app/users/staffroles' element={<StaffRoles/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/addbankname' element={<AddBankName/>}/>
                    <Route exact path='/app/users/addstaffrole' element={<AddStaffRole/>}/>
                    <Route exact path='/app/loans/addcollateraltype' element={<AddCollateralType/>}/>
                    <Route exact path='/app/clients/transferclient' element={<TransferClient/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/addstaff' element={<AddStaff/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/addloanfee' element={<AddLoanFee/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/addloanproduct' element={<AddLoanProduct/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/loanproducts' element={<LoanProducts/>}/>
                    <Route exact path='/app/loans/viewguarantors' element={<ViewGuarantors/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
                <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                    <Routes>
                        <Route path='/' element={<ProtectedRoutes />}>
                            <Route path='app' element={<Main />}>
                                <Route exact path='/app/home' element={<Home/>} />
                            </Route>
                        </Route>
                    </Routes>

                </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/otherincome/addotherincome' element={<AddOtherIncome/>}/>
                    <Route exact path='/app/expenses/addexpense' element={<AddExpense/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/asset/addasset' element={<AddAsset/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route 
                        exact 
                        path='/app/users/admin' 
                        element={
                            <AdminPanel
                                isAccountinOn={isAccountinOn}
                                showIsAccountinOn={showIsAccountinOn}
                                propagatePayments={propagatePayments}
                                showPropagatePayments={showPropagatePayments}
                            />
                        }
                    />
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/clients/viewclients' element={<ViewClients setSidebar={setSidebar} />}/>
                    <Route exact path='/app/loans/viewloans' element={<ViewLoans/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/addloan' element={<AddLoan/>}/>
                    <Route exact path='/app/loans/addloanpayment' element={<AddLoanPayment/>}/>
                    <Route exact path='/app/loans/addloancollateral' element={<AddCollateral/>}/>
                    <Route exact path='/app/loans/addloancomments' element={<AddComments/>}/>
                    <Route exact path='/app/loans/addloanpenalty' element={<AddLoanPenalty/>}/>
                    <Route exact path='/app/loans/addguarantor' element={<AddGuarantor/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/viewreports' element={<ViewReports/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/expenses/viewexpenses' element={<ViewExpenses/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/viewaccounting' element={<ViewAccounting/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/addmainaccount' element={<AddMainAccount/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/clients/clientdetail' element={<ClientDetail/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/loans/loandetail' element={<LoanDetail/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/notifications' element={<Notifications/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/userprofile' element={<UserProfile/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/otherincome/otherincomedetails' element={<OtherIncomeDetails/>}/>
                    <Route exact path="/app/expenses/expensedetails/:expenseId" element={<ExpenseDetails/>}/>
                    <Route exact path='/app/assets/assetdetails' element={<AssetDetails/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback='Loading...'>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/dashboard' element={<Dashboard/>}/>
                    <Route exact path='/app/users/branchdetails' element={<BranchDetails/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

        </div>
    );
}

export default AppRoutes;