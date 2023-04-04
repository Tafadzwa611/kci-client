import React from 'react';

const SubmitButtonFilter = ({isSubmitting}) => {
  if (isSubmitting) {
    return (
      <div style={{marginTop:"10px"}}>
        <label className='form-label row-label'></label>
        <span>
          <button className='btn btn-olive' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
            <i className='fa fa-spinner fa-spin'></i> Please wait..
          </button>
        </span>
      </div>
    )
  }
  return (
    <div style={{marginTop:"10px"}}>
      <label className='form-label row-label'></label>
      <span>
        <button className='btn btn-olive' type='submit'>Filter</button>
      </span>
    </div>
  )
}

export default SubmitButtonFilter;