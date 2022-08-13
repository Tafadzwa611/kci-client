import React from 'react';

function CreateSubAccountModal({open, setOpen, modalContent}) {

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable text-light'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Sub Account ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>

          <div className='modal-body' id="add-account-form-body">
            {modalContent}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateSubAccountModal;