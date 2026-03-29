import React from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pager from './Pager';

function Table({users, setUsers, params}) {

return (
        <>
            <TableHeader users={users} params={params} setUsers={setUsers}/>
            <div style={{padding:"0", border:"none"}} className='table-container full__width font-12'>
                <div className="table-responsive full__table">
                    <>
                    <div style={{display:'block'}}>
                        <div style={{padding:'0', border:'none'}}>
                            <div style={{width:'100%', overflowX:'auto'}}>
                                <div className='table__height'>
                                    <table className='table' id='loans'>
                                        <tbody>
                                            <tr className='journal-details header'>
                                                <th>Full Name</th>
                                                <th>Contact Info</th>
                                                <th>Staff Role</th>
                                                <th>Branch</th>
                                            </tr> 
                                            {users.users.map((user) => (
                                                <tr className='table-row' key={user.id}>
                                                    <td>
                                                    <Link to={`/users/admin/staff/staffdetails/${user.id}`}>{user.first_name} {user.last_name}</Link>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>{user.staff_role__role}</td>
                                                    <td>{user.branch__name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                </div>
            </div>
        </>
    )
}

const TableHeader = ({users, params, setUsers}) => {
    return (
    <div className='table-header'>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
            <Pager
                nextPageNumber={users.next_page_num}
                params={params}
                loadMoreStaff={() => console.log('loadMoreStaff')}
                loadingMore={false}
                prevPageNumber={users.prev_page_num}
                setUsers={setUsers}
            />
            <div style={{marginTop:'6px'}}>Showing {users.users.length} of {users.count} users.</div>
        </div>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
            <div style={{marginTop:'6px'}}>Page {users.number} of {users.num_of_pages}</div>
            <div>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='btn btn-default'
                    table='loans'
                    filename='users'
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
        </div>
    </div>
    )
}

export default Table;