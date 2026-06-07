import React from 'react';
import Filter from './Filter';
import Table from './Table';
import SummaryTable from './SummaryTable';

function WriteOff() {
  const [params, setParams] = React.useState(null);
  const [report, setReport] = React.useState(null);

  return (
    <div>
      <Filter setReport={setReport} setParams={setParams}/>
      {report && (
        report.loans ? (
          <Table
            report={report}
            setReport={setReport}
            params={params}
          />
        )
        : (
          <SummaryTable
            report={report}
            setReport={setReport}
            params={params}
          />
        )
      )}
    </div>
  )
}

export default WriteOff;