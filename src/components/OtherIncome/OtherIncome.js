import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';

const OtherIncome = (props) => {
    
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <tr className="table-row">
            <td>{props.other_income_type}</td>
            <td><NavLink className="link" to="/otherincomedetails">{props.other_income_name}</NavLink></td>
            <td>{props.date_added}</td>
            <td>{props.other_income_amount}</td>
            <td>{props.reference}</td>
            <td className="action-td">
                <span className="edit">edit</span>
                <span className="delete" onClick={showOpenModal}>delete</span>
            </td>
            {openModal && <Modal closeModal={setOpenmodal}/>}
        </tr>
    );
}

export default OtherIncome;