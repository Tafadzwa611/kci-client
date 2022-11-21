import React, {useState} from 'react';
import {Fetcher} from '../../../common';
import FieldSets from './FieldSets';

function ManageFields() {
  const [entityType, setEntityType] = useState('CLIENT');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={entityType === 'CLIENT' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setEntityType('CLIENT')}>Clients</button>
        <button className={entityType === 'LOAN' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={e=> setEntityType('LOAN')}>Loans</button>
      </div>
      <Fetcher url={`/usersapi/list_field_sets/?entity_type=${entityType}`} method={'get'}>
        {({data}) => <FieldSets data={data}/>}
      </Fetcher>
    </>
  )
}

export default ManageFields;