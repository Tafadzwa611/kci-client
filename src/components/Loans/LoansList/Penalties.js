import React, { useState, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  SuccessBtn,
  NonFieldErrors,
  CustomInput,
  CustomTextField,
  ActionModal,
  ActionModalDialog,
  SubmitButton
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function Penalties({penalties, client_name, loanId, setLoan}) {
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const penId = useRef(null);

  const showDeleteModal = (evt) => {
    penId.current = evt.target.id;
    setDelete(true);
  }

  return (
    <>
      <SuccessBtn handler={() => setShowForm(curr => !curr)} value={'Add Penalty'}/>
      {showForm ? <PenaltyForm loanId={loanId} setLoan={setLoan} /> : null}
      {showDelete ? <DeletePenalty penaltyId={penId.current} setLoan={setLoan} setOpenModal={setDelete} /> : null}
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='penalties'
          filename={`${client_name}'s penalties`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{overflowX:'auto', maxHeight:'600px'}} className='miniLoanDetails-container'>
        <table className='table' id='penalties'>
          <thead>
            <tr className='journal-details schedule__tables' style={{position:'sticky', top:'0'}}>
              <th className='schedule__table'>Penalty Date</th>
              <th className='schedule__table'>Reason for Penalty</th>
              <th className='schedule__table'>Amount</th>
              <th className='schedule__table'>Amount Paid</th>
              <th className='schedule__table'>Amount Due</th>
              <th className='schedule__table'>Status</th>
              <th className='schedule__table'>Action</th>
            </tr>
          </thead>
          <tbody>
            {penalties.map(penalty => (
              <tr key={penalty.id}>
                <td className='schedule__table'>{penalty.cdate_created}</td>
                <td className='schedule__table'>{penalty.description}</td>
                <td className='schedule__table'>{penalty.amount_for_fixed_amount_penalty}</td>
                <td className='schedule__table'>{penalty.amount_paid}</td>
                <td className='schedule__table'>{penalty.amount_due}</td>
                <td className='schedule__table'>{penalty.status}</td>
                <td className='schedule__table'>
                  <span className='badge badge-danger' id={penalty.id} onClick={showDeleteModal} style={{cursor: 'pointer'}}>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const PenaltyForm = ({loanId, setLoan}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/add_loan_penalty/${loanId}/`, values, CONFIG);
      setLoan(response.data);
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

  return (
    <Formik initialValues={{description: '', penalty_amount: ''}} onSubmit={onSubmit}>
      {({ isSubmitting, errors }) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <CustomInput label='Amount' name='penalty_amount' type='number' required/>
            <CustomTextField label='Description' name='description' type='text' required/>
            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
            <SubmitButton isSubmitting={isSubmitting}/>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

function DeletePenalty({setOpenModal, setLoan, penaltyId}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/loansapi/delete_penalty/${penaltyId}/`, CONFIG);
      setLoan(response.data);
      setOpenModal(false);
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
              <ActionModalDialog isSubmitting={isSubmitting} act={'Delete'} msg={'Are you sure you want to delete this penalty.'} setOpen={setOpenModal}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default Penalties;