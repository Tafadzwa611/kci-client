import React from 'react';
import SwitchAccounting from '../../../../components/SwitchAccounting';
import SwitchPropagatePayments from '../../../../components/SwitchPropagatePayments';

const AccountSettings = ({isAccountinOn,propagatePayments,showIsAccountinOn,showPropagatePayments}) => {

    const td_style = {
        padding: "1rem 0"
    }

    return (
        <>
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
        </>
    )
}

export default AccountSettings;