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
            <td><NavLink className="link" to="/app/clients/clientdetail">{props.full_name}</NavLink></td>
            <td><NavLink className="link" to="/app/loans/loandetail">{props.loan_number}</NavLink></td>
            <td>{props.principal}</td>
            <td>{props.interest_rate}</td>
            <td>{props.repayment_cycle}</td>
            <td>{props.loan_duration}</td>
            <td>{props.date_added}</td>
            <td>{props.amount_due}</td>
            <td>{props.amount_paid}</td>
            <td>{props.balance}</td>
            <td>
                <small className={status_color}>{props.status}</small>
            </td>
        </tr>
    );
}

export default Loan;