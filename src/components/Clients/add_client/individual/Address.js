import React, {useState, useEffect, useRef} from 'react';
import AddAddress from './AddAddress';
import SingleAddress from './SingleAddress';
import UpdateAddress from './UpdateAddress';

function Address({addrList, setAddrList, setTab}) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [addrToUpdate, setAddrToUpdate] = useState({address: '', ownership: '', city: '', country: ''});
  const isFirstRun = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if (!isFirstRun.current) {
      setOpenUpdate(curr => !curr);
    }
  }, [addrToUpdate]);

  return (
    <>
      <div className='text-light'>
        <AddAddress open={open} setOpen={setOpen} setAddrList={setAddrList}/>
        {openUpdate && <UpdateAddress open={openUpdate} setOpen={setOpenUpdate} addr={addrToUpdate} setAddr={setAddrToUpdate} addrList={addrList} setAddrList={setAddrList}/>}
        Note* At least one address is required.
        <div className='row' style={{margin: '15px 0'}}>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Address</button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container client_address">
            <div className='table-responsive'>
            <table className='table' id='chart' style={{width:"100%"}}>
                <thead>
                <tr className="client_address_thead">
                    <th>Address</th>
                    <th>City/Town</th>
                    <th>Country</th>
                    <th>Ownership</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {addrList.length > 0 ? addrList.map((addr, idx) => <SingleAddress key={idx} isFirstRun={isFirstRun} addr={addr} setAddrList={setAddrList} setAddrToUpdate={setAddrToUpdate}/>):
                <tr className="client_address_body" style={{borderTop:"0"}}><td colSpan={9} style={{textAlign: 'center'}}>No data in table.</td></tr>}
                </tbody>
            </table>
            </div>
        </div>

      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('info')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('emp')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default Address;