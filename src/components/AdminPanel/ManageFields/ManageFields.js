import React, {useState} from 'react';
import {Fetcher} from '../../../common';
import FieldSets from './FieldSets';
import {entityTypes} from './data';

function ManageFields() {
  const [entityType, setEntityType] = useState('CLIENT');

  return (
    <>
      <div className='bloc-tabs'>
        {entityTypes.map(et => {
          return (
            <button key={et} className={entityType === et ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_ => setEntityType(et)}>
              {et}S
            </button>
          )
        })}
      </div>
      <Fetcher urls={[`/usersapi/list_field_sets/?entity_type=${entityType}`]}>
        {({data}) => <FieldSets data={data[0]} entityType={entityType}/>}
      </Fetcher>
    </>
  )
}

export default ManageFields;