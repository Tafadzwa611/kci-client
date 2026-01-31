import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomMultiSelect,
  CustomDatePicker,
  ModalSubmit,
  Modal
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


function PayExpense({expense, setExpense, setOpen}) {
  const [accounts, setAccounts] = React.useState(null);

  React.useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await axios.get('/acc-api/cash-accounts-list/');
        setAccounts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAccounts();
  }, []);

  if (!accounts) {
    return <div>Loading...</div>
  }

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const data = {
        value_date: values.value_date,
        fund_account_id: values.fund_account.value
      }
      const response = await axios.patch(`/expensesapi/pay_expense/${expense.id}/`, data, CONFIG);
      setExpense(curr => ({...curr, ...response.data}));
      setOpen(false);
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
    <Modal open={true} setOpen={setOpen} title={'Pay Expense'}>
      <Formik initialValues={{value_date: '', fund_account: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomDatePicker label='Payment Date' name='value_date' setFieldValue={setFieldValue} required/>
                <CustomMultiSelect
                  label='Fund Account'
                  name='fund_account'
                  isMulti={false}
                  setFieldValue={setFieldValue}
                  options={accounts.accounts.filter(account => !account.suspended && account.currency_id == expense.currency_id).map(account => (
                    {label: `${account.label} - ${account.branch}`, value: account.value}
                  ))}
                  required
                />
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              <NonFieldErrors errors={errors}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default PayExpense;