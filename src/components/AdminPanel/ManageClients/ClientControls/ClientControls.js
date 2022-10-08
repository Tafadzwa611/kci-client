import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
// import CreateExpenseTypeModal from './CreateExpenseTypeModal';\
// import UpdateClientControls from './UpdateClientControls';

const ClientControls = () => {

    const [clientcontrol, setClientContol] = useState([])
    const [open, setOpen] = useState(false);
    const [openupdate, setOpenUpdate] = useState(false);
    const [control, setControl] = useState(null);
    const [controldetail, setControlDetail] = useState(null);
    const [clientControlId, setClientControlId] = useState(null)

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
                setClientControlId(controls.map(control => control.id)[0])
                return controls;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (clientcontrol == null) {
        return <MiniLoader />;
    } 
    else {
        return (
            <>
                {/* <CreateExpenseTypeModal open={open} setOpen={setOpen} setClientContol={setClientContol} /> */}
                {/* <UpdateClientControls 
                    openupdate={openupdate} 
                    setOpenUpdate={setOpenUpdate} 
                    clientControlId={clientControlId} 
                    setControl={setControl}
                    control={control}
                    setControlDetail={setControlDetail}
                    controldetail={controldetail}
                /> */}
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
                                    <td><button className="btn btn-default">Edit</button></td>
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