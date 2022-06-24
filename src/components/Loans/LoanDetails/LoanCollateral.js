import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../Modal';

const LoanCollateral = () => {

    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <div>
            <div class="callout callout-info" style={{marginTop:"20px"}}>
                You can add collateral here related to this loan that is not included in the loan schedule.
            </div>
            <div style={{margin:"20px 0"}}>
                <button className="btn bg-gray"><NavLink className="loan_details_tab_btns" to="/addloancollateral">Add Collateral</NavLink></button>
            </div>
            <div className='table-responsive'>
                <table className='table table-centered'>
                    <thead className="thead-light">
                        <tr>
                            <th style={{textAlign:"start"}}>collateral Type</th>
                            <th style={{textAlign:"start"}}>Product_Name</th>
                            <th style={{textAlign:"start"}}>Collateral_Value</th>
                            <th style={{textAlign:"start"}}>Register_Date</th>
                            <th style={{textAlign:"start"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Building</td>
                            <td>House</td>
                            <td>ZWL 11436.00</td>
                            <td>22/12/21</td>
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

export default LoanCollateral;