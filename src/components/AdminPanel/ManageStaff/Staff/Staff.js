import React, {useState, useRef, useEffect} from 'react';
import {makeRequest} from '../../../../utils/utils';

const Staff = () => {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const pageNum = useRef(1);
    const [nextPageNumber, setNextPageNumber] = useState(null);

    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {
        const data = await fetchUsers();
        setUsers(data.staff);
    };

    async function fetchUsers() {
        try {
            let url = `/usersapi/staff/?page_num=${pageNum.current}`;
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setNextPageNumber(json_res.next_page_num);
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (users == null) {
        return <div>Loading ...</div>;
    } 

    return (
        <>
            {/* <CreateCurrencyModal open={open} setOpen={setOpen} setCurrencies={setCurrencies} /> */}
            <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Staff</button>
            </div>
            <div className="table-responsive font-12">
                <table className="table table-hover">
                    <tbody>
                        <tr className="journal-details header">
                            <th>Full_Name</th>
                            <th>Contact Info</th>
                            <th>Staff_Role</th>
                            <th>Branch</th>
                            <th>Action</th>
                        </tr>  
                        {users.map((user) => (
                            <tr className="table-row" key={user.id}>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.staff_role}</td>
                                <td>{user.branch}</td>
                                <td>
                                    <div className="action-btns">
                                        <span>Reset Password</span>
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

export default Staff;