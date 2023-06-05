import React, { useState } from 'react';
import { SubmitButton } from '../../../common';

const FormStepper = ({ children, isSubmitting, customForms, client_type_id }) => {
  const stepsArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentStep = stepsArray[step];
  const nativeForms = ['Client Information', 'Client Address', 'Next of Kin', 'Identification'];
  const applicableForms = customForms.filter(form => form.client_type_id == client_type_id);
  const numberOfSteps = nativeForms.length + customForms.length;

  return (
    <>
      <div className='bloc-tabs'>
        {nativeForms.map((form, index) => <div key={index} className={step === index ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(index)}>{form}</div>)}
        {applicableForms.map((form, index) => (
          <div key={index} className={step === index + nativeForms.length ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(index + nativeForms.length)}>
            {form.name}
          </div>
        ))}
        <div className={step === numberOfSteps ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(numberOfSteps)}>Overview</div>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {currentStep}
      </div>
      <div className='load-more-container'>
        {step > 0 && <div onClick={()=>setStep(curr => curr-1)} className='btn btn-default'>Back</div>}
        {step < numberOfSteps && <div onClick={()=>setStep(curr => curr+1)} className='btn btn-info'>Next</div>}
        <SubmitButton isSubmitting={isSubmitting}/>
      </div>
    </>
  )
}

export default FormStepper;