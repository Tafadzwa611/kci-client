import React, {useEffect} from 'react';


function OTPLogin({login, token, setToken, verifyingOtp}) {
  useEffect(() => {
    document.title = 'One Time Password';
  }, []);

  return (
    <div className='login-section'>
      <div className='login-container'>
        <div className='card'>
          <div className='card-body'>
            <div>
              <form autoComplete='off' className='card-body' onSubmit={login}>
                <div className='w-75 m-auto'>
                  <h4 className='text-dark-50 text-center mt-0 font-weight-bold'>Sign In</h4> 
                  <p className='text-muted mb-3 text-center'>Enter OTP code</p>
                </div>
                <div>
                  <div className='form-group'>
                    <label>OTP</label> 
                    <input
                      type='number'
                      placeholder='Enter OTP'
                      autoComplete='off'
                      className='form-control'
                      value={token}
                      onChange={e => setToken(e.target.value)}
                    /> 
                  </div>
                  <div className='form-group mb-0 text-center'>
                    <button type='submit' className='btn btn-primary px-4'>Verify Code</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default OTPLogin;