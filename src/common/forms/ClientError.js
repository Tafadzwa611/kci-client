import React, { useState } from 'react';

const ClientError = ({error}) => {
  const [showError, setShowError] = useState(false);

  if (error.name === 'TypeError') {
    return (
      <div className='row custom-background' style={{marginTop: '15px'}}>
        <div className='col-9'>
          <div style={{fontSize: 12, color: 'red'}}>Network error please try again.</div>
        </div>
      </div>
    )
  }else if (error.name === 'AbortError') {
    return (
      <div className='row custom-background' style={{marginTop: '15px'}}>
        <div className='col-9'>
          <div style={{fontSize: 12, color: 'red'}}>The server taking too long to respond, please try again.</div>
        </div>
      </div>
    )
  }
  return (
    <div className='row custom-background' style={{marginTop: '15px'}}>
      <div className='col-9'>
        <div style={{fontSize: 12, color: 'red'}}>Application Error.</div>
        <span onClick={_ => setShowError(curr => !curr)}>{showError ? 'Show less' : 'Show more'}</span>
        <div style={{display: showError ? 'block' : 'none'}}>
          <div style={{fontSize: 12, color: 'red'}}>{error.message}</div>
          <div style={{fontSize: 12, color: 'red'}}>{error.stack}</div>
        </div>
      </div>
    </div>
  )
}

export default ClientError;