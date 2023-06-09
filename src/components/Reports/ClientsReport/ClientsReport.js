import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function ClientsReport({loggedInUser}) {
  const [params, setParams] = useState(null);
  const [clientsReportData, setClientsReportData] = useState({count: 0, next_page_num: 0, clients: []});
  const [intValues, setIntValues] = useState([])

  return (
    <>
        <>
          <Filter setClientsReportData={setClientsReportData} setParams={setParams} setIntValues={setIntValues}/>
          <div style={{paddingTop: '2rem'}}></div>
          <Table
            clientsReportData={clientsReportData} 
            setClientsReportData={setClientsReportData}
            params={params}
            loggedInUser={loggedInUser}
            intValues={intValues}
          />
        </>
    </>
  )
}

export default ClientsReport;