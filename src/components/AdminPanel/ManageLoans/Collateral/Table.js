import React, { useState } from 'react';
import DeleteCollateral from './DeleteCollateral';

function Table({
  collaterals,
  selectedCollateral,
  handleClick,
  setSelectedCollateral,
  setCollaterals
}) {
  const close = () => setSelectedCollateral(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal &&
        <DeleteCollateral
          setOpenModal={setOpenModal}
          setCollaterals={setCollaterals}
          close={close}
          collateralId={selectedCollateral.id}
        />}
      <div style={{padding:'0', border:'none'}} className={selectedCollateral ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={selectedCollateral ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                  <th>Name</th>
                </tr>
                {collaterals.map(collateral => {
                  return (
                    <tr key={collateral.id}>
                      <td>
                        {!selectedCollateral ? 
                        <span id={collateral.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          {collateral.name}
                        </span> :
                        <span id={collateral.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedCollateral.id == collateral.id && {color:'red'})}} className='link'>
                          {collateral.name}
                        </span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {selectedCollateral && 
            <div style={{position:'sticky', top:'0', width:'100%'}}>
              <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
                  <div className='col-12' style={{display:'flex', justifyContent:'space-between'}}>
                    <button><a onClick={close} className='btn btn-default' style={{borderRadius:'0'}}>Close</a></button>
                    <div style={{display:'flex', columnGap: '5px'}}>
                      <button className='btn btn-olive' onClick={() => setOpenModal(true)}>Delete</button>
                    </div>
                  </div>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                      <div style={{width:'100%'}}>
                        <ul>
                          <li style={{marginBottom: '1rem'}}><b>Collateral Information</b></li>
                          <li>Collateral Name: {selectedCollateral.name}</li>
                          <li>Date Added: {selectedCollateral.cdate_created}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Table;