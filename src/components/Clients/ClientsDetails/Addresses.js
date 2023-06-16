import React, { useRef } from 'react';
import DeleteAddress from './DeleteAddress';
import AddAddress from './AddAddress';
import { MODAL_STATES } from './data';

function Addresses({client, setClient, modal, setModal}) {
  const addrId = useRef(null);

  return (
    <div style={{display:'block'}}>
      {modal === MODAL_STATES.deleteAddr && <DeleteAddress addrId={addrId.current} setOpen={setModal} setClient={setClient}/>}
      {modal === MODAL_STATES.addAddr && <AddAddress clientId={client.id} setOpen={setModal} setClient={setClient}/>}
      <div style={{margin:"20px 0"}}>
        <button type='button' className='btn btn-success' onClick={() => setModal(MODAL_STATES.addAddr)}>Add Address</button>
      </div>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Ownership</th>
                    <th style={{textAlign:'start'}}>Address</th>
                    <th style={{textAlign:'start'}}>City</th>
                    <th style={{textAlign:'start'}}>Country</th>
                    <th style={{textAlign:'start'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {client.address_list.map(addr => {
                      return (
                        <tr key={addr.id}>
                          <td>{addr.ownership}</td>
                          <td>{addr.address}</td>
                          <td>{addr.city}</td>
                          <td>{addr.country}</td>
                          <td>
                            <button
                            style={{cursor:'pointer'}}
                            className='badge badge-danger'
                            onClick={() => {
                              addrId.current = addr.id;
                              setModal(MODAL_STATES.deleteAddr);
                            }}>
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

export default Addresses;