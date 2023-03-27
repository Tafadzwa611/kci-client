import React from 'react';

const DeleteModal = ({closeModal, deleteOtherIncome}) => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-info-circle modal_circle"></i>
                </div>
                <div className="title" style={{fontSize: "0.875rem"}}>
                    Are you sure you want to delete this income.
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => closeModal(false)}>Cancel</button>
                    <button className="btn btn-danger" onClick={deleteOtherIncome}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;