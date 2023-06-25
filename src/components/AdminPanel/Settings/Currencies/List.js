import React, {useState} from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddCur from './AddCur';

function List({data, extra}) {
  const {currencyId, setCurrencyId} = extra;
  const [currs, setCurs] = useState(data);
  const [view, setView] = useState('list');

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Currency'}/>
        <Table
          currs={currs}
        />
      </>
    )
  }
  return <AddCur setView={setView} setCurrencyId={setCurrencyId} setCurs={setCurs}/>
}

export default List;