import React from 'react';
import { Form, Formik } from 'formik';
import {ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';


const DeleteIncome = ({setOpen, incomeID, setOtherIncomeData, setIncomeId}) => {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/otherincomeapi/delete_otherincome/${incomeID}/`, CONFIG);
      setOtherIncomeData(curr => {
        return {
          count: curr.count - 1,
          next_page_num: curr.next_page_num,
          otherincomes: curr.otherincomes.filter(income => income.id !== incomeID)
        }
      });
      setIncomeId(null);
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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="title" style={{fontSize: "0.875rem"}}>
                Are you sure you want to delete income.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteIncome;