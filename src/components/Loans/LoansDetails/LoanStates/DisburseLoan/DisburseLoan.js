import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from '../utils';
import { disburseLoanSchema } from '../schemas';
import { Modal, CustomInput, CustomSelect, CustomCheckbox, ModalSubmit, NonFieldErrors } from '../../../../../common';

const DisburseLoan = ({
  open, 
  setOpen, 
  selectedLoanID, 
  setLoan, 
  scheduleStrategies, 
  defaultScheduleStrategy, 
  firstRepaymentDate, 
  currencies
}) => {
  const onSubmit = async (values, actions) => {
    const sideEffect = () => setLoan(curr => ({...curr, status: 'Open'}));
    const url = `/loansapi/disburse_loan/${selectedLoanID}/`;
    onModalSubmit(values, 'patch', url, actions.resetForm, setOpen, actions.setErrors, sideEffect);
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Disburse Loan'}>
      <Formik 
        initialValues={{
          loan_added_on: '', 
          schedule_strategy: defaultScheduleStrategy, 
          first_repayment_date: firstRepaymentDate,
          currency_id: '',
        }} 
        validationSchema={disburseLoanSchema} 
        onSubmit={onSubmit}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomInput label='Disbursement Date' name='loan_added_on' type='date'/>
                  <CustomInput label='First Repayment Date' name='first_repayment_date' type='date'/>
                  <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy'>
                    {scheduleStrategies.map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Currency' name='currency_id'>
                    <option value=''>------</option>
                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                  </CustomSelect>
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

export default DisburseLoan;

