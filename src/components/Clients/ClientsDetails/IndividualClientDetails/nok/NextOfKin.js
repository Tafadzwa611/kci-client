import React, {useState} from 'react';
import AddNextOfKin from './AddNextOfKin';
import NokRow from './NokRow';

const initialState = {first_name: '', last_name: '', relationship: '', phone_number: '', address: '', ownership: '', city: '', country: '', gender: ''};

function NextOfKin({nokList, setNokList, clientId}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddNextOfKin open={open} setOpen={setOpen} clientId={clientId} setNokList={setNokList}/>
            <div style={{marginBottom:"1.5rem"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                    >Add Next of Kin
                </button>
            </div>
            <table className='table'>
                <thead>
                <tr className="journal-details header">
                    <th style={{paddingLeft:"0"}}>First Name</th>
                    <th style={{paddingLeft:"0"}}>Last Name</th>
                    <th style={{paddingLeft:"0"}}>Gender</th>
                    <th style={{paddingLeft:"0"}}>Relationship to Applicant</th>
                    <th style={{paddingLeft:"0"}}>Phone Number</th>
                    <th style={{paddingLeft:"0"}}>Physical Address</th>
                    <th style={{paddingLeft:"0"}}>City/Town</th>
                    <th style={{paddingLeft:"0"}}>Country</th>
                    <th style={{paddingLeft:"0"}}>Ownership</th>
                    <th style={{paddingLeft:"0"}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {nokList.length > 0 ? nokList.map((nok, idx) => <NokRow key={idx} nok={nok} setNokList={setNokList}/>):
                <tr><td colSpan={10} style={{textAlign: 'center'}}>No data in table.</td></tr>}
                </tbody>
            </table>

        </>
    )
}

export default NextOfKin;