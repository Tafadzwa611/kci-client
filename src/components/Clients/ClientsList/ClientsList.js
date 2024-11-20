import React, { useState } from 'react';
import ClientsTable from './ClientsTable';
import Filter from './Filter';
import { Fetcher } from '../../../common';

function ClientsList() {
  const [clientsData, setClientsData] = useState({count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    clients: []
  });
  const [params, setParams] = useState(null);
  const [clientId, setClientId] = useState(null);

  return (
    <Fetcher urls={['/clientsapi/client_types/', '/usersapi/list_units/']}>
      {({data}) => (
        <>
          <Filter setParams={setParams} setClientsData={setClientsData} clientTypes={data[0]} units={data[1]}/>
          <div style={{paddingTop: '2rem'}}></div>
          <ClientsTable
            params={params}
            clientId={clientId}
            clientsData={clientsData}
            setClientId={setClientId}
            setClientsData={setClientsData}
            units={data[1]}
          />
        </>
      )}
    </Fetcher>
  )
}

export default ClientsList;