import React, {useState} from 'react';
import Entity from './Entity';
import OverView from './OverView';

function CreateDataExport() {
  const [tab, setTab] = useState('entity');

  return (
    <>
      <div className="bloc-tabs">
        <button className={tab === "entity" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("entity")}> Entity </button>
        <button className={tab === "overview" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("overview")}> Overview </button>
      </div>
      <div className='tab-content font-12' style={{marginTop:"3rem"}}>
        {{
          'entity': <Entity setTab={setTab}/>,
          'overview': <OverView setTab={setTab}/>,
        }[tab]}
      </div>
    </>
  )
}

export default CreateDataExport;
