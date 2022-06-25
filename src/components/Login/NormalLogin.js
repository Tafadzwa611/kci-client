import React from 'react';

function NormalLogin(props) {
  return (
    <div className='login-section'>
      <div className='login-container'>
        <div className='card'>
          <div className='card-body'>
            <div>
              <form autoComplete='off' className='card-body' onSubmit={props.login}>
                <div className='w-75 m-auto'>
                  <h4 className='text-dark-50 text-center mt-0 font-weight-bold'>Sign In</h4> 
                  <p className='text-muted mb-3 text-center'>Enter your email address and password</p>
                </div>
                <div style={{fontSize: 12, color: 'red'}}>{props.errors.non_field_errors}</div>
                <div>
                  <div className='form-group'>
                    <label>Email address</label>
                    <input type='text' placeholder='Enter your email' className='form-control' value={props.email} onChange={e => props.setEmail(e.target.value)}/>
                    <div style={{fontSize: 12, color: 'red'}}>{props.errors.email}</div>
                  </div> 
                  <div className='form-group mb-3'>
                    <label>Password</label>
                    <div className='input-group'>
                      <input
                        type={props.viewPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        autoComplete='off'
                        className='form-control password'
                        value={props.password}
                        onChange={e => props.setPassword(e.target.value)}
                      />
                      <i className={`${props.viewPassword ? 'uil uil-eye' : 'uil uil-eye-slash'}`} onClick={e => props.setViewPassword(curr => !curr)}></i>
                    </div>
                    <div style={{fontSize: 12, color: 'red'}}>{props.errors.password}</div>
                  </div>
                  <div className='form-group mb-0 text-center'>
                    <button type='submit' className='btn btn-primary px-4'>
                      {props.loggingIn ? <><i className='fa-solid fa-cog fa-spin fa-spin-reverse'></i> Please wait</> : 'Log In'}
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