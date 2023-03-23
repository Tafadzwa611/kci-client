import React from 'react';
import ModalDeleteSubmit from './ModalDeleteSubmit';

const DeleteModalDialog = ({msg, isSubmitting, setOpen}) => {
  return (
    <div>
      <div className="title">
        {msg} 
      </div>
      {/* <div className="para">
      </div> */}
      <ModalDeleteSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
    </div>
  )
}

export default DeleteModalDialog;