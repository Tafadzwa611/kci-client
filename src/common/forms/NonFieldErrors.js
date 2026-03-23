import React from 'react';
import ClientError from './ClientError';

const NonFieldErrors = ({children, errors}) => {
  if (errors.responseStatus >= 500) {
    return (
      <>
        {children}
        <div className='sf-errorbox'>
          <div className="sf-errorbox-title">Form errors</div>
          <pre className="sf-errorbox-pre">Server Error please try again later. If error persists please contact developer.</pre>
        </div>
      </>
    )
  }

  if (errors.responseStatus >= 400) {
    return (
      <>
        {children}
          <div className='sf-errorbox'>
            <div className="sf-errorbox-title">Form errors</div>
            <pre className="sf-errorbox-pre">{JSON.stringify(errors, null, 2)}</pre>
          </div>
      </>
    )
  }

  if (errors.responseStatus === "Network Error") {
    return (
      <>
        {children}
          <div className='sf-errorbox'>
            <div className="sf-errorbox-title">Form errors</div>
            <pre className="sf-errorbox-pre">Network Error</pre>
          </div>
      </>
    )
  }

  if (errors.clientError != undefined) {
    return (
      <>
        {children}
        <ClientError error={errors.clientError}/>
      </>
    )
  }
  return children
}

const DictError = ({error}) => {
  return (
    <div style={{fontSize: 12, color: 'red'}}>
      Error Type: {error.level}<br/>
      Field Name: {error.field_name}<br/>
      Error Message: {error.msg}<br/>
      <hr style={{borderTop: '1px solid #ff0000'}}></hr>
    </div>
  )
}

export default NonFieldErrors;