import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ActionModal, ActionModalDialog, NonFieldErrors } from '../../../../common';

function DeleteCollateral({setOpenModal, close, setCollaterals, collateralId}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/loansapi/delete_loan_collateral_type/${collateralId}/`, CONFIG);
      close();
      setOpenModal(false);
      setCollaterals(curr => curr.filter(cat => cat.id !== collateralId));
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

  return (
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({isSubmitting, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog
                isSubmitting={isSubmitting}
                act={'Delete'}
                msg={'Are you sure you want to delete this collateral type.'}
                setOpen={setOpenModal}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteCollateral;