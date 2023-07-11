import React from 'react';
import ClientError from './ClientError';

const NonFieldErrors = ({children, errors}) => {
  if (errors.responseStatus >= 500) {
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center"}}>
          <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
            <div style={{fontSize: 12, color: 'red'}}>Server Error please try again later. If error persists please contact developer.</div>
          </div>
        </div>
      </>
    )
  }

  if (errors.responseStatus >= 400) {
    if ('detail' in errors) {
      return (
        <>
          {children}
          <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center"}}>
            <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
              {typeof errors.detail === 'string' ?
              <div style={{fontSize: 12, color: 'red'}}>Error: {JSON.stringify(errors.detail)}</div> :
              Array.isArray(errors.detail) ? errors.detail.map((error, idx) => <DictError key={idx} error={error}/>) : <DictError error={errors.detail}/>}
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center"}}>
          <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
            Error: {JSON.stringify(errors)}
          </div>
        </div>
      </>
    )
  }

  if (errors.responseStatus === "Network Error") {
    return (
      <>
        {children}
        <div className='row custom-background' style={{marginTop: '15px', display:"flex", justifyContent:"center"}}>
          <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
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

const DictError = ({error}) => {
  return (
    <div style={{fontSize: 12, color: 'red'}}>
      Error Type: {error.level}<br/>
      Field Name: {error.field_name}<br/>
      Error Message: {error.msg}<br/>
      <hr style={{borderTop: '3px solid #ff0000'}}></hr>
    </div>
  )
}

export default NonFieldErrors;