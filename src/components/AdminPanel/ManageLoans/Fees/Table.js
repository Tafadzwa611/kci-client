import React, {useState} from 'react';
import DeleteFee from './DeleteFee';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';

function Table({
  fees,
  setView,
  selectedFee,
  handleClick,
  setSelectedFee,
  setFees
}) {
  const close = () => setSelectedFee(null);
  const [openModal, setOpenModal] = useState(false);
  const {currencies} = useCurrencies();

  return (
    <>
      {openModal && <DeleteFee setOpenModal={setOpenModal} setFees={setFees} close={close} feeId={selectedFee.id} />}
      <div style={{padding:'0', border:'none'}} className={selectedFee ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={selectedFee ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                  {selectedFee ?
                  <th>Name</th>:
                  <>
                    <th>Name</th>
                    <th>Fee Type</th>
                    <th>Fee Payment</th>
                    <th>Required</th>
                  </>}
                </tr>
                {fees.map(fee => {
                  return (
                    <tr key={fee.id}>
                      <td>
                        {!selectedFee ? 
                        <span id={fee.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                          {fee.name}
                        </span> :
                        <span id={fee.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedFee.id == fee.id && {color:'red'})}} className='link'>
                          {fee.name}
                        </span>}
                      </td>
                      {!selectedFee &&
                      <>
                        <td>{fee.fee_type}</td>
                        <td>{fee.fee_calculation}</td>
                        <td>{fee.is_mandatory ? 'Yes': 'No'}</td>
                      </>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {selectedFee && 
            <div style={{position:'sticky', top:'0', width:'100%'}}>
              <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
                  <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
                    <button><a onClick={close} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                    <div style={{display:"flex", columnGap: "5px"}}>
                      <button className="btn btn-olive" onClick={() => setView('edit')}>Edit</button>
                      <button className="btn btn-olive" onClick={() => setOpenModal(true)}>Delete</button>
                    </div>
                  </div>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                      <div style={{width:'100%'}}>
                        <ul>
                          <li style={{marginBottom: '1rem'}}><b>Fee Information</b></li>
                          <li>Fee Name: {selectedFee.name}</li>
                          <li>Fee Type: {selectedFee.fee_type}</li>
                          <li>Fee Payment: {selectedFee.fee_calculation}</li>
                          <li>Required: {selectedFee.is_mandatory ? 'Yes': 'No'}</li>
                          <li>Currency: {currencies.find(curr => curr.id == selectedFee.currency_id).fullname}</li>
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