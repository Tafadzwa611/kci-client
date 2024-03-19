import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import Table from './Table';

function OnlineApplications() {
  const [apps, setApps] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    applications: []
  });
  const [params, setParams] = useState(null);

  return (
    <Fetcher urls={['/loansapi/loan_products/']}>
      {({data}) => (
        <>
          <Filter
            products={data[0].loan_products}
            setApps={setApps}
            setParams={setParams}
          />
          <div style={{paddingTop: '2rem'}}></div>
          <Table apps={apps} params={params} setApps={setApps}/>
        </>
      )}
    </Fetcher>
  )
}

export default OnlineApplications;