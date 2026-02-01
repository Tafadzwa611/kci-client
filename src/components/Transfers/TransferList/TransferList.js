import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import TransferDetails from '../TransferDetails/TransferDetails';
import { useSearchParams } from 'react-router-dom';


function TransferList({ transferTypes }) {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState(null);
  const [transferData, setTransferData] = useState({count: 0, next_page_num: 0, transfers: []});

  return (
    <>
      {searchParams.get('transfer_id') ?
      <TransferDetails transferId={searchParams.get('transfer_id')} /> :
      <>
      <Filter setTransferData={setTransferData} setParams={setParams} transferTypes={transferTypes}/>
      <div style={{paddingTop: '2rem'}}></div>
      <Table
        transferData={transferData} 
        setTransferData={setTransferData}
        params={params}
      />
      </>
      }
    </>
  )
}

export default TransferList;