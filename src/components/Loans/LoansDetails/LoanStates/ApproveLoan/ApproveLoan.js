import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from '../utils';
import { approveLoanSchema } from '../schemas';
import { Modal, CustomInput, ModalSubmit, NonFieldErrors } from '../../../../../common';

const ApproveLoan = ({open, setOpen, selectedLoanID, setLoan}) => {
  const onSubmit = async (values, actions) => {
    const sideEffect = () => setLoan(curr => ({...curr, status: 'Approved'}));
    const url = `/loansapi/approve_loan/${selectedLoanID}/`;
    onModalSubmit(values, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Approve Loan'}>
      <Formik initialValues={{expected_disbursement_date: ''}} validationSchema={approveLoanSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomInput label='Expected Disbursement Date' name='expected_disbursement_date' type='date'/>
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

export default ApproveLoan;