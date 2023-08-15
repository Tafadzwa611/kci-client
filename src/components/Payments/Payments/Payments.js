import React, {useState} from 'react';
import PaymentsFilter from './PaymentsFilter';
import PaymentsList from './PaymentsList';

function Payments() {
  const [params, setParams] = useState(null);
  const [data, setData] = useState(null);

  return (
    <>
      <PaymentsFilter setData={setData} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {data ? <PaymentsList data={data} params={params} setData={setData}/> : null}
    </>
  )
}

export default Payments;