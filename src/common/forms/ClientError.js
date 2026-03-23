import React, { useState } from 'react';

const ClientError = ({error}) => {
  const [showError, setShowError] = useState(false);

  if (error.name === 'TypeError') {
    return (
      <div className='sf-errorbox'>
        <div className="sf-errorbox-title">Form errors</div>
        <pre className="sf-errorbox-pre">Network error please try again.</pre>
      </div>
    )
  }else if (error.name === 'AbortError') {
    return (
      <div className='sf-errorbox'>
        <div className="sf-errorbox-title">Form errors</div>
        <pre className="sf-errorbox-pre">The server taking too long to respond, please try again.</pre>
      </div>
    )
  }
  return (
    <>
      <div className='sf-errorbox'>
        <div className="sf-errorbox-title">Form errors</div>
        <pre className="sf-errorbox-pre">Application Error.</pre>
        <span onClick={_ => setShowError(curr => !curr)}>{showError ? 'Show less' : 'Show more'}</span>
        <div style={{display: showError ? 'block' : 'none'}}>
          <pre className="sf-errorbox-pre">{error.message}</pre>
          <pre className="sf-errorbox-pre">{error.stack}</pre>
        </div>
      </div>
    </>
  )
}

export default ClientError;