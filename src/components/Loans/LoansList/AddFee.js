import React from 'react';
import {
  CustomSelect,
  NonFieldErrors,
  ModalSubmit,
  CustomInput,
  CustomTextField,
  Modal
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddFee({loanId, manualFees, setOpen, setLoan}) {
  const onSubmit = async (values, actions) => {
    const data = values.fee_type === 'Manual' ?
    {manual_fee_id: values.manual_fee_id} :
    {arbitrary_amount: values.arbitrary_amount, description: values.description};

    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_manual_fee/${loanId}/`, data, CONFIG);
      setLoan(response.data);
      setOpen(false);
      actions.resetForm();
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

  const initialValues = {fee_type: 'Manual', manual_fee_id: '', arbitrary_amount: '', description: ''};
  return (
    <Modal open={true} setOpen={setOpen} title={'Add Fee'}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomSelect label='Fee Type' name='fee_type' required>
                    <option value='Manual'>Manual</option>
                    <option value='Arbitrary'>Arbitrary</option>
                  </CustomSelect>
                  {values.fee_type === 'Manual' ?
                  <CustomSelect label='Select Manual Fee' name='manual_fee_id' required>
                    <option value=''>------</option>
                    {manualFees.map(fee => (<option key={fee.name} value={fee.id}>{fee.name}</option>))}
                  </CustomSelect> :
                  <>
                  <CustomInput label='Fee Amount' name='arbitrary_amount' type='number' required/>
                  <CustomTextField label='Description' name='description' type='text' required/>
                  </>}
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default AddFee;