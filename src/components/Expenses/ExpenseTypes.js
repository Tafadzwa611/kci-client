import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpenseTypes = () => {

    return (
        <div className="card slide">
            <div className="card-body">
                
                <h5 className="table-heading">Expense Types</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addexpensetype">Add Expense Type</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Name</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>Airtime</td>
                            </tr>
                            <tr className="table-row">
                                <td>Rent</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ExpenseTypes;