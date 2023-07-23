import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

function Ledger() {
  const [params, setParams] = useState(null);
  const [txns, setTxns] = useState(null);
  const [queue, setQueue] = useState([]);

  return (
    <>
      {queue.map((msg, idx) => (
        <div key={idx} className='success__submit' style={{display:'flex', columnGap:'5px'}}>
          <div>
            {msg}
          </div>
        </div>
      ))}
      <Filter setTxns={setTxns} setParams={setParams} setQueue={setQueue}/>
      <div style={{paddingTop: '2rem'}}></div>
      {txns ? <Table txns={txns} setTxns={setTxns} params={params}/> : null}
    </>
  )
}

export default Ledger;