import React from 'react';

const NonFieldErrors = ({clientError, children, responseStatus}) => {
  if (clientError != undefined) {
    console.log(clientError);
    switch (clientError.name) {
      case 'TypeError':
        return (
          <>
            <div className='row custom-background' style={{marginTop: '15px'}}>
              <div className='col-9'>
                <div style={{fontSize: 12, color: 'red'}}>Network error.</div>
              </div>
            </div>
            {children}
          </>
        )
      case 'AbortError':
        return (
          <>
            <div className='row custom-background' style={{marginTop: '15px'}}>
              <div className='col-9'>
                <div style={{fontSize: 12, color: 'red'}}>Server taking too long to respond.</div>
              </div>
            </div>
            {children}
          </>
        )
    }
    return (
      <>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Application Error.</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  if (responseStatus === 403) {
    return (
      <>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>You do not have permission to perform this action.</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  if (responseStatus >= 500) {
    return (
      <>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <div className='col-9'>
            <div style={{fontSize: 12, color: 'red'}}>Server Error please try again later. If error persists please contact developer.</div>
          </div>
        </div>
        {children}
      </>
    )
  }

  return children
}

export default NonFieldErrors;