import React from 'react';
import { Formik, Form } from 'formik';
import { NonFieldErrors } from '../../../common';
import { SubmitButton } from '../../../common';

const FormStepper = ({ children, customForms, clientType, step, setStep }) => {
  // const [step, setStep] = useState(0);
  const stepFunctions = [];
  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(subChild => stepFunctions.push(subChild))
    }else {
      stepFunctions.push(child);
    }
  });
  const currentStep = stepFunctions[step] || stepFunctions[0];
  const {component, validationSchema} = currentStep();
  const nativeForms = ['Client Information', 'Client Address', 'Next of Kin', 'Identification'];
  // const applicableForms = customForms.filter(form => form.client_type_id == client_type_id);
  const numberOfSteps = nativeForms.length + customForms.length;

  const initialValues = {
    client_type_id: clientType,
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    registration_date: '',
    mobile_number: {},
    phone_number_secondary: {},
    home_phone: '',
    whatsapp_number: {},
    email: '',
    address_list: [],
    next_of_kin_list: [],
    id_nums: [],
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    setStep(curr => curr+1);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form autoComplete='off'>
          <NonFieldErrors errors={errors}>
            <div className='bloc-tabs'>
              {nativeForms.map((form, index) => <div key={index} className={step === index ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(index)}>{form}</div>)}
              {customForms.filter(form => form.client_type_id == clientType).map((form, index) => (
                <div key={index} className={step === index + nativeForms.length ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(index + nativeForms.length)}>
                  {form.name}
                </div>
              ))}
              <div className={step === numberOfSteps ? 'tabs-client active-tabs' : 'tabs-client'} onClick={()=>setStep(numberOfSteps)}>Overview</div>
            </div>
            <div className='tab-content font-12' style={{marginTop:'3rem'}}>
              {component({setFieldValue, values})}
            </div>
            <div className='load-more-container'>
              {step > 0 && <div onClick={()=>setStep(curr => curr-1)} className='btn btn-default'>Back</div>}
              {step < numberOfSteps ?
              <button type='submit' className='btn btn-info'>Next</button> :
              <SubmitButton isSubmitting={isSubmitting}/>}
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default FormStepper;