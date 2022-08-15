import React, {useState} from 'react';
import AddAddress from './AddAddress';
import { makeRequest } from '../../../../../utils/utils';

function ClientAddresses({addresses, setAddresses, clientId}) {
    const [open, setOpen] = useState(false);

    const deleteAddress = async (evt) => {
        try {
            const response = await makeRequest.delete(`/clientsapi/delete_address/${evt.target.id}`, {timeout: 8000});
            if (response.ok) {
                setAddresses(curr => curr.filter(addr => addr.id != evt.target.id));
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <AddAddress open={open} setOpen={setOpen} clientId={clientId} setAddresses={setAddresses}/>
            <div style={{marginBottom:"1.5rem"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                    style={{backgroundColor:"#3d9970", borderColor: "#3d9970"}}>Add Address
                </button>
            </div>

            <table className='table'>
                <thead>
                    <tr className="journal-details header">
                        <th style={{paddingLeft:"0", width:"30%"}}>Address</th>
                        <th style={{paddingLeft:"0"}}>City/Town</th>
                        <th style={{paddingLeft:"0"}}>Country</th>
                        <th style={{paddingLeft:"0"}}>Ownership</th>
                        <th style={{paddingLeft:"0"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {addresses.length > 0 ? addresses.map(addr => {
                    return (
                    <tr key={addr.id}>
                        <td style={{paddingLeft:"0"}}>{addr.address}</td>
                        <td style={{paddingLeft:"0"}}>{addr.city}</td>
                        <td style={{paddingLeft:"0"}}>{addr.country}</td>
                        <td style={{paddingLeft:"0"}}>{addr.ownership}</td>
                        <td style={{paddingLeft:"0"}}>
                        <input id={addr.id} type='button' value='Delete...' onClick={deleteAddress}/>
                        </td>
                    </tr>
                    )
                }): <tr><td colSpan={5} style={{textAlign: 'center'}}>No addresses could be found.</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default ClientAddresses;