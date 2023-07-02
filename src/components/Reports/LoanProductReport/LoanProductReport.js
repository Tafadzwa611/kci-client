import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';

function LoanProductReport({loggedInUser}) {

  return (
    <>
      <Fetcher urls={[`/loansapi/loan_products_list/`]}>
        {({data}) => <ViewProducts products={data[0]} loggedInUser={loggedInUser} />}
      </Fetcher>
    </>
  )
}

const ViewProducts = ({products, loggedInUser}) => {
  const [params, setParams] = useState(null);
  const [loanProductsReportData, setLoanProductsReportData] = useState([]);
  const [intValues, setIntValues] = useState([])

  return (
    <>
      <DateRange 
        setLoanProductsReportData={setLoanProductsReportData} 
        setParams={setParams} 
        setIntValues={setIntValues}
        products={products}
      />
      <div style={{paddingTop: '2rem'}}></div>
      <Table
        report={loanProductsReportData} 
        loggedInUser={loggedInUser}
        intValues={intValues}
      />
    </>
  )
}

export default LoanProductReport;