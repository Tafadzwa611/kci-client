import React, { useState } from 'react';
import ClientsTable from './ClientsTable';
import Filter from './Filter';
import { Fetcher } from '../../../common';
// import Footer from './Footer';
// import AdvancedSearch from './AdvancedSearch/AdvancedSearch';

function ClientsList() {
  const [clientsData, setClientsData] = useState({count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    clients: []
  });
  const [params, setParams] = useState(null);
  // const [searchType, setSearchType] = useState('basic');
  const [clientId, setClientId] = useState(null);

  return (
    <Fetcher urls={['/clientsapi/client_types/']}>
      {({data}) => (
        <>
          {/* <div className='row-payments-container' style={{width: '200px', margin: '10px 0'}}>
            <select className='custom-select-form row-form' onChange={(e) => setSearchType(e.target.value)} value={searchType}>
              <option value='basic'>Basic Search</option>
              <option value='advanced'>Advanced Search</option>
            </select>
          </div> */}
          <Filter setParams={setParams} setClientsData={setClientsData} clientTypes={data[0]}/>
          <div style={{paddingTop: '2rem'}}></div>
          <ClientsTable
            params={params}
            clientId={clientId}
            clientsData={clientsData}
            setClientId={setClientId}
            setClientsData={setClientsData}
          />
        </>
      )}
    </Fetcher>
  )
}

export default ClientsList;