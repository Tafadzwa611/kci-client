import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import { Modal, ModalSubmit, NonFieldErrors, CustomDatePicker, CustomInput } from '../../../common';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLoanControls } from '../../../contexts/LoanControlsContext';

export const approveLoanSchema = yup.object().shape({
  expected_disbursement_date: yup.string().required('Required')
});

const ApproveLoan = ({setOpen, url, setLoanDetails, updateLoanList, setLoanData, loanId}) => {
  const {loanControls} = useLoanControls();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(url, values, CONFIG);
      const newLoan = response.data;
      setLoanDetails(newLoan);
      setOpen(false);
      if (setLoanData && updateLoanList) {
        updateLoanList(newLoan, setLoanData);
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const initialValues = {
    expected_disbursement_date: '',
    ...(loanControls.request_otp_on_approval && {otp: ''})
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Approve Loan'}>
      <Formik initialValues={initialValues} validationSchema={approveLoanSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomDatePicker
                    label='Expected Disbursement Date'
                    name='expected_disbursement_date'
                    setFieldValue={setFieldValue}
                    required
                  />
                  {loanControls.request_otp_on_approval && <CustomInput label='OTP' name='otp' type='number' required/>}
                </div>
                {loanControls.request_otp_on_approval ?
                <ModalSubmitOTP isSubmitting={isSubmitting} setOpen={setOpen} loanId={loanId}/> :
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>}
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

const ModalSubmitOTP = ({isSubmitting, setOpen, loanId}) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = async () => {
    try {
      setIsLoading(true);
      await axios.get(`/loansapi/request_approval_otp/${loanId}/`);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }finally {
      setIsLoading(false);
    }
  }

  if (isSubmitting) {
    return (
      <div className="modal-footer justify-content-between" style={{padding: "1rem 0", marginTop:"1rem"}}>
        <span className='btn btn-default' onClick={(e) => setOpen(false)}>Close</span>
        <button className='btn btn-info' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
          <i className='fa fa-spinner fa-spin'></i> Please wait..
        </button>
      </div>
    )
  }

  return (
    <div className="modal-footer justify-content-between" style={{padding: "1rem 0", marginTop:"1rem"}}>
      <span className='btn btn-default' onClick={(e) => setOpen(false)}>Close</span>
      <div style={{display: 'flex', columnGap: '5px'}}>
        <button className='btn btn-default' type='button' onClick={requestOtp}>
          {isLoading ?
          <><i className='fa fa-spinner fa-spin'></i> Please wait..</>:
          'Request OTP'}
        </button>
        <button className='btn btn-info' type='submit'>Submit</button>
      </div>
    </div>
  )
}

export default ApproveLoan;