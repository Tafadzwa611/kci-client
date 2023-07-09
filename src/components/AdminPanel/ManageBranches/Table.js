import React, {useState} from 'react';

function Table({
  branchData,
  setView,
  handleClick,
  selectedBranch,
  showDetails,
  setShowDetails,
}) {
  const close = () => {
    setShowDetails(false);
  }
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div style={{padding:'0', border:'none'}} className={showDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={showDetails ? 'journal__table-container-journals' : 'full__table'}>
          <div className="table-responsive">
            <div className='table__height'>
              <table className='table'>
                <tbody>
                  <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                    <th>Branch FullName</th>
                  </tr>
                  {branchData.map(branch => {
                    return (
                      <tr key={branch.id}>
                        <td>
                          {!showDetails ? 
                          <span
                            id={branch.id}
                            onClick={handleClick}
                            style={{fontSize:'0.75rem', cursor:'pointer'}}
                            className='link'
                          >
                            {branch.name}
                          </span> :
                          <span
                            id={branch.id}
                            onClick={handleClick}
                            style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedBranch.id == branch.id && {color:'red'})}}
                            className='link'
                          >
                            {branch.name}
                          </span>
                        }
                        </td>
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
                    <button><a onClick={close} className="btn btn-default client__details" style={{borderRadius:"0"}}>Close</a></button>
                  </div>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                      <div style={{width:'100%'}}>
                        <ul>
                          <li style={{marginBottom: '1rem'}}><b>Branch Details</b></li>
                          <li>Branch FullName: {selectedBranch.name}</li>
                          <li>Branch Code: {selectedBranch.branch_code}</li>
                          <li>Geographical Location: {selectedBranch.geographical_location}</li>
                          <li>Registration Date: {selectedBranch.registration_date}</li>
                          <li>Date of Opening: {selectedBranch.date_of_opening}</li>
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