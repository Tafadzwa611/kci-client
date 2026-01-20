import React from 'react';

function FeesTab({ deposit }) {
    return (
        <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
            <table className="table">
                <tbody>
                    <tr className="journal-details header client__details">
                        <th>Name</th>
                        <th>Fee_Calculation</th>
                        <th>Fee_Type</th>
                        <th>Value</th>
                    </tr>
                    {deposit.fees.map((fee, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{fee.name}</td>
                                <td>{fee.fee_calculation}</td>
                                <td>{fee.fee_type}</td>
                                <td>{fee.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FeesTab;