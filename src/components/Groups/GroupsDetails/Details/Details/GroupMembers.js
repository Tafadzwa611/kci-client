import React, { useState } from 'react';

function GroupMembers({group}) {
  return (
    <div>
        <div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>

                <div style={{display:"flex", columnGap:"1rem"}}>
                    <div style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        {group.members.map(member => {
                            return (
                            <div key={member.id}>Group Member: {member.fullname}</div>
                            )
                        })}
                    </div>
                    <div style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        {group.roles.map((role, index) => {
                            return (
                            <div key={index}>Group Member Role: {role.name}</div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default GroupMembers;