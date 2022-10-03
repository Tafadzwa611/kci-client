import React, {useState} from 'react';
import AddAddress from './AddAddress';
import { makeRequest } from '../../../../../utils/utils';

function ClientAddresses({client, addresses, setAddresses, clientId}) {
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
                {client.status == 'Blacklisted' ?
                    <button type='button' style={{pointerEvents: 'none', opacity: '0.7'}} className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                        >Add Address
                    </button>:
                    <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)} 
                        >Add Address
                    </button>
                }
            </div>

            <table className='table'>
                <thead>
                    <tr className="client__address__table">
                        <th className="table-head-dark-color" style={{width:"30%"}}>Address</th>
                        <th className="table-head-dark-color">City/Town</th>
                        <th className="table-head-dark-color">Country</th>
                        <th className="table-head-dark-color">Ownership</th>
                        <th className="table-head-dark-color">Action</th>
                    </tr>
                </thead>
                <tbody>
                {addresses.length > 0 ? addresses.map(addr => {
                    return (
                    <tr key={addr.id}>
                        <td>{addr.address}</td>
                        <td>{addr.city}</td>
                        <td>{addr.country}</td>
                        <td>{addr.ownership}</td>
                        <td>
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