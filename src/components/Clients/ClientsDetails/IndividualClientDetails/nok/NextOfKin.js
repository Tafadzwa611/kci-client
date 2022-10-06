import React, {useState} from 'react';
import AddNextOfKin from './AddNextOfKin';
import NokRow from './NokRow';

const initialState = {first_name: '', last_name: '', relationship: '', phone_number: '', address: '', ownership: '', city: '', country: '', gender: ''};

function NextOfKin({nokList, setNokList, clientId, client}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddNextOfKin open={open} setOpen={setOpen} clientId={clientId} setNokList={setNokList}/>
            <div style={{marginBottom:"1.5rem"}}>
                {client.status == 'Blacklisted' ?
                    <button type='button' style={{pointerEvents: 'none', opacity: '0.7'}} className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}
                        >Add Next of Kin
                    </button>:
                    <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                        >Add Next of Kin
                    </button>
                }
            </div>
            <div style={{width:"100%", overflowX:"auto"}}>
                <table className='table'>
                    <thead>
                    <tr className="client__address__table">
                        <th className="table-head-dark-color">First Name</th>
                        <th className="table-head-dark-color">Last Name</th>
                        <th className="table-head-dark-color">Gender</th>
                        <th className="table-head-dark-color">Relationship to Applicant</th>
                        <th className="table-head-dark-color">Phone Number</th>
                        <th className="table-head-dark-color">Physical Address</th>
                        <th className="table-head-dark-color">City/Town</th>
                        <th className="table-head-dark-color">Country</th>
                        <th className="table-head-dark-color">Ownership</th>
                        <th className="table-head-dark-color">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nokList.length > 0 ? nokList.map((nok, idx) => <NokRow key={idx} nok={nok} setNokList={setNokList}/>):
                    <tr><td colSpan={10} style={{textAlign: 'center'}}>No data in table.</td></tr>}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default NextOfKin;