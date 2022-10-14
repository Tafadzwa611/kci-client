import React, {useEffect, useState} from 'react';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import CreateBranchModal from './CreateBranchModal';

const ManageBranches = () => {

    const [branches, setBranches] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getBranchList()
    }, []);

    const getBranchList = async () => {
        const data = await fetchBranchList();
        setBranches(data);
    };

    async function fetchBranchList() {
        try {
            const response = await makeRequest.get(`/usersapi/branch-list/`, {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return data;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (branches == null) {
        return <MiniLoader />;
    } 

    return (
        <>
            <CreateBranchModal open={open} setOpen={setOpen} setBranches={setBranches} />
            <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Branch</button>
            </div>
            <div className="table-responsive font-12">
                <table className="table">
                    <tbody>
                        <tr className="journal-details header">
                            <th>Branch Full_Name</th>
                        </tr>  
                        {branches.map((branch) => (
                            <tr className="table-row" key={branch.id}>
                                <td>{branch.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManageBranches;