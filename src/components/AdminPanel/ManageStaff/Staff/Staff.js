import React from 'react';
import { Link } from 'react-router-dom';
import List from './List';

const Staff = () => {

return (
    <>
        <div style={{margin:'20px 0'}}>
            <button type='button' className='btn btn-success'>
                <Link to='/users/admin/staff/addstaff'>Add Staff</Link>
            </button>
        </div>
        <List />
    </>
)
}

export default Staff;