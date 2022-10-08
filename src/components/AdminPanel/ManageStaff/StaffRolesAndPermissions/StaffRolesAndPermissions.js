import React, {useState, useRef, useEffect} from 'react';
import {makeRequest} from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
import EditStaffRolesPermissions from './EditStaffRolesPermissions';

const StaffRolesAndPermissions = () => {

    const [staffroles, setStaffRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedroleID, setSelectedRoleID] = useState(null)

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

    const handleClick = (e) => {
        setSelectedRoleID(e.target.id)
        setOpen(true)
    }

    if (staffroles == null) {
        return <MiniLoader />;
    } 

    return (
        <>
            <EditStaffRolesPermissions open={open} setOpen={setOpen} selectedroleID={selectedroleID}/>
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
                                    <button type='button' className="btn btn-info" id={role.id} onClick={handleClick}>Set Permissions</button>
                                </td>
                                <td>
                                    <button className="btn btn-default">Edit</button>
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