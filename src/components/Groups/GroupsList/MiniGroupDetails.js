import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniGroupDetails({groupDetails, extra, setGroupId}) {
  const {setGroupDetails} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setGroupDetails(groupDetails);
  }, []);

  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
            <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
              <button className='btn btn-olive' onClick={() => navigate({pathname: '/groups/viewgroups', search: `?group_id=${groupDetails.id}`})}>
                Max
              </button>
              <div style={{display:"flex", columnGap: "10px"}}>
                <button><a onClick={e => setGroupId(null)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                <button><a className="btn btn-olive" id="delete" value={groupDetails.id} onClick={console.log('delete')}>Delete</a></button>
              </div>
            </div>
        </div>

        <div> 

            <div>Group Details</div>

        </div>
        {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
                <li>Group Name: {groupDetails.expense_name}</li>
                <li>Expense Type: {groupDetails.expense_type}</li>
                <li>Expense Amount: {groupDetails.currency} {groupDetails.expense_amount}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
                <li>Reference: {groupDetails.reference}</li>
                <li>Date Created: {groupDetails.date_created}</li>
                <li>Created By: {groupDetails.created_by}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
                <li>Expense Date: {groupDetails.expense_date}</li>
                <li>Description: {groupDetails.description}</li>
            </ul>
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default MiniGroupDetails;