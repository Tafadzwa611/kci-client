import React, { useState } from 'react';
import { Fetcher, ActionModal, NonFieldErrors, ModalActionSubmit } from '../../../../common';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function DetailAccount() {
  const params = useParams();
  return (
    <Fetcher urls={[`/acc-api/sub-account-details/${params.detailAccountId}/`]}>
      {({data}) => <DetailAccountInfo detailAccount={data[0]}/>}
    </Fetcher>
  )
}

const DetailAccountInfo = ({detailAccount}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      {openDeleteModal ? <DeleteDetailAccount setOpen={setOpenDeleteModal} detailAccountId={detailAccount.id} /> : null}
      <div>
        <div className='client-state-btns' style={{display: 'flex', columnGap: '3px'}}>
          <button className='btn btn-olive'>
            <Link to={`/accounting/viewaccounting/chartsofaccounts/editdetailaccount/${detailAccount.id}`}>Edit</Link>
          </button>
          <button className='btn btn-olive' onClick={() => setOpenDeleteModal(true)}>Delete</button>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>General Ledger Name: {detailAccount.general_ledger_name}</li>
            <li>General Ledger Code: {detailAccount.general_ledger_code}</li>
            <li>Account Type: {detailAccount.account_type}</li>
            <li>Branch: {detailAccount.branch}</li>
            <li>Header Account: {`${detailAccount.header_account}`}</li>
            <li>Header Account Code: {`${detailAccount.header_account_code}`}</li>
            <li>Is Suspended: {`${detailAccount.suspended}`}</li>
            <li>Is Cash Account: {`${detailAccount.is_cash_account}`}</li>
            <li>Is System Account: {`${detailAccount.is_system_account}`}</li>
            <li>Currency: {detailAccount.currency}</li>
            <li>Account balance: {detailAccount.currency} {detailAccount.account_balance}</li>
            <li>Account Date: {detailAccount.account_open_date}</li>
            <li>Description: {detailAccount.description}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function DeleteDetailAccount({setOpen, detailAccountId}) {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/acc-api/delete_detail_account/${detailAccountId}/`, CONFIG);
      setOpen(false);
      navigate({pathname: '/accounting/viewaccounting/chartsofaccounts'});
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
              <div className='title' style={{fontSize: '0.875rem'}}>
                Are you sure you want to delete this account.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act='Delete'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DetailAccount;