import React from 'react';
import { NavLink } from 'react-router-dom';

const DefaultsAndArrearsLoan = (props) => {

    return (
        <tr className="table-row">
            <td><NavLink className="link" to="/clientdetail">{props.full_name}</NavLink></td>
            <td><NavLink className="link" to="/loandetail">{props.loan_number}</NavLink></td>
            <td>{props.branch}</td>
            <td>{props.disbursement_date}</td>
            <td>{props.last_payment_date}</td>
            <td>{props.days_past_due}</td>
            <td>{props.installment_due}</td>
            <td>{props.principal_due}</td>
            <td>{props.pending_due}</td>
            <td><small className="badge badge-danger">{props.status}</small></td>
            <td>Action</td>
        </tr>
    );
}

export default DefaultsAndArrearsLoan;