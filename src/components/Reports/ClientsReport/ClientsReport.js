import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function ClientsReport() {
  const [params, setParams] = useState(null);
  const [clientsReportData, setClientsReportData] = useState(null);

  return (
    <>
      <Filter setClientsReportData={setClientsReportData} setParams={setParams} />
      <div style={{paddingTop: '2rem'}}></div>
      {clientsReportData ? <Table clientsReportData={clientsReportData} setClientsReportData={setClientsReportData} params={params}/> : null}
    </>
  )
}

export default ClientsReport;