import React, { useState, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  NonFieldErrors,
  Modal,
  CustomDatePicker,
  ModalSubmit
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
                <th className='schedule__table'>Fee Name</th>
                <th className='schedule__table'>Amount</th>
                <th className='schedule__table'>Receipt Number</th>
                <th className='schedule__table'>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id}>
                  <td className='schedule__table'>{fee.value_date}</td>
                  <td className='schedule__table'>{fee.fee_name}</td>
                  <td className='schedule__table'>{fee.amount}</td>
                  <td className='schedule__table'>{fee.receipt_number}</td>
                  <td className='schedule__table'>
                    {fee.reversible && (
                      <span className='badge badge-danger' id={fee.id} onClick={showDeleteModal} style={{cursor: 'pointer'}}>
                        Reverse
                      </span>
                    )}
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
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/delete_fee/${feeId}/`, values, CONFIG);
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
    <Modal open={true} setOpen={setOpenModal} title='Reverse Fee'>
      <Formik initialValues={{value_date: ''}} onSubmit={onSubmit}>
        {({isSubmitting, setFieldValue, errors}) => (
          <Form>
            <NonFieldErrors errors={errors}>
            <div className='create_modal_container'>
                <div>
                  <CustomDatePicker label='Reversal Date' name='value_date' setFieldValue={setFieldValue} required/>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpenModal}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Fees;