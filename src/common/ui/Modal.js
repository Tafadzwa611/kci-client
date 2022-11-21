import React from 'react';

const Modal = ({open, setOpen, children, title}) => {
  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className='form-title'>[ {title} ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(false)} style={{cursor:'pointer'}}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body text-light'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal;