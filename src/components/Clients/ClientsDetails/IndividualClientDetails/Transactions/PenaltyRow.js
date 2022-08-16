import React from 'react';

function PenaltyRow({transaction}) {
    const d = new Date(transaction.date);
    const dateString = d.toDateString();
    const timeString = d.toLocaleTimeString();

    return (
        <tr>
            <td>{dateString} {timeString}</td>
            <td>{transaction.ref}</td>
            <td>{transaction.description}</td>
            <td></td>
            <td></td>
            <td>{transaction.principal_due}</td>
            <td>{transaction.interest_due}</td>
            <td>{transaction.penalty_due}</td>
            <td>{transaction.balance}</td>
        </tr>
    )
}

export default PenaltyRow;