import React, { useState } from 'react';
import Filter from './Filter';
import Table from './Table';

function AuditTrail() {
  const [trail, setTrail] = useState(null);
  const [params, setParams] = useState(null);

  return (
    <div>
      <Filter setTrail={setTrail} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {trail ? <Table trail={trail} setTrail={setTrail} params={params}/> : null}
    </div>
  )
}

export default AuditTrail;