import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../utils';


const initialErrorState = {email: ''};
const emailRegex = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";
function ForgotPassword() {
  const [errors, setErrors] = useState(initialErrorState);
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);

  useEffect(() => {
    document.title = 'Recover Account | Lenda';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await sendRequest();
    }
  }

  const sendRequest = async () => {
    const response = await makeRequest.post('/usersapi/reset_password_request/', {email}, {timeout: 60000});
    if (response.ok) {
      setSend(true);
    }
  }

  const validate = () => {
    setErrors(initialErrorState);
    let emailError = '';
    let regex = new RegExp(emailRegex);

    if (email === '') {
      emailError = 'Email is required';
    }else if (!regex.test(email)) {
      emailError = 'Invalid email address';
    }

    if (emailError) {
      setErrors({email: emailError});
      return false;
    }
    return true;
  }

  return (
    <div className='login-section-login'>
      <div className='login-container-login'>
        <div className='card-login'>
          <div className='card-body-login'>
            <div>
              <form autoComplete='off' className='card-body-login' onSubmit={handleSubmit}>
                <div className='w-75-login m-auto-login'>
                  <h4 className='text-dark-50-login text-center-login mt-0-login font-weight-bold-login'>{send ? 'Check your email' : 'Recover Account'}</h4> 
                  <p className='text-muted-login mb-3-login text-center-login'>
                    {send ? 'You\'ll receive an email with the link to reset your password.' : 'We will send a password reset link to this address'}
                  </p>
                </div>
                {!send && <><div className='form-group-login'>
                  <label>Email address</label>
                  <input
                    type='text'
                    placeholder='Enter your email'
                    className='form-control-login'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <div style={{fontSize: 12, color: 'red'}}>{errors.email}</div>
                </div>
                <div className='form-group-login mb-0-login text-center-login'>
                  <button type='submit' className='btn-login btn-primary-login px-4'>
                    Send Email
                  </button>
                </div></>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;