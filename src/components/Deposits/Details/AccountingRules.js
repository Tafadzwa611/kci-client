import React from 'react';

function AccountingRules({deposit}) {
    const rows = Object.entries(deposit.accounting);
    return (
        <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
            <table className="table">
                <tbody>
                    <tr className="journal-details header client__details">
                        <th>Account_Type</th>
                        <th>Account_Name</th>
                    </tr>
                    {rows.map(([key, { name, }]) => {
                        return (
                            <tr key={key}>
                                <td>{formatKey(key)}</td>
                                <td>{name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

function formatKey(key) {
    return key
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default AccountingRules;