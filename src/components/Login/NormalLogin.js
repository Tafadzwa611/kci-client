import React from 'react';

function NormalLogin({login, email, setEmail, password, setPassword, viewPassword, setViewPassword, loggingIn}) {
  return (
    <div className='login-section-login'>
      <div className='login-container-login'>
        <div className='card-login'>
          <div className='card-body-login'>
            <div>
              <form autoComplete='off' className='card-body-login' onSubmit={login}>
                <div className='w-75-login m-auto-login'>
                  <h4 className='text-dark-50-login text-center-login mt-0-login font-weight-bold-login'>Sign In</h4> 
                  <p className='text-muted-login mb-3-login text-center-login'>Enter your email address and password</p>
                </div>
                <div>
                  <div className='form-group-login'>
                    <label>Email address</label>
                    <input type='text' placeholder='Enter your email' className='form-control-login' value={email} onChange={e => setEmail(e.target.value)}/>
                  </div> 
                  <div className='form-group-login mb-3-login'>
                    <label>Password</label>
                    <div className='input-group-login'>
                      <input
                        type={viewPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        autoComplete='off'
                        className='form-control-login password-login'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <i className={`${viewPassword ? 'uil uil-eye' : 'uil uil-eye-slash'}`} onClick={e => setViewPassword(curr => !curr)}></i>
                    </div>
                  </div>
                  <div className='form-group-login mb-0-login text-center-login'>
                    <button type='submit' className='btn-login btn-primary-login px-4-login'>
                      {loggingIn ? <><i className='fa-solid fa-cog fa-spin fa-spin-reverse'></i> Please wait</> : 'Log In'}
                    </button>
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

export default NormalLogin;