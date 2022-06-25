import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';

const Asset = (props) => {
    
    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <tr className="table-row">
            <td>{props.asset_type}</td>
            <td><NavLink className="link" to="/assetdetails">{props.asset_name}</NavLink></td>
            <td>{props.date_added}</td>
            <td>{props.category}</td>
            <td>{props.cost}</td>
            <td>{props.description}</td>
            <td className="action-td">
                <span className="delete" onClick={showOpenModal}>delete</span>
            </td>
            {openModal && <Modal closeModal={setOpenmodal}/>}
        </tr>
    );
}

export default Asset;