import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import { Fetcher } from '../../../common';

function DailyReport() {
  const [report, setReport] = useState(null);

  return (
    <Fetcher urls={['/usersapi/list_units/']}>
      {({data}) => <DailyReportSection units={data[0]} report={report} setReport={setReport}/>}
    </Fetcher>
  )
}

const DailyReportSection = ({report, setReport, units}) => {
  return (
    <>
      <Filter setReport={setReport} units={units}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report ? <Table report={report}/> : null}
    </>
  )
}

export default DailyReport;