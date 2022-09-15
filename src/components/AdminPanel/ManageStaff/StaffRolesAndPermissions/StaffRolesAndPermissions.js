import React, {useState, useRef, useEffect} from 'react';
import {makeRequest} from '../../../../utils/utils';

const StaffRolesAndPermissions = () => {

    const [staffroles, setStaffRoles] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getStaffRoles()
    }, []);

    const getStaffRoles = async () => {
        const data = await fetachStaffRoles();
        setStaffRoles(data);
    };

    async function fetachStaffRoles() {
        try {
            let url = '/usersapi/staffroles/';
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (staffroles == null) {
        return <div>Loading ...</div>;
    } 

    return (
        <>
            {/* <CreateCurrencyModal open={open} setOpen={setOpen} setCurrencies={setCurrencies} /> */}
            <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Staff Role</button>
            </div>
            <div className="table-responsive font-12">
                <table className="table table-hover">
                    <tbody>
                        <tr className="journal-details header">
                            <th>Staff_Role_Name</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>  
                        {staffroles.map((role) => (
                            <tr className="table-row" key={role.id}>
                                <td>{role.role}</td>
                                <td>
                                    <button className="btn btn-info">Set Permissions</button>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <span>Edit</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StaffRolesAndPermissions;