import React from 'react';

function ModalLarge({title, setOpen, children}) {
  return (
    <div className='modal fade show' style={{display: 'block'}}>
      <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:'calc(100% - 3rem)', height:'calc(100% - 7rem)', top:'3.8rem'}}>
        <div className='modal-content'>
          <div className='modal-header'>
            <span style={{fontWeight:'600'}}>{title}</span>
            <button type='button' className='close' onClick={() => setOpen(null)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default ModalLarge;