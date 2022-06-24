import React from 'react';
import { NavLink } from 'react-router-dom';

const Currencies = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading">Currencies</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addcurrency">Add Currency</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Full_Name</th>
                                <th>ISO Code</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>US Dollar</td>
                                <td>USD</td>         
                            </tr>
                            <tr className="table-row">
                                <td>Zimbabwean Dollar</td>
                                <td>ZWD</td>         
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

export default Currencies;