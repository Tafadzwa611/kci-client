import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';

function OnlineApplications() {
  const [applications, setApplications] = useState({
    count: 0,
    next_page_num: null,
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    loans: []
  });
  const [params, setParams] = useState(null);

  return (
    <Fetcher urls={['/loansapi/loan_products/']}>
      {({data}) => (
        <Filter
          products={data[0].loan_products}
          setApplications={setApplications}
          setParams={setParams}
        />
      )}
    </Fetcher>
  )
}

export default OnlineApplications;