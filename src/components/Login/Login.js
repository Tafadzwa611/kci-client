import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { makeRequest } from '../../utils';
import NormalLogin from './NormalLogin';
import OTPLogin from './OTPLogin';
import Cookies from 'js-cookie';
import { LoggedInUserContext } from '../Context';

function Login() {
  const {setLoggedInUser} = useContext(LoggedInUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const normalLogin = async (e) => {
    e.preventDefault();
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
        navigate('/main');
      }
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
      navigate('/main');
    }
    setVerifyingOtp(false);
  }

  return (
    <>
      {otpRequired ?
        <OTPLogin login={otpLogin} token={token} setToken={setToken} verifyingOtp={verifyingOtp} /> :
        <NormalLogin
          login={normalLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          viewPassword={viewPassword}
          setViewPassword={setViewPassword}
          loggingIn={loggingIn}
        />}
    </>
  )
}

export default Login;