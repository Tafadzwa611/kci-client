import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Table from './Table';

function AuditTrail() {
  const [trail, setTrail] = useState(null);
  const [params, setParams] = useState(null);
  const [trailID, setTrailId] = useState(null);
  const [selectedTrail, setSelectedTrail] = useState([]);

  useEffect(() => {
    if (trailID !== null) {
      const selectedtrl=trail.entries.find(trl => trl.id == trailID)
      setSelectedTrail(selectedtrl);
    }
  }, [trailID]);

  return (
    <div>
      <Filter setTrail={setTrail} setParams={setParams}/>
      <div style={{paddingTop: '2rem'}}></div>
      {trail ? <Table trail={trail} setTrail={setTrail} setTrailId={setTrailId} trailID={trailID} selectedTrail={selectedTrail} params={params}/> : null}
    </div>
  )
}

export default AuditTrail;