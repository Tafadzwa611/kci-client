import React from 'react';
import Empty from './Empty';
// import Loader from './Loader';
import IncomeStatementTable from './IncomeStatementTable';

function Display({report, loading, currencyIso}) {
  if (loading) {
    return <div>Loading...</div>
  }

  if (report===null) {
    return <Empty />
  }
  return <IncomeStatementTable currencyIso={currencyIso} report={report}/>
}

export default Display