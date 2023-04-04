import React, {useState} from 'react';
// import DeleteExpType from './DeleteExpType';

function Table({
  expTypes,
  setView,
  setSelectedExpType,
  handleClick,
  selectedExpType,
  setExpTypes
}) {
  const close = () => setSelectedExpType(null);
  const showDetails = selectedExpType !== null;
  const [openModal, setOpenModal] = useState(false);

  console.log(selectedExpType)

  return (
    <>
      {/* {openModal && <DeleteExpType setOpenModal={setOpenModal} setExpTypes={setExpTypes} close={close} catId={selectedExpType.id} />} */}
      <div style={{padding:'0', border:'none'}} className={showDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={showDetails ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                  <th>Name</th>
                  {!showDetails &&
                    <th>Currency</th>
                  }
                </tr>
                {expTypes.map(exp => {
                  return (
                    <tr key={exp.id}>
                      <td>
                        {!showDetails ? 
                        <span
                          id={exp.id}
                          onClick={handleClick}
                          style={{fontSize:'0.75rem', cursor:'pointer'}}
                          className='link'
                        >
                          {exp.name}
                        </span> :
                        <span
                          id={exp.id}
                          onClick={handleClick}
                          style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedExpType.id == exp.id && {color:'red'})}}
                          className='link'
                        >
                          {exp.name}
                        </span>
                      }
                      </td>
                      {!showDetails &&
                        <td>
                          {exp.currency__shortname}
                        </td>
                      }
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {showDetails && 
            <div style={{position:'sticky', top:'0', width:'100%'}}>
              <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                <div className='row' style={{marginBottom:'1.5rem', marginTop:'0'}}>
                  <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
                    <button><a onClick={close} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                    <div style={{display:"flex", columnGap: "5px"}}>
                      {/* <button className="btn btn-olive" onClick={() => setView('edit')}>Edit</button> */}
                      {/* <button className="btn btn-olive" onClick={() => setOpenModal(true)}>Delete</button> */}
                    </div>
                  </div>
                </div>
                <div style={{display:'flex', columnGap:'1%'}}>
                  <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
                      <div style={{width:'100%'}}>
                        <ul>
                          <li style={{marginBottom: '1rem'}}><b>Expense Type Information</b></li>
                          <li>Expense Type Name: {selectedExpType.name}</li>
                          <li>Date of Account: {selectedExpType.date_of_account}</li>
                          <li>Date Created: {selectedExpType.date_created}</li>
                          <li>Currency: {selectedExpType.currency__shortname}</li>
                          {selectedExpType.is_active ?
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