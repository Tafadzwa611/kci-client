import React from 'react';

const ModalDeleteSubmit = ({isSubmitting, setOpen, open}) => {

  console.log(open)
  
  if (isSubmitting) {
    return (
      <div className="modal-footer">
        <span className="btn btn-default" onClick={(e) => setOpen(false)}>Cancel</span>
        <button className='btn btn-danger' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
          <i className='fa fa-spinner fa-spin'></i> Please wait..
        </button>
      </div>
    )
  }
  return (
      <div className="modal-footer">
        <span className="btn btn-default" onClick={(e) => setOpen(false)}>Cancel</span>
        <button className='btn btn-danger' type='submit'>Submit</button>
      </div>
    )

}

export default ModalDeleteSubmit;