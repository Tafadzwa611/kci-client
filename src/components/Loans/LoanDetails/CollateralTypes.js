import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../Modal';

const CollateralTypes = () => {

    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <div className="card text-light slide">
            <div className="card-body">
                <h5 className="table-heading">Collateral Types</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addcollateraltype">Add Collateral Type</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th style={{width:"50%"}}>Name</th>
                                <th>Action</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>Car</td>
                                <td className="action-td">
                                    <span className="edit">edit</span>
                                    <span className="delete" onClick={showOpenModal}>delete</span>
                                </td>
                                {openModal && <Modal closeModal={setOpenmodal}/>}    
                            </tr>
                            <tr className="table-row">
                                <td>House</td>
                                <td className="action-td">
                                    <span className="edit">edit</span>
                                    <span className="delete" onClick={showOpenModal}>delete</span>
                                </td>
                                {openModal && <Modal closeModal={setOpenmodal}/>} 
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-flex-space-btwn">
                    <NavLink className="btn btn-default" to="/admin"><i class="uil uil-arrow-left"></i>Back</NavLink>
                </div>

            </div>
        </div>
    );
}

export default CollateralTypes;