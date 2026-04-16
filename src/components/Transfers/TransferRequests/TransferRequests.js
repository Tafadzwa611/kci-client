// import React from 'react';
// import { useBranches } from '../../../contexts/BranchesContext';
// import {
//   NonFieldErrors,
//   CustomSelectFilter,
//   SubmitButtonFilter,
//   ActionModal,
//   ModalActionSubmit,
//   CustomTextField,
//   Modal,
//   ModalSubmit
// } from '../../../common';
// import { Form, Formik } from 'formik';
// import { removeEmptyValues, getParams } from '../../../utils/utils';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { Link } from 'react-router-dom';

// const MODAL_STATES = {
//   approve: 'approve',
//   reject: 'reject',
//   none: false,
// };

// function TransferRequests() {
//   const [requests, setRequests] = React.useState(null);
//   const [params, setParams] = React.useState(null);

//   return (
//     <div>
//       <Filter setRequests={setRequests} setParams={setParams} />
//       <div style={{ paddingTop: '2rem' }}></div>
//       {requests && (
//         <Table
//           params={params}
//           requests={requests}
//           setRequests={setRequests}
//         />
//       )}
//     </div>
//   );
// }

// function Filter({ setRequests, setParams }) {
//   const initialValues = {
//     branch_id: '',
//     page_num: 1,
//     status: ''
//   };
//   const { branches } = useBranches();

//   const onSubmit = async (values, actions) => {
//     try {
//       const data = removeEmptyValues(values);
//       const params = getParams(data);
//       setParams(params);
//       const response = await axios.get('/acc-api/list_transfer_request/', { params: params });
//       setRequests(response.data);
//     } catch (error) {
//       if (error.message === 'Network Error') {
//         actions.setErrors({ responseStatus: 'Network Error' });
//       } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
//         actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
//       } else {
//         actions.setErrors({ responseStatus: error.response?.status });
//       }
//     }
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={onSubmit}>
//       {({ isSubmitting, errors }) => (
//         <div className='search_background'>
//           <div className='row-containers sf-shellwrap'>
//             <Form>
//               <NonFieldErrors errors={errors}>
//                 <div className='row row-payments row-loans sf-card'>
//                   <div className='sf-row sf-row-2'>
//                     <div className='row-payments-container sf-w-49'>
//                       <CustomSelectFilter label='Branch' name='branch_id' required>
//                         <option value=''>------</option>
//                         {branches.map(branch => (
//                           <option key={branch.id} value={branch.id}>
//                             {branch.name}
//                           </option>
//                         ))}
//                       </CustomSelectFilter>
//                     </div>

//                     <div className='row-payments-container sf-w-49'>
//                       <CustomSelectFilter label='Status' name='status'>
//                         <option value=''>------</option>
//                         <option value='Pending'>Pending</option>
//                         <option value='Approved'>Approved</option>
//                         <option value='Rejected'>Rejected</option>
//                       </CustomSelectFilter>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='sf-submit'>
//                   <SubmitButtonFilter isSubmitting={isSubmitting} />
//                 </div>
//               </NonFieldErrors>
//             </Form>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// }

// function Table({ params, requests, setRequests }) {
//   const { approve, reject } = MODAL_STATES;
//   const [modal, setModal] = React.useState(MODAL_STATES.none);
//   const requestRef = React.useRef(null);

//   const openApproveModal = (evt) => {
//     const request = requests.results.find(request => request.id == evt.target.id);
//     requestRef.current = request;
//     setModal(approve);
//   };

//     const openDeleteModal = (evt) => {
//       const request = requests.results.find(request => request.id == evt.target.id);
//       requestRef.current = request;
//       setModal(reject);
//     };

//   return (
//     <div style={{ display: 'block' }}>
//       {modal == approve && (
//         <ApprovePayment
//           request={requestRef.current}
//           setOpen={setModal}
//           setRequests={setRequests}
//         />
//       )}
//       {modal == reject && (
//         <RejectRequest
//           request={requestRef.current}
//           setOpen={setModal}
//           setRequests={setRequests}
//         />
//       )}

//       <TableHeader data={requests} params={params} setData={setRequests} />

//       <div style={{ padding: '0', border: 'none' }}>
//         <div style={{ width: '100%', overflowX: 'auto' }}>
//           <div className='table__height'>
//             <table className='table' id='requests'>
//               <thead>
//                 <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
//                   <th style={{ textAlign: 'start' }}>Date_Requested</th>
//                   <th style={{ textAlign: 'start' }}>Date_Approved</th>
//                   <th style={{ textAlign: 'start' }}>Date_Rejected</th>
//                   <th style={{ textAlign: 'start' }}>Initiator</th>
//                   <th style={{ textAlign: 'start' }}>Approver</th>
//                   <th style={{ textAlign: 'start' }}>Decliner</th>
//                   <th style={{ textAlign: 'start' }}>Status</th>
//                   <th style={{ textAlign: 'start' }}>Sending_Account</th>
//                   <th style={{ textAlign: 'start' }}>Receiving_Account</th>
//                   <th style={{ textAlign: 'start' }}>Transfer_Amount</th>
//                   <th style={{ textAlign: 'start' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.results.map(request => {
//                   return (
//                     <tr key={request.id}>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.transfer.date_added}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.date_approved}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.date_rejected}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.requested_by}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.approved_by}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.rejected_by}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.status}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.transfer.sending_branch_name}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.transfer.receiving_branch_name}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.transfer.amount}
//                       </td>
//                       <td style={{ verticalAlign: 'middle' }}>
//                         {request.status === 'Pending' && (
//                           <>
//                             <button
//                               id={request.id}
//                               onClick={openApproveModal}
//                               className='badge badge-success'
//                             >
//                               Approve
//                             </button>
//                             <button
//                               id={request.id}
//                               onClick={openDeleteModal}
//                               className='badge badge-danger'
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ApprovePayment({ request, setOpen, setRequests }) {
//   const updateItem = (id, newStatus, newApprover, dateApproved) => {
//     setRequests(curr => {
//       return {
//         ...curr,
//         results: curr.results.map(req => {
//           return req.id === id
//             ? {
//                 ...req,
//                 status: newStatus,
//                 approved_by: newApprover || req.approved_by,
//                 date_approved: dateApproved || req.date_approved,
//               }
//             : req;
//         })
//       };
//     });
//   };

//   const onSubmit = async (values, actions) => {
//     try {
//       const CONFIG = {
//         headers: {
//           'X-CSRFToken': Cookies.get('csrftoken'),
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       };
//       const response = await axios.post(`/acc-api/approve_transfer_request/${request.id}/`, values, CONFIG);
//       const updates = response.data;
//       console.log(updates);
//       updateItem(
//         request.id,
//         updates.status,
//         updates.approved_by,
//         updates.date_approved
//       );
//       setOpen(false);
//       actions.resetForm();
//     } catch (error) {
//       if (error.message === 'Network Error') {
//         actions.setErrors({ responseStatus: 'Network Error' });
//       } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
//         actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
//       } else {
//         actions.setErrors({ responseStatus: error.response?.status });
//       }
//     }
//   };

//   return (
//     <ActionModal text='add'>
//       <Formik initialValues={{}} onSubmit={onSubmit}>
//         {({ errors, isSubmitting }) => (
//           <Form>
//             <div className='title' style={{ fontSize: '0.875rem' }}>
//               Are you sure you want to approve this request?<br />
//               <b>
//                 Amount: {request.transfer.amount}<br />
//                 Requested By: {request.requested_by}<br />
//                 Date Requested: {request.transfer.date_added}<br />
//               </b>
//             </div>
//             <ModalActionSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} act={'Approve'} />
//             <NonFieldErrors errors={errors} />
//           </Form>
//         )}
//       </Formik>
//     </ActionModal>
//   );
// }

// const RejectRequest = ({ setOpen, request, setRequests }) => {
//   const updateItem = (id, newStatus, newDecliner, newReason) => {
//     setRequests(curr => {
//       return {
//         ...curr,
//         results: curr.results.map(req => {
//           return req.id === id ? { ...req, status: newStatus, rejected_by: newDecliner, reason: newReason } : req;
//         })
//       };
//     });
//   };

//   const onSubmit = async (values, actions) => {
//     try {
//       const CONFIG = {
//         headers: {
//           'X-CSRFToken': Cookies.get('csrftoken'),
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       };
//       const response = await axios.post(`/loansapi/reject_payment_request/${request.id}/`, values, CONFIG);
//       const updates = response.data;
//       updateItem(request.id, updates.status, updates.decliner, updates.reason);
//       setOpen(false);
//     } catch (error) {
//       if (error.message === 'Network Error') {
//         actions.setErrors({ responseStatus: 'Network Error' });
//       } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
//         actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
//       } else {
//         actions.setErrors({ responseStatus: error.response?.status });
//       }
//     }
//   };

//   return (
//     <Modal open={true} setOpen={setOpen} title={'Edit Payment'}>
//       <Formik initialValues={{ reason: '' }} onSubmit={onSubmit}>
//         {({ errors, isSubmitting }) => (
//           <Form>
//             <NonFieldErrors errors={errors}>
//               <div className='create_modal_container'>
//                 <div>
//                   Are you sure you want to approve this request?<br />
//                   <b>
//                     Amount: {request.amount_paid}<br />
//                     Requested By: {request.user_name}<br />
//                     Collection Date: {request.value_date}<br />
//                     Date Requested: {request.created_at_dt}<br />
//                   </b>
//                   <CustomTextField label='Reason' name='reason' required />
//                 </div>
//                 <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen} />
//               </div>
//             </NonFieldErrors>
//           </Form>
//         )}
//       </Formik>
//     </Modal>
//   );
// };

// const TableHeader = ({ data, params, setData }) => {
//   return (
//     <div className='table-header'>
//       <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
//         <Pager
//           nextPageNumber={data.next_page_num}
//           params={params}
//           prevPageNumber={data.prev_page_num}
//           setData={setData}
//         />
//         <div style={{ marginTop: '6px' }}>Showing {data.results.length} of {data.count} payments.</div>
//       </div>
//       <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
//         <div style={{ marginTop: '6px' }}>Page {data.number} of {data.num_of_pages}</div>
//         <div>
//           <ReactHTMLTableToExcel
//             id='test-table-xls-button'
//             className='btn btn-default'
//             table='requests'
//             filename='Transfer Requests'
//             sheet='tablexls'
//             buttonText='Download as XLS'
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Pager = ({ prevPageNumber, nextPageNumber, setData, params }) => {
//   const [errors, setErrors] = React.useState(null);

//   const onClick = async (evt) => {
//     try {
//       const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
//       params.set('page_num', pageNum);
//       const response = await axios.get('/acc-api/list_transfer_request/', { params: params });
//       setData(response.data);
//     } catch (error) {
//       if (error.message === 'Network Error') {
//         setErrors({ detail: 'Network Error' });
//       } else {
//         setErrors({ detail: 'Server Error' });
//       }
//     }
//   };

//   return (
//     <div className='footer-container font-12 text-light' style={{ display: 'flex', columnGap: '3px' }}>
//       {errors && JSON.stringify(errors)}
//       {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br /></>}
//       {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button> : null}
//     </div>
//   );
// };

// export default TransferRequests;

import React from 'react';
import { useBranches } from '../../../contexts/BranchesContext';
import {
  NonFieldErrors,
  CustomSelectFilter,
  SubmitButtonFilter,
  ActionModal,
  ModalActionSubmit,
  CustomTextField,
  Modal,
  ModalSubmit
} from '../../../common';
import { Form, Formik } from 'formik';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

const MODAL_STATES = {
  approve: 'approve',
  reject: 'reject',
  none: false,
};

function TransferRequests() {
  const [requests, setRequests] = React.useState(null);
  const [params, setParams] = React.useState(null);

  return (
    <div>
      <Filter setRequests={setRequests} setParams={setParams} />
      <div style={{ paddingTop: '2rem' }}></div>
      {requests && (
        <Table
          params={params}
          requests={requests}
          setRequests={setRequests}
        />
      )}
    </div>
  );
}

function Filter({ setRequests, setParams }) {
  const initialValues = {
    branch_id: '',
    page_num: 1,
    status: ''
  };
  const { branches } = useBranches();

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/acc-api/list_transfer_request/', { params: params });
      setRequests(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, errors }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>
                  <div className='sf-row sf-row-2'>
                    <div className='row-payments-container sf-w-49'>
                      <CustomSelectFilter label='Branch' name='branch_id' required>
                        <option value=''>------</option>
                        {branches.map(branch => (
                          <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>

                    <div className='row-payments-container sf-w-49'>
                      <CustomSelectFilter label='Status' name='status'>
                        <option value=''>------</option>
                        <option value='Pending'>Pending</option>
                        <option value='Approved'>Approved</option>
                        <option value='Rejected'>Rejected</option>
                      </CustomSelectFilter>
                    </div>
                  </div>
                </div>

                <div className='sf-submit'>
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

function Table({ params, requests, setRequests }) {
  const { approve, reject } = MODAL_STATES;
  const [modal, setModal] = React.useState(MODAL_STATES.none);
  const requestRef = React.useRef(null);

  const openApproveModal = (evt) => {
    const request = requests.results.find(request => request.id == evt.target.id);
    requestRef.current = request;
    setModal(approve);
  };

  const openDeleteModal = (evt) => {
    const request = requests.results.find(request => request.id == evt.target.id);
    requestRef.current = request;
    setModal(reject);
  };

  return (
    <div style={{ display: 'block' }}>
      {modal == approve && (
        <ApprovePayment
          request={requestRef.current}
          setOpen={setModal}
          setRequests={setRequests}
        />
      )}
      {modal == reject && (
        <RejectRequest
          request={requestRef.current}
          setOpen={setModal}
          setRequests={setRequests}
        />
      )}

      <TableHeader data={requests} params={params} setData={setRequests} />

      <div style={{ padding: '0', border: 'none' }}>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div className='table__height'>
            <table className='table' id='requests'>
              <thead>
                <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                  <th style={{ textAlign: 'start' }}>Date_Requested</th>
                  <th style={{ textAlign: 'start' }}>Date_Approved</th>
                  <th style={{ textAlign: 'start' }}>Date_Rejected</th>
                  <th style={{ textAlign: 'start' }}>Initiator</th>
                  <th style={{ textAlign: 'start' }}>Approver</th>
                  <th style={{ textAlign: 'start' }}>Decliner</th>
                  <th style={{ textAlign: 'start' }}>Status</th>
                  <th style={{ textAlign: 'start' }}>Sending_Account</th>
                  <th style={{ textAlign: 'start' }}>Receiving_Account</th>
                  <th style={{ textAlign: 'start' }}>Transfer_Amount</th>
                  <th style={{ textAlign: 'start' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.results.map(request => {
                  return (
                    <tr key={request.id}>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.transfer.date_added}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.date_approved}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.date_rejected}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.requested_by}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.approved_by}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.rejected_by}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.status}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.transfer.sending_branch_name}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.transfer.receiving_branch_name}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {request.transfer.amount}
                      </td>
                      <td style={{ verticalAlign: 'middle', display:'flex', columnGap:'5px' }}>
                        {request.status === 'Pending' && (
                          <>
                            <button
                              id={request.id}
                              onClick={openApproveModal}
                              className='badge badge-success'
                            >
                              Approve
                            </button>
                            <button
                              id={request.id}
                              onClick={openDeleteModal}
                              className='badge badge-danger'
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApprovePayment({ request, setOpen, setRequests }) {
  const updateItem = (id, newStatus, newApprover, dateApproved) => {
    setRequests(curr => {
      return {
        ...curr,
        results: curr.results.map(req => {
          return req.id === id
            ? {
                ...req,
                status: newStatus,
                approved_by: newApprover || req.approved_by,
                date_approved: dateApproved || req.date_approved,
              }
            : req;
        })
      };
    });
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(`/acc-api/approve_transfer_request/${request.id}/`, values, CONFIG);
      const updates = response.data;
      console.log(updates);
      updateItem(
        request.id,
        updates.status,
        updates.approved_by,
        updates.date_approved
      );
      setOpen(false);
      actions.resetForm();
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <ActionModal text='add'>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='title' style={{ fontSize: '0.875rem' }}>
              Are you sure you want to approve this request?<br />
              <b>
                Amount: {request.transfer.amount}<br />
                Requested By: {request.requested_by}<br />
                Date Requested: {request.transfer.date_added}<br />
              </b>
            </div>
            <ModalActionSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} act={'Approve'} />
            <NonFieldErrors errors={errors} />
          </Form>
        )}
      </Formik>
    </ActionModal>
  );
}

const RejectRequest = ({ setOpen, request, setRequests }) => {
  const updateItem = (id, newStatus, newDecliner, newReason, dateRejected) => {
    setRequests(curr => {
      return {
        ...curr,
        results: curr.results.map(req => {
          return req.id === id
            ? {
                ...req,
                status: newStatus,
                rejected_by: newDecliner || req.rejected_by,
                rejection_reason: newReason || req.rejection_reason,
                date_rejected: dateRejected || req.date_rejected,
              }
            : req;
        })
      };
    });
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(`/acc-api/reject_transfer_request/${request.id}/`, values, CONFIG);
      const updates = response.data;
      updateItem(
        request.id,
        updates.status,
        updates.rejected_by,
        updates.rejection_reason,
        updates.date_rejected
      );
      setOpen(false);
      actions.resetForm();
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <Modal open={true} setOpen={setOpen} title={'Reject Transfer Request'}>
      <Formik initialValues={{ rejection_reason: '' }} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  Are you sure you want to reject this request?<br />
                  <b style={{fontSize:'0.8125rem'}}>
                    Amount: {request.transfer.amount}<br />
                    Requested By: {request.requested_by}<br />
                    Date Requested: {request.transfer.date_added}<br />
                  </b>
                  <CustomTextField label='Reason' name='rejection_reason' required />
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen} />
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const TableHeader = ({ data, params, setData }) => {
  return (
    <div className='table-header'>
      <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
        <Pager
          nextPageNumber={data.next_page_num}
          params={params}
          prevPageNumber={data.prev_page_num}
          setData={setData}
        />
        <div style={{ marginTop: '6px' }}>Showing {data.results.length} of {data.count} payments.</div>
      </div>
      <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
        <div style={{ marginTop: '6px' }}>Page {data.number} of {data.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='requests'
            filename='Transfer Requests'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  );
};

const Pager = ({ prevPageNumber, nextPageNumber, setData, params }) => {
  const [errors, setErrors] = React.useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/acc-api/list_transfer_request/', { params: params });
      setData(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({ detail: 'Network Error' });
      } else {
        setErrors({ detail: 'Server Error' });
      }
    }
  };

  return (
    <div className='footer-container font-12 text-light' style={{ display: 'flex', columnGap: '3px' }}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber && <><button className='btn btn-default' onClick={onClick}>Back</button><br /></>}
      {nextPageNumber ? <button className='btn btn-default' onClick={onClick}>Next</button> : null}
    </div>
  );
};

export default TransferRequests;