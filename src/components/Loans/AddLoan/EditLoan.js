import React from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import EditLoanFoam from './EditLoanForm';
import EditSolidarityLoanForm from './EditSolidarityLoanForm';

function EditLoan({products}) {
  const params = useParams();

  if (params.loanType === 'sol') {
    return (
      <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
        {({data}) => <EditSolidarityLoanForm loan={data[0]} loanProducts={products}/>}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`, '/loansapi/loan_controls/', '/usersapi/list_field_sets/?entity_type=LOAN&active=1']}>
      {({data}) => <EditLoanFoam loan={data[0]} loanProducts={products} lcontrols={data[1]} customForms={data[2]}/>}
    </Fetcher>
  )
}

export default EditLoan;