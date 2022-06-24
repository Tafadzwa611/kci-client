import React from 'react';
import { NavLink } from 'react-router-dom';

const BankNames = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading">Bank Names</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addbankname">Add Bank Name</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Bank_Name</th>
                                <th>Action</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>CBZ</td>
                                <td>
                                    <div>
                                        <a type="button" className="btn btn-default" href="">Edit</a>
                                    </div>
                                </td>         
                            </tr>
                            <tr className="table-row">
                                <td>Banc Abc</td>
                                <td>
                                    <div>
                                        <a type="button" className="btn btn-default" href="">Edit</a>
                                    </div>
                                </td>         
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

export default BankNames;