import React from 'react';
import MiniLoader from '../../Loader/MiniLoader';
import Empty from './Empty';
import IncomeStatementTable from './IncomeStatementTable';

function Display({report, loading, currencyIso}) {
  if (loading) {
    return <MiniLoader />
  }

  if (report===null) {
    return <Empty />
  }
  return <IncomeStatementTable currencyIso={currencyIso} report={report}/>
}

export default Display