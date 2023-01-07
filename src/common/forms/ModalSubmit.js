import React from 'react';

const ModalSubmit = ({isSubmitting, setOpen}) => {
  if (isSubmitting) {
    return (
      <div className="modal-footer justify-content-between" style={{padding: "1rem 0", marginTop:"1rem"}}>
        <span className='btn btn-default' onClick={(e) => setOpen(false)}>Close</span>
        <button className='btn btn-info' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
          <i className='fa fa-spinner fa-spin'></i> Please wait..
        </button>
      </div>
    )
  }
  return (
    <div className="modal-footer justify-content-between" style={{padding: "1rem 0", marginTop:"1rem"}}>
      <span className='btn btn-default' onClick={(e) => setOpen(false)}>Close</span>
      <button className='btn btn-info' type='submit'>Submit</button>
    </div>
  )
}

export default ModalSubmit;