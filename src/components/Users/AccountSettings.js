import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SwitchAccounting from '../SwitchAccounting';
import SwitchPropagatePayments from '../SwitchPropagatePayments';

const AccountSettings = ({isAccountinOn,propagatePayments,showIsAccountinOn,showPropagatePayments}) => {

    const td_style = {
        padding: "1rem 0"
    }

    useEffect(() => {
        document.title = 'Account Settings';
    }, [])

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
                                    <SwitchAccounting isAccountinOn={isAccountinOn} onToggle={showIsAccountinOn} />
                                </td>         
                            </tr>
                            <tr>
                                <td style={td_style}>Propagate overpayments to client's other open loans</td>
                                <td>
                                    <SwitchPropagatePayments propagatePayments={propagatePayments} onToggle={showPropagatePayments} />
                                </td>         
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-flex-space-btwn">
                    <NavLink className="btn btn-default" to="/app/users/admin"><i className="uil uil-arrow-left"></i>Back</NavLink>
                </div>

            </div>
        </div>
    );
}

export default AccountSettings;