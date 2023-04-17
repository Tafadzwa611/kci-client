import React, {useState} from 'react';
import DeleteHoliday from './DeleteHoliday';
import { useBranches } from '../../../../contexts/BranchesContext';

function Table({
  setView,
  holidays,
  selectedHoliday,
  handleClick,
  setHoliday,
  setHolidays
}) {
  const close = () => setHoliday(null);
  const [openModal, setOpenModal] = useState(false);
  const {branches} = useBranches();

  return (
    <>
      {openModal && <DeleteHoliday setOpenModal={setOpenModal} setHolidays={setHolidays} close={close} holidayId={selectedHoliday.id} />}
      <div style={{padding:'0', border:'none'}} className={selectedHoliday ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={selectedHoliday ? 'table-responsive journal__table-container-journals' : 'table-responsive full__table'}>
          <div className='table__height'>
            <table className='table'>
              <tbody>
                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                  {selectedHoliday ?
                  <th>Description</th>:
                  <>
                    <th>Description</th>
                    <th>Date</th>
                  </>}
                </tr>
                {holidays.map(holiday => {
                  return (
                    <tr key={holiday.id}>
                      <td>
                        {selectedHoliday ? 
                          <span id={holiday.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer', ...(holiday.id == selectedHoliday.id && {color:'red'})}} className='link'>
                            {holiday.description}
                          </span> :
                          <span id={holiday.id} onClick={handleClick} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                            {holiday.description}
                          </span>}
                      </td>
                      {!selectedHoliday &&
                      <>
                        <td>{holiday.holiday_date}</td>
                      </>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {selectedHoliday && 
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
                          <li>Description: {selectedHoliday.description}</li>
                          <li>Holiday Date: {selectedHoliday.holiday_date}</li>
                          <li>Recurring: {selectedHoliday.recurring ? 'Yes': 'No'}</li>
                          <li>Branches:{branches.filter(br => selectedHoliday.branch_ids.includes(br.id)).map(br => ` ${br.name}`)}</li>
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