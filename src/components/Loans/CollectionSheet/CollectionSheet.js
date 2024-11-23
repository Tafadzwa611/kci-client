import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import CollectionTable from './CollectionTable';

const CollectionSheet = () => {
  const [params, setParams] = useState(null);
  const [sheet, setSheet] = useState(null);

  const urls = [
    '/usersapi/list_units/',
    '/usersapi/list_report_templates/',
    '/usersapi/staff/?loan_officers_only=1'
  ];

  return (
    <div>
      <Fetcher urls={urls}>
        {({data}) => <Filter data={data} setParams={setParams} setSheet={setSheet}/>}
      </Fetcher>
      <CollectionTable sheet={sheet}/>
    </div>
  )
}

export default CollectionSheet;