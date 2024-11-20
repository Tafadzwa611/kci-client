import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import { Fetcher } from '../../../common';

function CreditReport() {
  const [params, setParams] = useState(null);
  const [report, setReport] = useState(null);

  return (
    <Fetcher urls={['/usersapi/list_units/']}>
      {({data}) => <CreditReportSection units={data[0]} params={params} setParams={setParams} report={report} setReport={setReport}/>}
    </Fetcher>
  )
}

const CreditReportSection = ({params, setParams, report, setReport, units}) => {
  return (
    <>
      <Filter setReport={setReport} setParams={setParams} units={units}/>
      <div style={{paddingTop: '2rem'}}></div>
      {report && <Table report={report} setReport={setReport} params={params}/>}
    </>
  )
}

export default CreditReport;