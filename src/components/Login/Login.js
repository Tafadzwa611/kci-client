import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../utils';
import NormalLogin from './NormalLogin';
import OTPLogin from './OTPLogin';
import Cookies from 'js-cookie';
import { LoggedInUserContext } from '../Context';

const initialErrorState = {email: '', password: '', non_field_errors: ''};
function Login() {
  const {setLoggedInUser} = useContext(LoggedInUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrorState);
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await normalLogin();
    }
  }

  const validate = () => {
    setErrors(initialErrorState);
    let emailError = '';
    let passwordError = '';
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (email === '') {
      emailError = 'Email is required';
    }else if (!regex.test(email)) {
      emailError = 'Invalid email address';
    }

    if (password === '') {
      passwordError = 'Password is required';
    }

    setErrors(curr => ({...curr, email: emailError, password: passwordError}));
    if (emailError || passwordError) {
      return false;
    }
    return true;
  }

  const normalLogin = async () => {
    setLoggingIn(true);
    const response = await makeRequest.post('/usersapi/login/', {email, password}, {timeout: 6000});
    if (response.ok) {
      const data = await response.json();
      if (data.two_fa_on) {
        setUserId(data.user_id);
        setOtpRequired(true);
      }else {
        Cookies.set('user', JSON.stringify(data.user));
        setLoggedInUser(data.user);
        navigate('/app/home');
      }
    }else {
      const serverErrors = await response.json();
      Object.keys(serverErrors).forEach(key => setErrors(curr => ({...curr, [key]: serverErrors[key]})));
    }
    setLoggingIn(false);
  }

  const otpLogin = async (e) => {
    e.preventDefault();
    setVerifyingOtp(true);
    const response = await makeRequest.post('/usersapi/totp_login/', {token, user_id}, {timeout: 6000});
    if (response.ok) {
      const data = await response.json();
      const loggedInUser = data.user;
      Cookies.set('user', JSON.stringify(data.user));
      setLoggedInUser(loggedInUser);
      navigate('/app/home');
    }
    setVerifyingOtp(false);
  }

  return (
    <>
      {otpRequired ?
        <OTPLogin login={otpLogin} token={token} setToken={setToken} verifyingOtp={verifyingOtp} /> :
        <NormalLogin
          login={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          viewPassword={viewPassword}
          setViewPassword={setViewPassword}
          loggingIn={loggingIn}
          errors={errors}
        />}
    </>
  )
}

export default Login;