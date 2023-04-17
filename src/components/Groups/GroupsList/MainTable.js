import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function MainTable({groupData, handleClick}) {
  const {groups, count} = groupData;

  return (
    <>
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='groups'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:"start"}}>Group_Name</th>
                    <th style={{textAlign:"start"}}>Group_ID</th>
                    <th style={{textAlign:"start"}}>Group_Type</th>
                    <th style={{textAlign:"start"}}>Group_Date</th>
                    <th style={{textAlign:"start"}}>Group_Phone_Number</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(group => {
                    return (
                      <tr key={group.id}>
                        <td style={{verticalAlign:"middle"}}>{group.group_name}</td>
                        <td style={{verticalAlign:"middle"}}><span onClick={handleClick} id={group.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{group.group_id}</span></td>
                        <td style={{verticalAlign:"middle"}}>{group.group_type}</td>
                        <td style={{verticalAlign:"middle"}}>{group.group_date}</td>
                        <td style={{verticalAlign:"middle"}}>{group.group_phone_number}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainTable;