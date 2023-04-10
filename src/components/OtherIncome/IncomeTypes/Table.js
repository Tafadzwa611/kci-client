import React, {useState} from 'react';
import DeleteIncType from './DeleteIncType';

function Table({
  incTypes,
  setView,
  setSelectedIncType,
  handleClick,
  selectedIncType,
  showDetails,
  setShowDetails,
  setIncomeTypeData
}) {
  const close = () => {
    setShowDetails(false);
  }
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <DeleteIncType setOpenModal={setOpenModal} setShowDetails={setShowDetails} incTypeId={selectedIncType.id} setIncomeTypeData={setIncomeTypeData} />}
      <div style={{padding:'0', border:'none'}} className={showDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={showDetails ? 'journal__table-container-journals' : 'full__table'}>
          <div className="table-responsive">
            <div className='table__height'>
              <table className='table'>
                <tbody>
                  <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                    <th>Name</th>
                    {!showDetails &&
                      <th>Currency</th>
                    }
                  </tr>
                  {incTypes.map(inc => {
                    return (
                      <tr key={inc.id}>
                        <td>
                          {!showDetails ? 
                          <span
                            id={inc.id}
                            onClick={handleClick}
                            style={{fontSize:'0.75rem', cursor:'pointer'}}
                            className='link'
                          >
                            {inc.name}
                          </span> :
                          <span
                            id={inc.id}
                            onClick={handleClick}
                            style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedIncType.id == inc.id && {color:'red'})}}
                            className='link'
                          >
                            {inc.name}
                          </span>
                        }
                        </td>
                        {!showDetails &&
                          <td>
                            {inc.currency__shortname}
                          </td>
                        }
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            </div>
          {showDetails && 
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
                          <li style={{marginBottom: '1rem'}}><b>Other Income Type Information</b></li>
                          <li>Other Income Type Name: {selectedIncType.name}</li>
                          <li>Date of Account: {selectedIncType.date_of_account}</li>
                          <li>Date Created: {selectedIncType.date_created}</li>
                          <li>Currency: {selectedIncType.currency__shortname}</li>
                          <li>Created By: {selectedIncType.created_by__first_name} {selectedIncType.created_by__last_name}</li>
                          {selectedIncType.is_active ?
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