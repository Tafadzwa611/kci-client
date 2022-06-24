import React from 'react';
import { NavLink } from 'react-router-dom';

const Refund = (props) => {

    return (
        <tr className="table-row">
            <td><NavLink className="link" to="/loandetail">{props.loan_number}</NavLink></td>
            <td>{props.refund_amount}</td>
            <td>{props.refund_date}</td>
            <td>{props.refunded_by}</td>
        </tr>
    );
}

export default Refund;