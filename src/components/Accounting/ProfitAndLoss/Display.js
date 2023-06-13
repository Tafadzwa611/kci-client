import React from 'react';
import Empty from './Empty';
import IncomeStatementTable from './IncomeStatementTable';

function Display({report}) {

  if (report===null || report.rtype != 'cash') {
    return <Empty message='Select Start Date, End Date and at least one branch to run income statement.'/>
  }

  return <IncomeStatementTable report={report}/>
}

export default Display