import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomDatePicker,
  ModalActionSubmit,
  NonFieldErrors,
  ActionModal,
  CustomMultiSelect,
  ModalSubmit,
  Modal
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const DeleteExpense = ({setOpen, expense, setExpenseId, setExpenseData}) => {
  const [accounts, setAccounts] = React.useState(null);
  const navigate = useNavigate();

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
      let data = {}
      if (expense.status === 1 && !expense.fund_account) {
        data = {
          reversal_date: values.reversal_date,
          fund_account_id: values.fund_account.value
        }
      }
      await axios.post(`/expensesapi/delete_expense/${expense.id}/`, data, CONFIG);
      setOpen(false);
      if (setExpenseId) {
        setExpenseId(null);
      }else {
        navigate({pathname: '/expenses/viewexpenses'});
      }
      if (setExpenseData) {
        setExpenseData(curr => {
          return {
            count: curr.count - 1,
            next_page_num: curr.next_page_num,
            expenses: curr.expenses.filter(exp => exp.id !== expense.id)
          }
        });
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

  if (expense.status === 1 && !expense.fund_account) {
    return (
      <Modal open={true} setOpen={setOpen} title={'Pay Expense'}>
        <Formik initialValues={{value_date: '', fund_account: ''}} onSubmit={onSubmit}>
          {({ errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className='create_modal_container'>
                <div>
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
                  <CustomDatePicker label='Reversal Date' name='reversal_date' setFieldValue={setFieldValue} required/>
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

  return (
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className="title" style={{fontSize: "0.875rem"}}>
              Are you sure you want to reverse expense.
            </div>
            <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            <NonFieldErrors errors={errors}/>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteExpense;