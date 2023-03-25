import React, {useState} from 'react';
import DeleteCat from './DeleteCat';

function Table({
  cats,
  setView,
  selectedCat,
  handleClick,
  setSelectedCat,
  setCats
}) {
  const close = () => setSelectedCat(null);
  const showDetails = selectedCat !== null;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <DeleteCat setOpenModal={setOpenModal} setCats={setCats} close={close} catId={selectedCat.id} />}
      <div style={{padding:'0', border:'none'}} className={showDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={showDetails ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                <th>Name</th>
                </tr>
                {cats.map(cat => {
                  return (
                    <tr key={cat.id}>
                      <td>
                        {!showDetails ? 
                        <span
                          id={cat.id}
                          onClick={handleClick}
                          style={{fontSize:'0.75rem', cursor:'pointer'}}
                          className='link'
                        >
                          {cat.name}
                        </span> :
                        <span
                          id={cat.id}
                          onClick={handleClick}
                          style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedCat.id == cat.id && {color:'red'})}}
                          className='link'
                        >
                          {cat.name}
                        </span>
                      }
                      </td>
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
                          <li style={{marginBottom: '1rem'}}><b>Product Information</b></li>
                          <li>Product Name: {selectedCat.name}</li>
                          {selectedCat.is_active ?
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