import React, { useRef } from 'react';
import { MODAL_STATES } from './data';
import EditId from './EditId';

function Identity({client, modal, setModal, setClient}) {
  const ID = useRef(null);

  return (
    <div style={{display:'block'}}>
      {modal === MODAL_STATES.editId && <EditId ID={ID.current} setOpen={setModal} setClient={setClient}/>}
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table' id='clients'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Id Number</th>
                    <th style={{textAlign:'start'}}>Id Template Name</th>
                    <th style={{textAlign:'start'}}>Id Issuer</th>
                    <th style={{textAlign:'start'}}>Id Format</th>
                    <th style={{textAlign:'start'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {client.id_nums.map(id => {
                      return (
                        <tr key={id.id}>
                          <td>{id.id_number}</td>
                          <td>{id.id_template__id_type}</td>
                          <td>{id.id_template__issuer}</td>
                          <td>{id.id_template__template}</td>
                          <td>
                            <button
                            style={{cursor:'pointer'}}
                            className='badge badge-success'
                            onClick={() => {
                              ID.current = id;
                              setModal(MODAL_STATES.editId);
                            }}>
                              Edit
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

export default Identity;