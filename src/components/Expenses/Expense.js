import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';

const Expense = (props) => {
    
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <tr className="table-row">
            <td>{props.expense_type}</td>
            <td><NavLink className="link" to="/expensedetails">{props.expense_name}</NavLink></td>
            <td>{props.expense_date}</td>
            <td>{props.date_added}</td>
            <td>{props.expense_amount}</td>
            <td>{props.reference}</td>
            <td className="action-td">
                <span className="edit">edit</span>
                <span className="delete" onClick={showOpenModal}>delete</span>
            </td>
            {openModal && <Modal closeModal={setOpenmodal}/>}
        </tr>
    );
}

export default Expense;