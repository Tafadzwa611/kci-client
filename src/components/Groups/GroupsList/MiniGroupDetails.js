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

          <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem", width:"74%"}}>

              <div>
                <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                  <li>Group Date: {groupDetails.group.group_date}</li>
                  <li>Group Phone Number: {groupDetails.group.group_phone_number}</li>
                  <li>Branch: {groupDetails.group.branch}</li>
                  <li>Group Type: {groupDetails.group.group_type}</li>
                </ul>
              </div>

              <div>
                <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                  <li>Group Bank: {groupDetails.group.group_bank_name}</li>
                  <li>Group Account: {groupDetails.group.group_account_number}</li>
                  <li>Group Address: {groupDetails.group.address}</li>
                  <li>Group Officer: {groupDetails.group.group_officer}</li>
                </ul>
              </div>

            </div>

            <div style={{width:"24%", marginTop:"1.5rem"}}>
              <div className="fees-container">
                <div style={{marginBottom:"1rem"}}><b>Group Members</b></div>
                <ul style={{maxHeight:"250px", overflowY:"auto"}}>
                  {groupDetails.group.members.map(member => {
                    return (
                      <li className="fees-item" key={member.id}>{member.fullname} ~ {member.role}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MiniGroupDetails;