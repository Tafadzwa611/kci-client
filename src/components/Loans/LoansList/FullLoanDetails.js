import React from 'react'
import { Fetcher } from '../../../common';
import { useParams } from 'react-router-dom';
import LoanDetails from './LoanDetails';
import SolidarityDetails from './SolidarityDetails';

function FullLoanDetails() {
  const params = useParams();

  if (params.loanType === 'sol') {
    return (
      <Fetcher urls={[`/loansapi/get_sloan/${params.loanId}/`]}>
        {({data}) => <SolidarityDetails loanApiData={data[0]}/>}
      </Fetcher>
    )
  }

  if (params.loanType === 'cli') {
    return (
      <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
        {({data}) => <LoanDetails loanApiData={data[0]}/>}
      </Fetcher>
    )
  }
}

export default FullLoanDetails