import React, { useState } from 'react';
import { Form } from 'formik';
import { NonFieldErrors, SubmitButton } from '../../../common';

const FormStepper = ({ children, errors, isSubmitting, customForms, client_type_id }) => {
  const stepsArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = stepsArray[step];
  const nativeForms = ['New Client', 'Client Information', 'Client Address', 'Next of Kin', 'Client Files'];
  const applicableForms = customForms.filter(form => form.client_type_id == client_type_id);
  const numberOfSteps = nativeForms.length + customForms.length;

  return (
    <Form>
      <NonFieldErrors errors={errors}>
        <div className='bloc-tabs'>
          {nativeForms.map((form, index) => <button key={index} className={step === index ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_=>setStep(index)}>{form}</button>)}
          {applicableForms.map((form, index) => (
            <button key={index} className={step === index + nativeForms.length ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_=>setStep(index + nativeForms.length)}>
              {form.name}
            </button>
          ))}
          <button className={step === numberOfSteps ? 'tabs-client active-tabs' : 'tabs-client'} onClick={_=>setStep(numberOfSteps)}>Overview</button>
        </div>
        <div className='tab-content font-12' style={{marginTop:'3rem'}}>
          {currentStep}
        </div>
        <div className='load-more-container'>
          {step > 0 && <button onClick={_=>setStep(curr => curr-1)} type='button' className='btn btn-default'>Back</button>}
          {step < numberOfSteps && <button onClick={_=>setStep(curr => curr+1)} type='button' className='btn btn-info'>Next</button>}
          <SubmitButton isSubmitting={isSubmitting}/>
        </div>
      </NonFieldErrors>
    </Form>
  )
}

export default FormStepper;