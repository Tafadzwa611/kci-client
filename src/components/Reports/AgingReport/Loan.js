import React from 'react';
import { NavLink } from 'react-router-dom';

const Loan = (props) => {

    var status_color;
    
    if (props.status === "Fully Paid"){
        status_color = 'badge badge-success'
    } else if (props.status === "Open") {
        status_color = 'badge badge-info'
    } else if (props.status === "Defaulted" || props.status === "Rejected") {
        status_color = 'badge badge-danger'
    } else if (props.status === "Written Off") {
        status_color = 'badge badge-dark'
    } else if (props.status === "Processing") {
        status_color = 'badge badge-info-lighter'
    } else if (props.status === "Arrears") {
        status_color = 'badge badge-info-light'
    } else {
        status_color = 'badge badge-warning'
    }

    return (
        <tr className="table-row">
            <td><NavLink className="link" to="/clientdetail">{props.loan_number}</NavLink></td>
            <td>{props.released}</td>
            <td>{props.client}</td>
            <td>{props.days_in_arrears}</td>
            <td>{props.total_principal_due}</td>
            <td>{props.total_interest_due}</td>
            <td>{props.total_fees_due}</td>
            <td>{props.total_penalty_due}</td>
            <td>{props.overdue_balance}</td>
            <td>
                <small className={status_color}>{props.status}</small>
            </td>
        </tr>
    );
}

export default Loan;