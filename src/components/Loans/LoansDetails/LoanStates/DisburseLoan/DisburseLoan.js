import React from 'react';
import { Form, Formik } from 'formik';
import { onModalSubmit } from '../utils';
import { disburseLoanSchema } from '../schemas';
import { Modal, CustomDatePicker, CustomSelect, CustomCheckbox, ModalSubmit, NonFieldErrors } from '../../../../../common';

const DisburseLoan = ({
  open, 
  setOpen, 
  selectedLoanID, 
  setLoan, 
  scheduleStrategies, 
  defaultScheduleStrategy, 
  firstRepaymentDate, 
  fund_accounts, 
  loan_officers
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
          fund_account_id: '',
          loan_officer_id: '',
        }} 
        validationSchema={disburseLoanSchema} 
        onSubmit={onSubmit}
      >
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomDatePicker label='Disbursement Date' setFieldValue={setFieldValue} name='loan_added_on' type='date'/>
                  <CustomDatePicker label='First Repayment Date' setFieldValue={setFieldValue} name='first_repayment_date' type='date'/>
                  <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy'>
                    {scheduleStrategies.map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Disbursement Method' name='fund_account_id'>
                    <option value=''>------</option>
                    {fund_accounts.map(fund => <option key={fund.id} value={fund.id}>{fund.general_ledger_name}-{fund.general_ledger_code}</option>)}
                  </CustomSelect>
                  <CustomSelect label='Loan Officer' name='loan_officer_id'>
                    <option value=''>------</option>
                    {loan_officers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
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

