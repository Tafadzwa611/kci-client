import React from 'react';
import { NavLink } from 'react-router-dom';

const Client = (props) => {

    return (
        <tr className="table-row">
            <td><NavLink className="link" to="/clientdetail">{props.client_number}</NavLink></td>
            <td>{props.full_name}</td>
            <td>{props.type_of_client}</td>
            <td>{props.phone_number}</td>
            <td>{props.gender}</td>
            <td>{props.registration_date}</td>
            <td>{props.date_of_birth}</td>
            <td>{props.branch}</td>
        </tr>
    );
}

export default Client;