import React from 'react'

function Details({groupDetails}) {
    return (
        <div className='group__details__main__container'>
            <div className='group__details__first__sub__container'>

                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <li>Group Date: {groupDetails.db_group_date}</li>
                        <li>Group Phone Number: {groupDetails.group_phone_number}</li>
                        <li>Branch: {groupDetails.branch}</li>
                        <li>Group Type: {groupDetails.grp_type}</li>
                        <li>Group Unit: {groupDetails.unit ? groupDetails.unit : 'Not provided'}</li>
                    </ul>
                </div>

                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <li>Group Bank: {groupDetails.group_bank_name}</li>
                        <li>Group Account: {groupDetails.group_account_number}</li>
                        <li>Group Address: {groupDetails.address}</li>
                        <li>Group Officer: {groupDetails.group_officer}</li>
                    </ul>
                </div>

            </div>

            <div className='group__details__second__sub__container'>
                <div className="fees-container">
                    <div style={{marginBottom:"1rem"}}><b>Group Members</b></div>
                    <ul style={{maxHeight:"250px", overflowY:"auto"}}>
                        {groupDetails.members.map(member => {
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
