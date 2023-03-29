import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ViewLoans = lazy(() => import('../Loans/ViewLoans/ViewLoans'));
const ViewRefunds = lazy(() => import('../Loans/Refunds/ViewRefunds'));
const LoanDetail = lazy(() => import('../Loans/LoanDetails/LoanDetail'));
const AddLoanPayment = lazy(() => import('../Loans/LoanDetails/AddLoanPayment'));
const AddCollateral = lazy(() => import('../Loans/LoanDetails/AddCollateral'));
const AddComments = lazy(() => import('../Loans/LoanDetails/AddComments'));
const AddLoanPenalty = lazy(() => import('../Loans/LoanDetails/AddLoanPenalty'));
const AddCollateralType = lazy(() => import('../Loans/LoanDetails/AddCollateralType'));
const CollateralTypes = lazy(() => import('../Loans/LoanDetails/CollateralTypes'));
const LoanProducts = lazy(() => import('../Loans/LoanProducts/LoanProducts'));
const AddLoanProduct = lazy(() => import('../Loans/LoanProducts/AddLoanProduct'));
const LoanFees = lazy(() => import('../Loans/LoanFees/LoanFees'));
const AddLoanFee = lazy(() => import('../Loans/LoanFees/AddLoanFee'));
const ViewGuarantors = lazy(() => import('../Loans/Guarantors/ViewGuarantors'));
const AddGuarantor = lazy(() => import('../Loans/Guarantors/AddGuarantor'));

const LoanRoutes = 
(
  <>
    <Route exact path='/loans/viewrefunds' element={<ViewRefunds/>}/>
    <Route exact path='/loans/collateraltypes' element={<CollateralTypes/>}/>
    <Route exact path='/loans/loanfees' element={<LoanFees/>}/>
    <Route exact path='/loans/addcollateraltype' element={<AddCollateralType/>}/>
    <Route exact path='/loans/addloanfee' element={<AddLoanFee/>}/>
    <Route exact path='/loans/addloanproduct' element={<AddLoanProduct/>}/>
    <Route exact path='/loans/loanproducts' element={<LoanProducts/>}/>
    <Route exact path='/loans/viewguarantors' element={<ViewGuarantors/>}/>
    <Route exact path='/loans/viewloans' element={<ViewLoans/>}/>
    <Route exact path='/loans/addloanpayment' element={<AddLoanPayment/>}/>
    <Route exact path='/loans/addloancollateral' element={<AddCollateral/>}/>
    <Route exact path='/loans/addloancomments' element={<AddComments/>}/>
    <Route exact path='/loans/addloanpenalty' element={<AddLoanPenalty/>}/>
    <Route exact path='/loans/addguarantor' element={<AddGuarantor/>}/>
    <Route exact path='/loans/loandetail' element={<LoanDetail/>}/>
  </>
)

export default LoanRoutes;