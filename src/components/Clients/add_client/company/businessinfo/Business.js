import React, {useEffect} from 'react';
import Form from './Form';

function Business({businessInfo, businessErrors, setBusinessErrors, setBusinessInfo, setTab}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleChange = (evt) => {
    setBusinessInfo(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
    validate(evt);
  }

  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setBusinessErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setBusinessErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  return <Form businessInfo={businessInfo} businessErrors={businessErrors} handleChange={handleChange} validate={validate} setTab={setTab}/>
  
}

export default Business;