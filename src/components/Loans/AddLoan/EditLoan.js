import React from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import EditLoanFoam from './EditLoanForm';
import EditSolidarityLoanForm from './EditSolidarityLoanForm';

function EditLoan({products}) {
  const params = useParams();

  if (params.loanType === 'sol') {
    return (
      <Fetcher urls={[`/loansapi/get_sloan/${params.loanId}/`]}>
        {({data}) => <EditSolidarityLoanForm loan={data[0]} loanProducts={products}/>}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
      {({data}) => <EditLoanFoam loanDetails={data[0]} loanProducts={products} />}
    </Fetcher>
  )
}

export default EditLoan;