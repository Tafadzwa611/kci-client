import React from 'react';
import Form from './Form';

function PrimaryContactInfo({clientInfo, setClientInfo, clientErrors, setClientErrors, setTab}) {
  const handleChange = (evt) => {
    setClientInfo(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
    if (evt.target.name in validators) {
      validators[evt.target.name](evt.target.value);
    }else {
      validate(evt);
    }
  }

  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setClientErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setClientErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  const validateEmail = email => {
    if (email !== '') {
      const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, email: 'Email is invalid'}
        });
      }else {
        setClientErrors(curr => {
          return {...curr, email: ''}
        });
      }
    }else {
      setClientErrors(curr => {
        return {...curr, email: ''}
      });
    }
  };

  const validateIdNum = idnum => {
    if (idnum !== '') {
      const re = /^\d{2}-{0,1}\d{6,7}\s{0,1}([a-zA-Z]\d{2})$/;
      if (!re.test(String(idnum).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, identification_number: 'ID number is invalid'}
        });
      }else {
        setClientErrors(curr => {
          return {...curr, identification_number: ''}
        });
      }
    }else {
      setClientErrors(curr => {
        return {...curr, identification_number: ''}
      });
    }
  }

  const validatePhoneNum = phoneNum => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNum !== '') {
      if (!re.test(String(phoneNum).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, phone_number: 'Phone number number is invalid'}
        });
        return 
      }
    }
    setClientErrors(curr => {
      return {...curr, phone_number: ''}
    })
  }

  const validators = {phone_number: validatePhoneNum, email: validateEmail, identification_number: validateIdNum};

  return <Form clientInfo={clientInfo} clientErrors={clientErrors} setTab={setTab} handleChange={handleChange} validate={validate} validateEmail={validateEmail}/>
}

export default PrimaryContactInfo;