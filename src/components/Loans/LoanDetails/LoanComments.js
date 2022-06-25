import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../Modal';

const LoanComments = () => {

    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <div>
            <div style={{margin:"20px 0"}}>
                <button className="btn bg-gray"><NavLink className="loan_details_tab_btns" to="/addloancomments">Add Comment</NavLink></button>
            </div>
                <div className='table-responsive' style={{marginTop:"20px"}}>
                <table className='table table-centered'>
                    <thead className="thead-light">
                        <tr>
                            <th>Date Added</th>
                            <th>Added By</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11/12/22</td>
                            <td>Tamuka Mutinhima</td>
                            <td>God is amazing always</td>
                            <td className="receipt-btns">
                                <small class="badge badge-success edit-payment">edit</small>
                                <small class="badge badge-danger delete-payment" onClick={showOpenModal}>delete</small>
                            </td>
                            {openModal && <Modal closeModal={setOpenmodal}/>}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoanComments;