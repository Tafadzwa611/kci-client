import React from 'react';
import ClientError from './ClientError';

const NonFieldErrors = ({children, errors}) => {
  if (errors.responseStatus >= 500) {
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center", padding:"0 10px"}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Server Error please try again later. If error persists please contact developer.</div>
          </div>
        </div>
      </>
    )
  }

  if (errors.responseStatus >= 400) {
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center", padding:"0 10px"}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Error: {errors.detail}</div>
          </div>
        </div>
      </>
    )
  }

  if (errors.responseStatus === "Network Error") {
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center", padding:"0 10px"}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Network Error</div>
          </div>
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

export default NonFieldErrors;