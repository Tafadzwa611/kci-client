import React from 'react';
import { NavLink } from 'react-router-dom';

const LoanFees = () => {
    return (
        <div className="card slide">
            <div className="card-body">

                <h5 className="table-heading" style={{marginBottom:"20px"}}>Loan Fees</h5>

                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addloanfee">Add Loan Fee</NavLink><br/>
                </div>

                <div className="table-responsive font-12">

                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Date_Added</th>
                                <th>Name</th>
                                <th>Calculation</th>
                                <th>Deductable</th>
                                <th>Is_Mandatory</th>
                                <th>Action</th>
                            </tr>
                        
                            <tr className="table-row">
                                <td>
                                    03/31/2021 
                                </td>
                                <td>
                                    Admin Fee
                                </td>
                                <td>
                                    Percent Based
                                </td>
                                <td>
                                    True
                                </td>
                                <td>
                                    False
                                </td>
                                <td>
                                    <div className="btn-group-vertical">
                                        <a type="button" className="btn btn-default" href="">Suspend</a>
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

export default LoanFees;