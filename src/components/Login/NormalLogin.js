import React from 'react';

function NormalLogin({login, email, setEmail, password, setPassword, viewPassword, setViewPassword, loggingIn}) {
  return (
    <div className='login-section'>
      <div className='login-container'>
        <div className='card'>
          <div className='card-body'>
            <div>
              <form autoComplete='off' className='card-body' onSubmit={login}>
                <div className='w-75 m-auto'>
                  <h4 className='text-dark-50 text-center mt-0 font-weight-bold'>Sign In</h4> 
                  <p className='text-muted mb-3 text-center'>Enter your email address and password</p>
                </div>
                <div>
                  <div className='form-group'>
                    <label>Email address</label>
                    <input type='text' placeholder='Enter your email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
                  </div> 
                  <div className='form-group mb-3'>
                    <label>Password</label>
                    <div className='input-group'>
                      <input
                        type={viewPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        autoComplete='off'
                        className='form-control password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <i className={`${viewPassword ? 'uil uil-eye' : 'uil uil-eye-slash'}`} onClick={e => setViewPassword(curr => !curr)}></i>
                    </div>
                  </div>
                  <div className='form-group mb-0 text-center'>
                    <button type='submit' className='btn btn-primary px-4'>
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