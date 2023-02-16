import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import CreateBranchModal from './CreateBranchModal';

const ManageBranches = () => {
    return (
        <Fetcher urls={['/usersapi/branch-list/']}>
            {({data}) => <List data={data[0]} />}
        </Fetcher>
    );
}

export default ManageBranches;

function List({data, currencies}) {
    const [open, setOpen] = useState(false);
    const [branches, setBranches] = useState(data)
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
                            <th>Branch Full Name</th>
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



