import React from 'react';

const DeleteModal = ({closeModal, deleteExpense}) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i class="uil uil-info-circle modal_circle"></i>
                </div>
                <div className="title">
                    Are you sure ? 
                </div>
                <div className="para">
                    You want to delete Tafadzwa Kuno
                </div>
                <div className="modal-footer">
                    <button className="btn btn-info" onClick={deleteExpense}>Continue</button>
                    <button className="btn btn-danger"onClick={() => closeModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;