import React from 'react';

function MiniTable({groupData, handleClick, selectedGroupId}) {
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
                    <th>Group_Name</th>
                    <th>Group_ID</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(group => {
                    return (
                      <tr className='tr-class' key={group.id}>
                        <td>
                            {group.group_name}
                        </td>
                        <td>
                          {(selectedGroupId==group.id) ?
                            <span onClick={handleClick} id={group.id} style={{fontSize:'0.75rem', cursor:'pointer', color: 'red'}} className='link'>{group.group_id}</span>:
                            <span onClick={handleClick} id={group.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{group.group_id}</span>
                          }
                        </td>
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

export default MiniTable;