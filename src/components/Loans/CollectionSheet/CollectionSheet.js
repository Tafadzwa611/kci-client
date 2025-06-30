import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import CollectionTable from './CollectionTable';

const CollectionSheet = () => {
  const [params, setParams] = useState(null);
  const [sheet, setSheet] = useState(null);

  const urls = [
    '/usersapi/list_units/',
    '/usersapi/list_report_templates/?report_type=COLLECTION_SHEET',
    '/usersapi/staff/?loan_officers_only=1'
  ];

  return (
    <div>
      <Fetcher urls={urls}>
        {({data}) => <Filter data={data} setParams={setParams} setSheet={setSheet}/>}
      </Fetcher>
      <div style={{paddingTop: '2rem'}}></div>
      <CollectionTable sheet={sheet} params={params} setSheet={setSheet} />
    </div>
  )
}

export default CollectionSheet;