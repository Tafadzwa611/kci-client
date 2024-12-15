import React, { useRef } from 'react';
import DeleteNok from './DeleteNok';
import AddNok from './AddNok';
import EditNok from './EditNok';
import { MODAL_STATES } from './data';

function Nok({client, setClient, modal, setModal}) {
  const nokId = useRef(null);

  return (
    <div style={{display:'block'}}>
      {modal === MODAL_STATES.addNok && <AddNok clientId={client.id} setOpen={setModal} setClient={setClient}/>}
      {modal === MODAL_STATES.editNok && <EditNok client={client} setOpen={setModal} setClient={setClient} nokId={nokId.current}/>}
      {modal === MODAL_STATES.deleteNok && <DeleteNok nokId={nokId.current} setOpen={setModal} setClient={setClient}/>}
      <div style={{margin: '20px 0'}}>
        <button type='button' className='btn btn-success' onClick={() => setModal(MODAL_STATES.addNok)}>Add Next Of Kin</button>
      </div>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Name</th>
                    <th style={{textAlign:'start'}}>Relationship</th>
                    <th style={{textAlign:'start'}}>Phone_Number</th>
                    <th style={{textAlign:'start'}}>Address</th>
                    <th style={{textAlign:'start'}}>City</th>
                    <th style={{textAlign:'start'}}>Country</th>
                    <th style={{textAlign:'start'}}>Ownership</th>
                    <th style={{textAlign:'start'}}>Gender</th>
                    <th style={{textAlign:'start'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {client.next_of_kin_list.map(nok => {
                      return (
                        <tr key={nok.id}>
                          <td>{`${nok.first_name} ${nok.last_name}`}</td>
                          <td>{nok.relationship}</td>
                          <td>{nok.phone_number}</td>
                          <td>{nok.address}</td>
                          <td>{nok.city}</td>
                          <td>{nok.ownership}</td>
                          <td>{nok.country}</td>
                          <td>{nok.gender}</td>
                          <td>
                            <button
                              style={{cursor:'pointer'}}
                              className='badge badge-success'                              
                              onClick={() => {
                                nokId.current = nok.id;
                                setModal(MODAL_STATES.editNok);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              style={{cursor:'pointer'}}
                              className='badge badge-danger'                              
                              onClick={() => {
                                nokId.current = nok.id;
                                setModal(MODAL_STATES.deleteNok);
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nok