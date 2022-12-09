import React from 'react';
import ModalDeleteSubmit from './ModalDeleteSubmit';

const DeleteModalDialog = ({msg, isSubmitting, setOpen}) => {
  return (
        <div>
            <div className="title">
                Are you sure ? 
            </div>
            <div className="para">
                {msg}
            </div>
            <ModalDeleteSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
        </div>
    )
}

export default DeleteModalDialog;