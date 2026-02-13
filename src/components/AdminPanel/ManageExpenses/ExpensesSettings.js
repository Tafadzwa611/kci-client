import React from 'react';
import axios from 'axios';
import {
  CustomCheckbox,
  SuccessBtn,
  Modal,
  CustomSelect,
  ModalSubmit
} from '../../../common';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';


function ExpenseSettings() {
  const [settings, SetSettings] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/expensesapi/expense_settings/');
      SetSettings(response.data);
    }
    fetch();
  }, []);

  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SuccessBtn handler={() => setOpenModal(true)} value='Update Expense Settings'/>
      <UpdateExpenseSettings
        open={openModal}
        setOpen={setOpenModal}
        settings={settings}
        SetSettings={SetSettings}
      />
      <div style={{display:'block'}}>
        <div style={{padding:'0', border:'none'}}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div className='table__height'>
              <table className='table'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th style={{textAlign:'start'}}>Control</th>
                    <th style={{textAlign:'start'}}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Accounting Method</td>
                    <td>{{1: 'Cash', 2: 'Accrual'}[settings.accounting_method]}</td>
                  </tr>
                  <tr>
                    <td>Use voucher book</td>
                    <td>{settings.use_voucher_book ? 'Yes' : 'No'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const UpdateExpenseSettings = ({open, setOpen, settings, SetSettings}) => {
  const onSubmit = async (values, actions) => {
    const data = {
      accounting_method: values.accounting_method,
      use_voucher_book: values.use_voucher_book
    };
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put('/expensesapi/update_expense_settings/', data, CONFIG);
      SetSettings(values);
      setOpen(false);
    } catch (error) {
      console.log(error);
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
    accounting_method: settings.accounting_method,
    use_voucher_book: settings.use_voucher_book
  };

  return (
    <Modal open={open} setOpen={setOpen} title={'Update Expense Settings'}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomSelect label='Accounting Method' name='accounting_method' required>
                  <option value='1'>Cash</option>
                  <option value='2'>Accrual</option>
                </CustomSelect>
                <CustomCheckbox
                  label='User Voucher Book'
                  name='use_voucher_book'
                />
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ExpenseSettings;