import React, { useState } from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import AppsTable from './AppsTable';

function OnlineApps() {
  const [appsData, setAppsData] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    apps: []
  });
  const [params, setParams] = useState(null);
  const [appId, setAppId] = useState(null);

  return (
    <Fetcher urls={['/clientsapi/client_types/']}>
      {({data}) => (
        <>
          <Filter clientTypes={data[0]} setParams={setParams} setAppsData={setAppsData}/>
          <div style={{paddingTop: '2rem'}}></div>
          <AppsTable appId={appId} params={params} appsData={appsData} setAppsData={setAppsData} setAppId={setAppId}/>
        </>
      )}
    </Fetcher>
  )
}

export default OnlineApps;