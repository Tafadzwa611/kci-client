import React from 'react';
import MiniLoader from '../../Loader/MiniLoader';
import Empty from './Empty';
import IncomeStatementTable from './IncomeStatementTable';

function Display({report, loading, currencyIso}) {
  if (loading) {
    return <MiniLoader />
  }

  if (report===null || report.rtype != 'cash') {
    return <Empty message='Select Start Date, End Date and at least one branch to run income statement.'/>
  }

  return <IncomeStatementTable currencyIso={currencyIso} report={report}/>
}

export default Display