
import React, {useState, useEffect, useRef} from 'react';
import AddNextOfKin from './AddNextOfKin';
import NokRow from './NokRow';
import UpdateNextOfKin from './UpdateNextOfKin';

const initialState = {first_name: '', last_name: '', relationship: '', phone_number: '', address: '', ownership: '', city: '', country: '', gender: ''};

function NextOfKin({nokList, setNokList, setTab}) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [nokToUpdate, setNokToUpdate] = useState(initialState);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      setOpenUpdate(curr => !curr);
    }
  }, [nokToUpdate]);

  return (
    <>
      <div className='text-light'>
        <AddNextOfKin open={open} setOpen={setOpen} setNokList={setNokList}/>
        {openUpdate && <UpdateNextOfKin open={openUpdate} nok={nokToUpdate} setNok={setNokToUpdate} nokList={nokList} setNokList={setNokList}/>}
        <div className='row' style={{margin: '15px 0'}}>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Next of Kin</button>
              </div>
            </div>
          </div>
        </div>

        <div className="table-container" style={{padding:"0", border:"none"}}>
            <div className='table-responsive'>
                <table className='table' id='chart' style={{width:"100%"}}>
                    <thead>
                        <tr className="journal-details header">
                            <th style={{border:"none"}}>First_Name</th>
                            <th style={{border:"none"}}>Last_Name</th>
                            <th style={{border:"none"}}>Gender</th>
                            <th style={{border:"none"}}>Relationship_to_Applicant</th>
                            <th style={{border:"none"}}>Phone_Number</th>
                            <th style={{border:"none"}}>Physical_Address</th>
                            <th style={{border:"none"}}>City/Town</th>
                            <th style={{border:"none"}}>Country</th>
                            <th style={{border:"none"}}>Ownership</th>
                            <th style={{border:"none"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nokList.length > 0 ? nokList.map((nok, idx) => <NokRow key={idx} setNokToUpdate={setNokToUpdate} isFirstRun={isFirstRun} nok={nok} setNokList={setNokList}/>):
                        <tr style={{borderTop:"0"}}><td colSpan={10} style={{textAlign: 'center'}}>No data in table.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('bnk')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('files')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default NextOfKin;