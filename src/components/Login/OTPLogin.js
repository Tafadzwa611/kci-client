import React, {useEffect} from 'react';


function OTPLogin({login, token, setToken, verifyingOtp, authType, email}) {
  useEffect(() => {
    document.title = 'One Time Password';
  }, []);

  const sendEmail = () => {
    console.log(email);
    console.log('sending email');
  }

  return (
    <div className='login-section-login'>
      <div className='login-container-login'>
        <div className='card-login'>
          <div className='card-body-login'>
            <div>
              <form autoComplete='off' className='card-body-login' onSubmit={login}>
                <div className='w-75-login m-auto-login'>
                  <h4 className='text-dark-50-login text-center-login mt-0-login font-weight-bold-login'>Sign In</h4> 
                  <p className='text-muted-login mb-3-login text-center-login'>Enter OTP code</p>
                </div>
                <div>
                  <div className='form-group-login'>
                    <label>OTP</label> 
                    <input
                      type='number'
                      placeholder='Enter OTP'
                      autoComplete='off'
                      className='form-control-login'
                      value={token}
                      onChange={e => setToken(e.target.value)}
                    /> 
                  </div>
                  <div className='form-group-login mb-0-login text-center-login'>
                    <button type='submit' className='btn-login btn-primary-login px-4-login'>Verify Code</button>
                  </div>
                </div>
                {['SMS', 'AUTH APP'].includes(authType) && <a onClick={sendEmail}>Lost phone send email instead.</a>}
              </form>
            </div>
          </div>
        </div>
      </div>   
    </div>
  )
}

export default OTPLogin;