import React from 'react';

const SubmitButton = ({isSubmitting}) => {
  if (isSubmitting) {
    return (
      <div className="modal-footer justify-content-between">
        <button className='btn btn-info' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
          <i className='fa fa-spinner fa-spin'></i> Please wait..
        </button>
      </div>
    )
  }
  return <button className='btn btn-info' type='submit'>Submit</button>

}

export default SubmitButton;