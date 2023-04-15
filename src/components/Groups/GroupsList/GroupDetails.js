import React, { useEffect } from 'react';

function GroupDetails({
  groupDetails,
  setGroupDetails,
  groupApiData,
  setGroupsData,
  setGroupId
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

                <div>{groupDetails.group_name}</div>

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