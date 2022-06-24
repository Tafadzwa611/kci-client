import React from 'react';
import { NavLink } from 'react-router-dom';

const Payment = (props) => {

    return (
        <tr className="table-row">
            <td><NavLink className="link" to="/loandetail">{props.loan_number}</NavLink></td>
            <td>{props.collection_date}</td>
            <td>{props.collected_by}</td>
            <td>{props.payment_type}</td>
            <td>{props.method}</td>
            <td>{props.client}</td>
            <td>{props.amount_paid}</td>
            <td className="receipt-btns">
                <span> <a href=""><i class="uil uil-print"></i></a> </span>
                <span> <a href=""><i class="uil uil-adobe"></i></a> </span>
            </td>
        </tr>
    );
}

export default Payment;