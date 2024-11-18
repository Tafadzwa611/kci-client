import React from 'react';

function Table({
  setView,
  units,
  selectedUnit,
  handleClick,
  setUnit,
}) {
  const close = () => setUnit(null);

  return (
    <>
      <div style={{padding:'0', border:'none'}} className={selectedUnit ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={selectedUnit ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                  {selectedUnit ?
                  <th>Name</th>:
                  <>
                    <th>Name</th>
                    <th>Date Created</th>
                  </>}
                </tr>
                {units.map(unit => {
                  return (
                    <tr key={unit.id}>
                      <td>
                        {selectedUnit ? 
                          <span id={unit.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer', ...(unit.id == selectedUnit.id && {color:'red'})}} className='link'>
                            {unit.name}
                          </span> :
                          <span id={unit.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                            {unit.name}
                          </span>}
                      </td>
                      {!selectedUnit &&
                      <>
                        <td>{unit.date_created}</td>
                      </>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {selectedUnit && 
            <div style={{position:'sticky', top:'0', width:'100%'}}>
              <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
                  <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
                    <button><a onClick={close} className="btn btn-default client__details" style={{borderRadius:"0"}}>Close</a></button>
                    <div style={{display:"flex", columnGap: "5px"}}>
                      <button className="btn btn-olive" onClick={() => setView('edit')}>Edit</button>
                    </div>
                  </div>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                      <div style={{width:'100%'}}>
                        <ul>
                          <li style={{marginBottom: '1rem'}}><b>Unit Information</b></li>
                          <li>Name: {selectedUnit.name}</li>
                          <li>Date created: {selectedUnit.date_created}</li>
                          <li>Created by: {selectedUnit.created_by}</li>
                          {selectedUnit.is_active ?
                            <li>Status: <span className="badge badge-success">Active</span></li>:
                            <li>Status: <span className="badge badge-danger">Inactive</span></li>
                          }
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