import React from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import EditLoanFoam from './EditLoanForm';
import EditSolidarityLoanForm from './EditSolidarityLoanForm';
import { useProducts } from '../../../contexts/ProductsContext';
import { useClientControls } from '../../../contexts/ClientControlsContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { useCash } from '../../../contexts/CashContext';
import { useLoanControls } from '../../../contexts/LoanControlsContext';
import { useLoanForms } from '../../../contexts/LoanFormsContext';

function EditLoan() {
  const params = useParams();
  let { products } = useProducts();
  const { clientControls } = useClientControls();
  const { units } = useUnits();
  const { cash } = useCash();
  const cashAccounts = cash;
  const { loanControls } = useLoanControls();
  const { loanForms } = useLoanForms();

  if (params.loanType === 'sol') {
    return (
      <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
        {({data}) => <EditSolidarityLoanForm loan={data[0]} loanProducts={products} clientControls={clientControls} units={units}/>}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`,]}>
      {({data}) => (
        <EditLoanFoam
          loan={data[0]}
          loanProducts={products}
          lcontrols={loanControls}
          customForms={loanForms}
          clientControls={clientControls}
          units={units}
          cashAccounts={cashAccounts}
        />
      )}
    </Fetcher>
  )
}

export default EditLoan;