import React from 'react';
import ModalDeleteSubmit from './ModalDeleteSubmit';

const DeleteModalDialog = ({msg, isSubmitting, setOpen}) => {
  return (
    <div>
      <div className="title" style={{fontSize: "0.875rem"}}>
        {msg} 
      </div>
      {/* <div className="para">
      </div> */}
      <ModalDeleteSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
    </div>
  )
}

export default DeleteModalDialog;