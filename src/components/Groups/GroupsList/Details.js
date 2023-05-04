import React from 'react'

function Details({groupDetails}) {
    return (
        <div style={{display:"flex", width:"100%", justifyContent:"space-between"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem", width:"74%"}}>

                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <li>Group Date: {groupDetails.group.grou_date}</li>
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
                                <li className="fees-item" key={member.client_id}>{member.fullname} ~ {member.role}</li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Details
