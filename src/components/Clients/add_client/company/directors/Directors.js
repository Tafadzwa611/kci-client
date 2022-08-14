import React, {useState, useEffect, useRef} from 'react';
import AddDir from './AddDir';
import DirRow from './DirRow';
import UpdateDir from './UpdateDir';

const initialState = {first_name: '', last_name: '', identification_number: '', phone_number: '', gender: '', date_of_birth: ''};

function Directors({dirList, setDirList, setTab}) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dirToUpdate, setDirToUpdate] = useState(initialState);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current) {
      setOpenUpdate(curr => !curr);
    }
  }, [dirToUpdate]);

  return (
    <>
      <div className='text-light'>
      <AddDir open={open} setOpen={setOpen} setDirList={setDirList}/>
      {openUpdate && <UpdateDir open={openUpdate} dir={dirToUpdate} setDir={setDirToUpdate} dirList={dirList} setDirList={setDirList}/>}

        <div className='row' style={{margin: '15px 0'}}>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Director</button>
              </div>
            </div>
          </div>
        </div>

        <div className="table-container" style={{padding:"0", border:"none"}}>
            <div className='table-responsive' style={{marginTop: '15px'}}>
            <table className='table' style={{width:"100%"}}>
                <thead>
                <tr className="journal-details header">
                    <th style={{border:"none"}}>First Name</th>
                    <th style={{border:"none"}}>Last Name</th>
                    <th style={{border:"none"}}>Identification Number</th>
                    <th style={{border:"none"}}>Phone Number</th>
                    <th style={{border:"none"}}>Gender</th>
                    <th style={{border:"none"}}>Date Of Birth</th>
                    <th style={{border:"none"}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {dirList.length > 0 ? dirList.map((director, idx) => <DirRow key={idx} director={director} setDirToUpdate={setDirToUpdate} isFirstRun={isFirstRun} setDirList={setDirList}/>):
                <tr style={{borderTop:"0"}}><td colSpan={7} style={{textAlign: 'center'}}>No data in table.</td></tr>}
                </tbody>
            </table>
            </div>
        </div>
      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('binfo')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('bnk')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default Directors;