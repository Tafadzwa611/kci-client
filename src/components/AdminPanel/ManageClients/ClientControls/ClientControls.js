import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
import UpdateClientControls from './UpdateClientControls';
import AddClientControl from './AddClientControl';

const ClientControls = () => {

    const [clientcontrol, setClientContol] = useState([])
    const [open, setOpen] = useState(false);
    const [openupdate, setOpenUpdate] = useState(false);
    const [selectedClientControlId, setSelectedClientControlID] = useState(null);


    useEffect(() => {
        getClientControl();
    }, []);

    const getClientControl = async () => {
        document.title = 'Manage Clients';
        const data = await fetchClientControl();
        setClientContol(data);
    };

    async function fetchClientControl() {
        try {
            const response = await makeRequest.get(`/clientsapi/client_controls/`, {timeout: 8000});
            if (response.ok) {
                const controls = await response.json();
                setSelectedClientControlID(controls.map(control => control.id)[0])
                return controls;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    const openUpdateClick = (e) => {
        setOpenUpdate(curr => !curr);
    }

    if (clientcontrol == null) {
        return <MiniLoader />;
    } 
    else {
        return (
            <>
                {openupdate &&
                    <UpdateClientControls 
                        openupdate={openupdate}
                        setOpenUpdate={setOpenUpdate}
                        selectedClientControlId={selectedClientControlId}
                        setClientContol={setClientContol}
                    />
                }
                {open &&
                    <AddClientControl 
                        open={open}
                        setOpen={setOpen}
                        setClientContol={setClientContol}
                    />
                }
                {clientcontrol == "" && 
                    <div style={{margin:"20px 0"}}>
                        <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Client Controls</button>
                    </div>
                }
                <div className="table-responsive font-12">
                    <table className="table">
                        <tbody>
                            <tr className="journal-details header">
                                <th>Client Initial Status</th>
                                <th>Edit</th>
                            </tr>    
                            {clientcontrol.map((control) => (
                                <tr className="table-row" key={control.id}>
                                    <td>{control.client_initial_status}</td>
                                    <td><button className="btn btn-default" onClick={openUpdateClick} id={control.id}>Edit</button></td>
                                </tr>
                            ))}
                            {clientcontrol == "" && 
                                <tr style={{display:"flex", justifyContent:"center"}}>
                                    <td>No data available.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );

    }
}

export default ClientControls;