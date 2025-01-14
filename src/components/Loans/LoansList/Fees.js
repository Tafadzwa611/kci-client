import React, { useState, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  NonFieldErrors,
  ActionModal,
  ActionModalDialog
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function Fees({fees, setLoan}) {
  const [showDelete, setDelete] = useState(false);
  const feeId = useRef(null);

  const showDeleteModal = (evt) => {
    feeId.current = evt.target.id;
    setDelete(true);
  }

  return (
    <>
      {showDelete ? <DeleteFee feeId={feeId.current} setLoan={setLoan} setOpenModal={setDelete} /> : null}
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default client__details'
          table='penalties'
          filename={'Applied Fees'}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div style={{overflowX:'auto', maxHeight:'600px'}}>
          <table className='table' id='penalties'>
            <thead>
              <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                <th className='schedule__table'>Fee Date</th>
                <th className='schedule__table'>Receipt Number</th>
                <th className='schedule__table'>Fee Name</th>
                <th className='schedule__table'>Total Amount</th>
                <th className='schedule__table'>Amount Due</th>
                <th className='schedule__table'>Status</th>
                <th className='schedule__table'>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id}>
                  <td className='schedule__table'>{fee.value_date}</td>
                  <td className='schedule__table'>{fee.receipt_number}</td>
                  <td className='schedule__table'>{fee.fee_name}</td>
                  <td className='schedule__table'>{fee.amount}</td>
                  <td className='schedule__table'>{fee.amount_due}</td>
                  <td className='schedule__table'>{fee.status}</td>
                  <td className='schedule__table'>
                    <span className='badge badge-danger' id={fee.id} onClick={showDeleteModal} style={{cursor: 'pointer'}}>
                      Reverse
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function DeleteFee({setOpenModal, setLoan, feeId}) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/loansapi/delete_fee/${feeId}/`, CONFIG);
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
              <ActionModalDialog isSubmitting={isSubmitting} act={'Reverse'} msg={'Are you sure you want to reverse this fee.'} setOpen={setOpenModal}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default Fees;