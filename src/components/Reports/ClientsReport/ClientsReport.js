import React from 'react';
import Filter from './Filter';
import Table from './Table';
import { Fetcher } from '../../../common';

function ClientsReport() {
  const [params, setParams] = React.useState(null);
  const [clientsReportData, setClientsReportData] = React.useState(null);

  return (
    <Fetcher urls={['/usersapi/list_units', '/usersapi/list_template_columns/?report_type=CLIENTS_REPORT', '/usersapi/list_report_templates/?report_type=CLIENTS_REPORT']}>
      {({data}) => (
        <ClientsReportSection 
          units={data[0]}
          columns={data[1]}
          savedTemplates={data[2]}
          params={params}
          setParams={setParams}
          clientsReportData={clientsReportData}
          setClientsReportData={setClientsReportData}
        />
      )}
    </Fetcher>
  )
}

const ClientsReportSection =({
  setClientsReportData,
  clientsReportData,
  setParams,
  params,
  units,
  columns,
  savedTemplates
})=> {
  const [templates, setTemplates] = React.useState(savedTemplates);
  return (
    <>
      <Filter
        columns={columns}
        templates={templates}
        setTemplates={setTemplates}
        setClientsReportData={setClientsReportData}
        setParams={setParams}
        units={units}
      />
      <div style={{paddingTop: '2rem'}}></div>
      {clientsReportData && (
        <Table
          clientsReportData={clientsReportData}
          setClientsReportData={setClientsReportData}
          params={params}
          templates={templates}
        />
      )}
    </>
  )
}


export default ClientsReport;