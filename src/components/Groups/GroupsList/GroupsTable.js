import React from 'react';
import Group from '../GroupsDetails/Group';
import { convertDate, getAge } from '../../Accounting/Journals/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function GroupsTable({groups, totalCount, setDetails, details, setSelectedGroupID, selectedGroupID, selectedgroup}) {

  const handleClick = (e) => {
    setSelectedGroupID(e.target.id)
    if (e.target.id != selectedGroupID){
      setDetails(true);
    }else{
      setDetails(curr => !curr)
    }
  }

  return (
    <>
      <div className="table-header">
        <div>
          Showing {groups.length} of {totalCount} groups.
        </div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='groups'
            filename='Groups'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
      <div style={details ? {display:"grid", gridTemplateColumns:"1fr 3fr", columnGap:"1rem"} : {display:"block"}}>
        <div style={{padding:"0", border:"none"}}>
          <div style={{width:"100%", overflowX:"auto"}}>
            <div className="table__height">
              <table className="table" id='groups'>
                <thead>
                    {details ?
                      <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                        <th style={{textAlign:"start"}}>Group_Name</th>
                      </tr>:
                      <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                        <th style={{textAlign:"start"}}>Group_Number</th>
                        <th style={{textAlign:"start"}}>Group_Name</th>
                        <th style={{textAlign:"start"}}>Group_Contact</th>
                        <th style={{textAlign:"start"}}>Registration_Date</th>
                        <th style={{textAlign:"start"}}>Group_Date</th>
                        <th style={{textAlign:"start"}}>Branch</th>
                      </tr>
                    }
                </thead>
                <tbody>
                  {groups.length > 0 ? groups.map(group => {
                    if (details) {
                        if (selectedgroup.id == group.id) {
                            return (
                                <tr key={group.id}>
                                    <td><span onClick={handleClick} id={group.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{group.group_name}</span></td>
                                </tr>
                            )
                        }else{
                            return (
                                <tr key={group.id}>
                                    <td><span onClick={handleClick} id={group.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{group.group_name}</span></td>
                                </tr>
                            )
                        }
                    }else { 
                        return (
                          <tr key={group.id}>
                            <td><span onClick={handleClick} id={group.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{group.group_id}</span></td>
                            <td>{group.group_name}</td>
                            <td>{group.group_phone_number}</td>
                            <td>{convertDate(group.registration_date)}</td>  
                            <td>{convertDate(group.group_date)}</td>
                            <td>{group.branch}</td>
                          </tr>
                        )
                    }
                }) : <tr><td colSpan={8} style={{textAlign: 'center'}}>No groups could be found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
            {details && (
              <div style={{position:"sticky", top:"0", width:"100%"}}>
                  <div className="j-details-container" style={{padding:"1.5rem"}}>

                    <Group selectedGroupID={selectedGroupID} setDetails={setDetails} />

                  </div>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default GroupsTable;