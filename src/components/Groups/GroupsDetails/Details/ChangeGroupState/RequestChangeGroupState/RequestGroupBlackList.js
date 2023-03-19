import React, { useState , useEffect} from 'react';
import { makeRequest } from '../../../../../../utils/utils';


function RequestGroupBlackList({requestGroupBlacklist, setRequestGroupBlackList}) {

    const [allowedUsers, setAllowedUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const users = await fetchUsers();
        setAllowedUsers(users);
    };

    async function fetchUsers() {
        try {
            const response = await makeRequest.get(`/usersapi/user_perms/?codename=blacklist_client`, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                return json_res
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (allowedUsers === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }


    return (
        <div className={requestGroupBlacklist ? 'modal fade show' : 'modal fade'} style={{display: requestGroupBlacklist ? 'block' : 'none', top:"4rem"}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Send Request ]</label>
                        <button type='button' className='close' onClick={(e) => setRequestGroupBlackList(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body text-light'>

                        <div className='row custom-background' style={{marginBottom:"1.5rem"}}>
                            <label className='form-label'>Select User</label>
                            <div className='col-9'>
                                <select className='custom-select-form'>
                                    <option value=''></option>
                                    {allowedUsers.map(user => {
                                        return <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
        
                    </div>
        
                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={(e) => setRequestGroupBlackList(curr => !curr)}>Close</button>
                        <button type='submit' className='btn btn-info'>
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestGroupBlackList;

