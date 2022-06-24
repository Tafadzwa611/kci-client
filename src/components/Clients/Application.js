import React from 'react';

const Application = (props) => {

    var status_color;
    
    if (props.status === "Approved"){
        status_color = 'badge badge-success'
    } else {
        status_color = 'badge badge-danger'
    }

    return (
        <tr className="table-row">
            <td>{props.full_name}</td>
            <td>{props.ec_number}</td>
            <td>{props.amount}</td>
            <td>{props.phone_number}</td>
            <td>{props.address}</td>
            <td>{props.date_added}</td>
            <td>{props.gender}</td>
            <td><small className={status_color}>{props.status}</small></td>
        </tr>
    );
}

export default Application;