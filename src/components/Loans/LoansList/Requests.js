import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { 
  ActionModal,
  NonFieldErrors,
  ModalActionSubmit,
  CustomTextField,
  Modal,
  ModalSubmit
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';


const MODAL_STATES = {
  approve: 'approve',
  reject: 'reject',
  none: false,
};


function Requests({requests, setLoan, updateLoanList, setLoanData}) {
  const { approve, reject, none } = MODAL_STATES;
  const [modal, setModal] = React.useState(none);
  const requestRef = React.useRef(null);

  const openApproveModal = (evt) => {
    const request = requests.find(request => request.id == evt.target.id);
    requestRef.current = request;
    setModal(approve);
  }

  const openDeleteModal = (evt) => {
    const request = requests.find(request => request.id == evt.target.id);
    requestRef.current = request;
    setModal(reject);
  }

  return (
    <div>
      {modal == approve && (
        <ApprovePayment
          request={requestRef.current}
          setOpen={setModal}
          setLoan={setLoan}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />
      )}
      {modal == reject && (
        <RejectRequest
          request={requestRef.current}
          setOpen={setModal}
          setLoan={setLoan}
        />
      )}
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default client__details'
          table='requests'
          filename='Requests'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div className='table-responsive full__table'>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div style={{maxHeight:'600px'}}>
              <table className='table' id='requests'>
                <thead>
                  <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                    <th className='schedule__table'>Request_ID</th>
                    <th className='schedule__table'>Date_Recorded</th>
                    <th className='schedule__table'>Collection_Date</th>
                    <th className='schedule__table'>Requested_by</th>
                    <th className='schedule__table'>Status</th>
                    <th className='schedule__table'>Cash Account Name</th>
                    <th className='schedule__table'>Total_Amount_Paid</th>
                    <th className='schedule__table'>Receipt_Number</th>
                    <th className='schedule__table'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request.id}>
                      <td className='schedule__table'>{request.id}</td>
                      <td className='schedule__table'>{request.created_at_dt}</td>
                      <td className='schedule__table'>{request.value_date}</td>
                      <td className='schedule__table'>{request.user_name}</td>
                      <td className='schedule__table'>{request.status}</td>
                      <td className='schedule__table'>{request.cash_account_name}</td>
                      <td className='schedule__table'>{request.amount_paid}</td>
                      <td className='schedule__table'>{request.receipt_number || 'N/A'}</td>
                      <td className='schedule__table'>
                        <button 
                          id={request.id} 
                          onClick={openApproveModal} 
                          style={{
                          background:"#1bbf5f", 
                          color:"#fff", 
                          border:"none", 
                          borderRadius:".15rem", 
                          cursor:"pointer", 
                          padding:".2rem .25rem",
                          fontSize: "0.75rem",
                          marginLeft:"5px",
                          }}
                        >
                          Approve
                        </button>
                        <button
                          id={request.id} 
                          onClick={openDeleteModal} 
                          style={{
                          background:"#f5424b", 
                          color:"#fff", 
                          border:"none", 
                          borderRadius:".15rem", 
                          cursor:"pointer", 
                          padding:".2rem .25rem",
                          marginLeft:"5px",
                          fontSize: "0.75rem",
                          }}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ApprovePayment({request, setOpen, setLoan}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(`/loansapi/approve_payment_request/${request.id}/`, values, CONFIG);
      const updates = response.data.payment_data;
      setLoan(currentLoan => {
        currentLoan.status = updates.status;
        currentLoan.installments = updates.installments;
        currentLoan.txns = updates.txns;
        currentLoan.payments.unshift(updates.payment);
        currentLoan.principal_amount_due = updates.principal_amount_due;
        currentLoan.interest_amount_due = updates.interest_amount_due;
        currentLoan.non_deductable_fees = updates.non_deductable_fees;
        currentLoan.balance = updates.balance;
        currentLoan.money_to_be_refunded = updates.money_to_be_refunded;
        currentLoan.total_amount_paid = updates.total_amount_paid;
        currentLoan.requests = currentLoan.requests.filter(req => req.id !== request.id);
        return {...currentLoan};
      });
      setOpen(false);
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
    <ActionModal text='add'>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='title' style={{fontSize: '0.875rem'}}>
              Are you sure you want to approve this request?<br/>
              <b>
                Amount: {request.amount_paid}<br/>
                Requested By: {request.user_name}<br/>
                Collection Date: {request.value_date}<br/>
                Date Requested: {request.created_at_dt}<br/>
              </b>
            </div>
            <ModalActionSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} act={'Approve'} />
            <NonFieldErrors errors={errors}/>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}


const RejectRequest = ({setOpen, request, setLoan}) => {
  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.post(`/loansapi/reject_payment_request/${request.id}/`, values, CONFIG);
      setLoan(curr => ({
        ...curr,
        requests: curr.requests.filter(req => req.id !== request.id)
      }));
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
    <Modal open={true} setOpen={setOpen} title={'Edit Payment'}>
      <Formik initialValues={{reason: ''}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  Are you sure you want to approve this request?<br/>
                  <b>
                    Amount: {request.amount_paid}<br/>
                    Requested By: {request.user_name}<br/>
                    Collection Date: {request.value_date}<br/>
                    Date Requested: {request.created_at_dt}<br/>
                  </b>
                  <CustomTextField label='Reason' name='reason' required/>
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

export default Requests;