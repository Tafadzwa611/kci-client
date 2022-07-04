import React, { useState,useEffect } from 'react';
import { makeRequest } from '../../utils';
import { Link } from 'react-router-dom';


const initialErrorState = {password: '', uidb64: '', token: ''};
function ResetPassword() {
  const [errors, setErrors] = useState(initialErrorState);
  const [send, setSend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    document.title = 'Set New Password | Lenda';
    const params = new URLSearchParams(window.location.search);
    setUrl(params.get('reset_link'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await sendRequest();
    }
  }

  const sendRequest = async () => {
    const response = await makeRequest.patch(url, {password}, {timeout: 60000});
    if (response.ok) {
      setSend(true);
      return
    }
    const serverErrors = await response.json();
    Object.keys(serverErrors).forEach(key => setErrors(curr => ({...curr, [key]: serverErrors[key]})));
  }

  const validate = () => {
    setErrors(initialErrorState);
    let passwordError = '';

    if (password === '') {
      passwordError = 'Password is required';
    }else if (password.length < 8) {
      passwordError = 'Password should be greater than 8 characters';
    }

    if (passwordError) {
      setErrors(curr => ({...curr, password: passwordError}));
      return false;
    }
    return true;
  }

  if (url === '') {
    return <>Loading</>
  }

  return (
    <div className='login-section-login'>
      <div className='login-container-login'>
        <div className='card-login'>
          <div className='card-body-login'>
            <div>
              <form autoComplete='off' className='card-body-login' onSubmit={handleSubmit}>
                <div className='w-75-login m-auto-login'>
                  <h4 className='text-dark-50-login text-center-login mt-0-login font-weight-bold-login'>{send ? 'Reset Complete' : 'Reset Password'}</h4>
                  <p className='text-muted-login mb-3-login text-center-login'>
                    {send ?
                      <>Password has been successfully reset, click <Link to='/login' state={{ previousPath: 'reset-password' }}>here</Link> to login.</>:
                      'Enter new password in the field.'}
                  </p>
                </div>
                <div style={{fontSize: 12, color: 'red'}}>{errors.uidb64}</div>
                <div style={{fontSize: 12, color: 'red'}}>{errors.token}</div>
                {!send &&
                  <>
                    <div className='form-group-login mb-3-login'>
                      <label>New Password</label>
                      <div className='input-group-login'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your new password'
                          autoComplete='off'
                          className='form-control-login password-login'
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <i className={`${showPassword ? 'uil uil-eye' : 'uil uil-eye-slash'}`} onClick={e => setShowPassword(curr => !curr)}></i>
                      </div>
                      <div style={{fontSize: 12, color: 'red'}}>{errors.password}</div>
                    </div>
                    <div className='form-group-login mb-0-login text-center-login'>
                      <button type='submit' className='btn-login btn-primary-login px-4'>
                        Reset Password
                      </button>
                    </div>
                  </>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;