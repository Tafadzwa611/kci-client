import React from 'react';
import Client from '../ClientsDetails/Client';
import { convertDate, getAge } from '../../Accounting/Journals/utils';

function ClientsTable({clients, totalCount, setDetails, details, setSelectedClientID, selectedclientID, selectedclient}) {

  const handleClick = (e) => {
    setSelectedClientID(e.target.id)
    if (e.target.id != selectedclientID){
      setDetails(true);
    }else{
      setDetails(curr => !curr)
    }
  }

  return (
    <div style={details ? {display:"grid", gridTemplateColumns:"1fr 3fr", columnGap:"1rem"} : {display:"block"}}>
      <div style={{padding:"0", border:"none"}}>
        <div style={{width:"100%", overflowX:"auto"}}>
          <div className="table__height">
            <table className="table">
              <thead>
                  {details ?
                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                      <th style={{textAlign:"start"}}>Full_Name</th>
                    </tr>:
                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                      <th style={{textAlign:"start"}}>Client_Number</th>
                      <th style={{textAlign:"start"}}>Full_Name</th>
                      <th style={{textAlign:"start"}}>Type_Of_client</th>
                      <th style={{textAlign:"start"}}>Contact</th>
                      <th style={{textAlign:"start"}}>Gender</th>
                      <th style={{textAlign:"start"}}>Registration_Date</th>
                      <th style={{textAlign:"start"}}>Date_Of_Birth</th>
                      <th style={{textAlign:"start"}}>Branch</th>
                    </tr>
                  }
              </thead>
              <tbody>
                {clients.length > 0 ? clients.map(client => {
                  if (details) {
                      if (selectedclient.id == client.id) {
                          return (
                              <tr key={client.id}>
                                  <td><span onClick={handleClick} id={client.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{client.fullname}</span></td>
                              </tr>
                          )
                      }else{
                          return (
                              <tr key={client.id}>
                                  <td><span onClick={handleClick} id={client.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{client.fullname}</span></td>
                              </tr>
                          )
                      }
                  }else { 
                      return (
                        <tr key={client.id}>
                          <td><span onClick={handleClick} id={client.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{client.client_id}</span></td>
                          <td>{client.fullname}</td>
                          <td>{client.type_of_client}</td>
                          <td>{client.phone_number}</td>
                          <td>{client.gender}</td>
                          <td>{convertDate(client.registration_date)}</td>  
                          <td>{convertDate(client.date_of_birth)} <em>({getAge(client.date_of_birth)} years)</em></td>
                          <td>{client.branch}</td>
                        </tr>
                      )
                  }
              }) : <tr><td colSpan={8} style={{textAlign: 'center'}}>No clients could be found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
          {details && (
            <div style={{position:"sticky", top:"0", width:"100%"}}>
                <div className="j-details-container" style={{padding:"1.5rem"}}>

                  <Client selectedclientID={selectedclientID} setDetails={setDetails} />

                </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default ClientsTable;