import React from 'react';
import ModalActionSubmit from './ModalActionSubmit';

const ActionModalDialog = ({msg, isSubmitting, setOpen, act}) => {
  return (
    <div>
      <div className="title" style={{fontSize: "0.875rem"}}>
        {msg} 
      </div>
      <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={act}/>
    </div>
  )
}

export default ActionModalDialog;