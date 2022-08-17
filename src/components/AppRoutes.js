import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoggedInUserProvider } from './Context';
import ProtectedRoutes from './ProtectedRoutes';
import Cookies from 'js-cookie';

import SkeletonTable from './Skeletons/Charts/SkeletonTable';
// import AddClientSkeleton from './Skeletons/Forms/AddClientSkeleton';
import AddLoanFormSkeleton from './Skeletons/Forms/AddLoanFormSkeleton';
import AddCurrencyFormSkeleton from './Skeletons/Forms/AddCurrencyFormSkeleton';
import AddAssetManagementFormSkeleton from './Skeletons/Forms/AddAssetManagementFormSkeleton';
import BankNamesSkeleton from './Skeletons/Charts/BankNamesSkeleton';
import AccountSettingsSkeleton from './Skeletons/Charts/AccountSettingsSkeleton';
import AddBankNameSkeleton from './Skeletons/Forms/AddBankNameSkeleton';
import AddStaffSkeleton from './Skeletons/Forms/AddStaffSkeleton';
import AddLoanFeeSkeleton from './Skeletons/Forms/AddLoanFeeSkeleton';
import AddLoanProductSkeleton from './Skeletons/Forms/AddLoanProductSkeleton';
import LoanProductsSkeleton from './Skeletons/Charts/LoanProductsSkeleton';
import HomeSkeleton from './Skeletons/HomeSkeleton';
import AddOtherIncomeSkeleton from './Skeletons/Forms/AddOtherIncomeSkeleton';
import AddAssetSkeleton from './Skeletons/Forms/AddAssetSkeleton';
import AdminSkeleton from './Skeletons/AdminSkeleton';
import OnlineApplicationsSkeleton from './Skeletons/Charts/OnlineApplicationsSkeleton';
import UploadPaymentsFileSkeleton from './Skeletons/Forms/UploadPaymentsFileSkeleton';
import AddPaymentsSkeleton from './Skeletons/Forms/AddPaymentsSkeleton';
import AddAssetFormSkeleton from './Skeletons/Forms/AddAssetFormSkeleton';
import ClientsReportSkeleton from './Skeletons/Charts/ClientsReportSkeleton';
import MonthlyReportSkeleton from './Skeletons/Charts/MonthlyReportSkeleton';
import TopBorrowersSkeleton from './Skeletons/Charts/TopBorrowersSkeleton';
import DisbursementReportSkeleton from './Skeletons/Charts/DisbursementReportSkeleton';
import LoanProductReportSkeleton from './Skeletons/Charts/LoanProductReportSkeleton';
import FeesReportSkeleton from './Skeletons/Charts/FeesReportSkeleton';
import LoanOfficerReportSkeleton from './Skeletons/Charts/LoanOfficerReportSkeleton';
import DailyReportSkeleton from './Skeletons/Charts/DailyReportSkeleton';
import PortfolioAtRiskSkeleton from './Skeletons/Charts/PortfolioAtRiskSkeleton';
import AgingReportSkeleton from './Skeletons/Charts/AgingReportSkeleton';
import CashflowSkeleton from './Skeletons/Charts/CashflowSkeleton';
// import TrialBalanceSkeleton from './Skeletons/Charts/TrialBalanceSkeleton';
// import BalanceSheetSkeleton from './Skeletons/Charts/BalanceSheetSkeleton';
import AddMainAccountSkeleton from './Skeletons/Forms/AddMainAccountSkeleton';
// import SkeletonJournals from './Skeletons/Charts/SkeletonJournals';
import ClientDetailsSkeleton from './Skeletons/Charts/ClientDetailsSkeleton';
import LoanDetailSkeleton from './Skeletons/Charts/LoanDetailSkeleton';
import NotificationSkeleton from './Skeletons/Charts/NotificationSkeleton';
import UserProfileSkeleton from './Skeletons/Charts/UserProfileSkeleton';
import OtherIncomeDetailsSkeleton from './Skeletons/Charts/OtherIncomeDetailsSkeleton';

const Home = lazy(() => import('./Home/Home'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Admin = lazy(() => import('./Admin'));
// Clients 
// const AddClient = lazy(() => import('./Clients/add_client/AddClient'));
const ViewClients = lazy(() => import('./Clients/ViewClients/ViewClients'));
const ClientDetail = lazy(() => import('./Clients/ClientDetail'));
const TransferClient = lazy(() => import('./Clients/TransferClient'));
// const ViewOnlineApplications = lazy(() => import('./Clients/ViewOnlineApplications'));
// Loans 
const AddLoan = lazy(() => import('./Loans/AddLoan'));
const ViewLoans = lazy(() => import('./Loans/Loans/ViewLoans'));
const ViewDueLoans = lazy(() => import('./Loans/DueLoans/ViewDueLoans'));
const ViewDefaultsAndArrears = lazy(() => import('./Loans/DefaultedAndArrearsLoans/ViewDefaultsAndArrears'));
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
const ViewPayments = lazy(() => import('./Payments/ViewPayments'));
const AddPayments = lazy(() => import('./Payments/AddPayments'));
const UploadPaymentsFile = lazy(() => import('./Payments/UploadPaymentsFile'));
const PaymentsChart = lazy(() => import('./Payments/PaymentsChart'));
// Users 
const Notifications = lazy(() => import('./Users/Notifications'));
const AccountSettings = lazy(() => import('./Users/AccountSettings'));
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
const Currencies = lazy(() => import('./Users/Currencies'));
const AddCurrency = lazy(() => import('./Users/AddCurrency'));
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
const ClientsReport = lazy(() => import('./Reports/ClientsReport/ClientsReport'));
const LoansReport = lazy(() => import('./Reports/LoansReport/LoansReport'));
const MonthlyReport = lazy(() => import('./Reports/MonthlyReport/MonthlyReport'));
const TopBorrowers = lazy(() => import('./Reports/TopBorrowers/TopBorrowers'));
const DisbursementReport = lazy(() => import('./Reports/DisbursementReport/DisbursementReport'));
const LoanProductReport = lazy(() => import('./Reports/LoanProductReport/LoanProductReport'));
const FeesReport = lazy(() => import('./Reports/FeesReport/FeesReport'));
const LoanOfficerReport = lazy(() => import('./Reports/LoanOfficerReport/LoanOfficerReport'));
const DailyReport = lazy(() => import('./Reports/DailyReport/DailyReport'));
const AgingReport = lazy(() => import('./Reports/AgingReport/AgingReport'));
const PortfolioAtRiskReport = lazy(() => import('./Reports/PortfolioAtRiskReport/PortfolioAtRiskReport'));
// Accounting 
const ViewAccounting = lazy(() => import('./Accounting/ViewAccounting/ViewAccounting'));
// const Cashflow = lazy(() => import('./Accounting/Cashflow/Cashflow'));
// const ProfitAndLoss = lazy(() => import('./Accounting/ProfitAndLoss/ProfitAndLoss'));
// const TrialBalance = lazy(() => import('./Accounting/TrialBalance/TrialBalance'));
// const BalanceSheet = lazy(() => import('./Accounting/BalanceSheet/BalanceSheet'));
// const CashflowProjections = lazy(() => import('./Accounting/CashflowProjections/CashflowProjections'));
// const ChartsOfAccounts = lazy(() => import('./Accounting/ChartsOfAccounts/ChartsOfAccounts'));
const AddMainAccount = lazy(() => import('./Accounting/AddMainAccount/AddMainAccount'));
// const Journals = lazy(() => import('./Accounting/Journals/Journals'));
// const AddJournal = lazy(() => import('./Accounting/AddJournal/AddJournal'));
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

            {/* <Suspense fallback={<AddClientSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/clients/viewclients' element={<AddClient/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense> */}

            <Suspense fallback={<OnlineApplicationsSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    {/* <Route exact path='/app/clients/viewonlineapplications' element={<ViewOnlineApplications/>}/> */}
                    <Route exact path='/app/loans/viewdueloans' element={<ViewDueLoans/>}/>
                    <Route exact path='/app/loans/viewdefaultsandarrears' element={<ViewDefaultsAndArrears/>}/>
                    <Route exact path='/app/loans/viewrefunds' element={<ViewRefunds/>}/>
                    <Route exact path='/app/otherincome/viewotherincome' element={<ViewOtherIncome/>}/>
                    <Route exact path='/app/payments/viewpayments' element={<ViewPayments/>}/>
                    <Route exact path='/app/assets/viewassets' element={<ViewAssets/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<AddAssetFormSkeleton />}>
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

            <Suspense fallback={<AddCurrencyFormSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/addcurrency' element={<AddCurrency/>}/>
                    <Route exact path='/app/expenses/addexpensetype' element={<AddExpenseType/>}/>
                    <Route exact path='/app/otherincome/addotherincometype' element={<AddOtherIncomeType/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<AddAssetManagementFormSkeleton />}>
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

            <Suspense fallback={<BankNamesSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/banknames' element={<BankNames/>}/>
                    <Route exact path='/app/users/currencies' element={<Currencies/>}/>
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

            <Suspense fallback={<AccountSettingsSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route 
                        exact 
                        path='/app/users/accountsettings' 
                        element={
                            <AccountSettings 
                                isAccountinOn={isAccountinOn}
                                showIsAccountinOn={showIsAccountinOn}
                                propagatePayments={propagatePayments}
                                showPropagatePayments={showPropagatePayments}
                        />}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<AddBankNameSkeleton />}>
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

            <Suspense fallback={<AddStaffSkeleton />}>
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

            <Suspense fallback={<AddLoanFeeSkeleton />}>
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

            <Suspense fallback={<AddLoanProductSkeleton />}>
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

            <Suspense fallback={<LoanProductsSkeleton />}>
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

            <Suspense fallback={<HomeSkeleton />}>
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

            <Suspense fallback={<AddOtherIncomeSkeleton />}>
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

            <Suspense fallback={<AddAssetSkeleton />}>
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

            <Suspense fallback={<AdminSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/users/admin' element={<Admin/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<UploadPaymentsFileSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/payments/uploadpaymentsfile' element={<UploadPaymentsFile/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<AddPaymentsSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/payments/addpayments' element={<AddPayments/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<SkeletonTable />}>
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

            <Suspense fallback={<AddLoanFormSkeleton />}>
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

            <Suspense fallback={<ClientsReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/clientsreport' element={<ClientsReport/>}/>
                    <Route exact path='/app/reports/loansreport' element={<LoansReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<MonthlyReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/monthlyreport' element={<MonthlyReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<TopBorrowersSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/topborrowers' element={<TopBorrowers/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<DisbursementReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/disbursementreport' element={<DisbursementReport/>}/>
                    <Route exact path='/app/expenses/viewexpenses' element={<ViewExpenses/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<LoanProductReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/loanproductreport' element={<LoanProductReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<FeesReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                <Route path='app' element={<Main />}>
                <Route exact path='/app/reports/feesreport' element={<FeesReport/>}/>
                </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<LoanOfficerReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/loanofficerreport' element={<LoanOfficerReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<DailyReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/dailyreport' element={<DailyReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<PortfolioAtRiskSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/portfolioatriskreport' element={<PortfolioAtRiskReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<AgingReportSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/reports/agingreport' element={<AgingReport/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            <Suspense fallback={<CashflowSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/viewaccounting' element={<ViewAccounting/>}/>
                    {/* <Route exact path='/app/accounting/cashflow' element={<Cashflow/>}/>
                    <Route exact path='/app/accounting/profitandloss' element={<ProfitAndLoss/>}/> */}
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

            {/* <Suspense fallback={<TrialBalanceSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/trialbalance' element={<TrialBalance/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense> */}

            {/* <Suspense fallback={<BalanceSheetSkeleton />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/balancesheet' element={<BalanceSheet/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense> */}

            <Suspense fallback={<AddMainAccountSkeleton />}>
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

            {/* <Suspense fallback={<SkeletonJournals />}>
            <LoggedInUserProvider value={{loggedInUser, setLoggedInUser}}>

                <Routes>
                <Route path='/' element={<ProtectedRoutes />}>
                    <Route path='app' element={<Main />}>
                    <Route exact path='/app/accounting/journals' element={<Journals/>}/>
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense> */}

            <Suspense fallback={<ClientDetailsSkeleton />}>
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

            <Suspense fallback={<LoanDetailSkeleton />}>
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

            <Suspense fallback={<NotificationSkeleton />}>
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

            <Suspense fallback={<UserProfileSkeleton />}>
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

            <Suspense fallback={<OtherIncomeDetailsSkeleton />}>
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
                    <Route exact path='/app/payments/paymentschart' element={<PaymentsChart/>}/>
                    <Route exact path='/app/users/branchdetails' element={<BranchDetails/>}/>
                    {/* <Route exact path='/app/accounting/cashflowprojections' element={<CashflowProjections/>}/>
                    <Route exact path='/app/accounting/chartsofaccounts' element={<ChartsOfAccounts/>}/>
                    <Route exact path='/app/accounting/addjournal' element={<AddJournal/>}/> */}
                    </Route>
                </Route>
                </Routes>

            </LoggedInUserProvider>
            </Suspense>

        </div>
    );
}

export default AppRoutes;