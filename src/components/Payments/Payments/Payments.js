import React, {useState} from 'react';
import PaymentsFilter from './PaymentsFilter';
import PaymentsList from './PaymentsList';
import { Fetcher } from '../../../common';

function Payments() {
  const [params, setParams] = useState(null);
  const [dataP, setData] = useState(null);

  return (
    <Fetcher urls={['/usersapi/list_units']}>
      {({data}) => <PaymentsSection units={data[0]} params={params} setParams={setParams} dataP={dataP} setData={setData}/>}
    </Fetcher>
  )
}

const PaymentsSection =({setData, dataP, setParams, params, units})=> {
  return (
    <>
      <PaymentsFilter setData={setData} setParams={setParams} units={units}/>
      <div style={{paddingTop: '2rem'}}></div>
      {dataP ? <PaymentsList data={dataP} params={params} setData={setData}/> : null}
    </>
  )
}

export default Payments;