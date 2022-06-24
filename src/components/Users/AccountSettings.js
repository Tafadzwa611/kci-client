import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountSettings = () => {

    const td_style = {
        padding: "1rem 0"
    }

    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{margin:"20px 0"}}>Account Settings</h5>
                <div className="table-responsive font-12">
                    <table className="table">
                        <tbody>            
                            <tr>
                                <td style={td_style}>Accounting Module</td>
                                <td>
                                    <div class="toggle-container">
                                        <div class="toggle-btn ">
                                            <div class="inner-circle"></div>
                                        </div>
                                    </div>
                                </td>         
                            </tr>
                            <tr>
                                <td style={td_style}>Propagate overpayments to client's other open loans</td>
                                <td>
                                    <div class="toggle-container">
                                        <div class="toggle-btn on">
                                            <div class="inner-circle"></div>
                                        </div>
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

export default AccountSettings;