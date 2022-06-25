import React from 'react';
import { NavLink } from 'react-router-dom';

const OtherIncomeTypes = () => {

    return (
        <div className="card slide">
            <div className="card-body">

                <h5 className="table-heading">Other Income Types</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addotherincometype">Add Other Income Type</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Name</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>Car</td>
                            </tr>
                            <tr className="table-row">
                                <td>House</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default OtherIncomeTypes;