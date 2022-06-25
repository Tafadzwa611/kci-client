import React, {useState} from 'react';
import Modal from '../../Modal';

const LoanPayments = (props) => {

    const [openModal, setOpenmodal] = useState(false);
    const showOpenModal = () => setOpenmodal(!openModal);

    return (
        <tr className="table-row">
            <td>{props.collection_date}</td>
            <td>{props.collected_by}</td>
            <td>{props.branch_collected}</td>
            <td>{props.method}</td>
            <td>{props.principal}</td>
            <td>{props.interest}</td>
            <td>{props.to_be_refunded}</td>
            <td>{props.total_amount_paid}</td>
            <td>
                <small class="badge badge-danger delete-payment" onClick={showOpenModal}>delete</small>
            </td>
            {openModal && <Modal closeModal={setOpenmodal}/>}
            <td className="receipt-btns">
                <span> <a href=""><i class="uil uil-print"></i></a> </span>
                <span> <a href=""><i class="uil uil-adobe"></i></a> </span>
            </td>
        </tr>
    );
}

export default LoanPayments;