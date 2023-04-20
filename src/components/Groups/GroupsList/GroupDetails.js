import React, { useEffect } from 'react';
import Actions from './Actions';
import { statusClasses } from './data';

function GroupDetails({
  setGroupDetails,
  groupApiData,
  setGroupsData,
  setGroupId,
  groupDetails
}) {
  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
    if (!groupDetails) {
      setGroupDetails(groupApiData);
    }
  }, []);

  return (
    <div id='loan-details'>
      {groupDetails ? 
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            <div style={{marginBottom:"1rem"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>

                <div style={{display:'flex', alignItems:'center'}}>
                  <span style={{marginRight:"5px"}}><b>{groupDetails.group.group_name}</b></span> /
                  <span style={{margin: "0 5px"}}><b>{groupDetails.group.group_id}</b></span> /
                  <div style={{marginLeft:"5px"}}>
                    <button className={statusClasses[groupDetails.group.status]}>{groupDetails.group.status}</button>
                  </div>
                </div>
                <Actions 
                  group={groupDetails.group} 
                  setGroupDetails={setGroupDetails}
                  setGroupId={setGroupId}
                  setGroupsData={setGroupsData}
                />

              </div>
            </div>
            <div>
              
              <div>Details</div>

            </div>
          </div>
        </div> : null}
    </div>
  )
}

export default GroupDetails;