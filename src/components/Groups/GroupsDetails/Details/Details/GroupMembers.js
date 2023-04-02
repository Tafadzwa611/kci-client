import React, { useState } from 'react';

function GroupMembers({group}) {
  return (
    <div>
        <div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>

                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                    {group.members.map(member => {
                        return (
                        <li>Group Member: {member.fullname}</li>
                        )
                    })}
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}

export default GroupMembers;