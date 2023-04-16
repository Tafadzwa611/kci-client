import React, { useEffect } from 'react';
import { statusClasses } from './data';
import Actions from './Actions';
import { useNavigate } from 'react-router-dom';

function MiniGroupDetails({groupData, extra}) {
  const {groupDetails, setGroupDetails, setGroupId, setGroupsData} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setGroupDetails(groupData);
  }, []);

  if (!groupDetails) {
    return <div>Loading</div>
  }


  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

        <div style={{marginBottom:"1rem"}}>
          <div style={{marginBottom:"1rem", display:"flex", justifyContent:"space-between"}}>
            <button><a onClick={e => setGroupId(null)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
            <button className='btn btn-default' onClick={() => navigate({pathname: '/groups/viewgroups', search: `?group_id=${groupDetails.group.id}`})}>
              Max
            </button>
          </div>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <span style={{marginRight:"5px"}}><b>{groupDetails.group.group_name}</b></span> /
              <span style={{margin: "0 5px"}}><b>{groupDetails.group.group_id}</b></span> /
              <div style={{marginLeft:"5px"}}>
                <button className={statusClasses[groupDetails.group.status]}>{groupDetails.group.status}</button>
              </div>
            </div>
            {/* <button><a className="btn btn-olive" id="delete" value={groupDetails.id} onClick={console.log('delete')}>Delete</a></button> */}
            <Actions 
              group={groupDetails.group} 
              setGroupDetails={setGroupDetails}
              setGroupId={setGroupId}
              setGroupsData={setGroupsData}
            />
          </div>
        </div>
        <div> 

          <div>Group Details</div>

        </div>

      </div>
    </div>
  )
}

export default MiniGroupDetails;