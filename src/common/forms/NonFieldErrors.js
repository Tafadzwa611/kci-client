import React from 'react';
import ClientError from './ClientError';

const NonFieldErrors = ({children, errors}) => {
  if (errors.responseStatus >= 500) {
    return (
      <>
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center", padding:"0 10px"}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Server Error please try again later. If error persists please contact developer.</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  if (errors.responseStatus >= 400) {
    return (
      <>
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center", padding:"0 10px"}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>{errors.detail}</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  if (errors.clientError != undefined) {
    return (
      <>
        <ClientError error={errors.clientError}/>
        {children}
      </>
    )
  }
  return children
}

export default NonFieldErrors;