import React, { useEffect, useState } from 'react';
import { Fetcher, Modal, NonFieldErrors, ModalSubmit, CustomMultiSelect, ActionModal, ModalActionSubmit } from '../../../../common';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function HeaderAccount() {
  const params = useParams();
  return (
    <Fetcher urls={[`/acc-api/get_header_account/${params.headerAccountId}/`]}>
      {({data}) => <HeaderAccountDetails data={data[0]}/>}
    </Fetcher>
  )
}

const HeaderAccountDetails = ({data}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [detAccId, setDetAccId] = useState(null);
  const [headerAccount, setHeaderAccount] = useState(data);

  useEffect(() => {
    if (detAccId !== null) {
      setOpenRemoveModal(true);
    }
  }, [detAccId]);

  useEffect(() => {
    if (!openRemoveModal) {
      setDetAccId(null);
    }
  }, [openRemoveModal]);

  return (
    <>
      {openModal ? <UpdateDetailAccounts open={openModal} setOpen={setOpenModal} setHeaderAccount={setHeaderAccount} headerAccountId={headerAccount.id} /> : null}
      {openRemoveModal ? <RemoveAccount setOpen={setOpenRemoveModal} setHeaderAccount={setHeaderAccount} detAccId={detAccId} /> : null}
      {openDeleteModal ? <DeleteHeaderAccount setOpen={setOpenDeleteModal} headerAccountId={headerAccount.id} /> : null}
      <div style={{marginBottom:'1rem'}}>
        <button type='button' className='btn btn-default max'>
          <Link to='/accounting/viewaccounting/chartsofaccounts/headeraccounts'>Back</Link>
        </button>
      </div>
      <div style={{padding:'1.5rem'}} className='j-details-container'>
        <div>
          <div className='client-state-btns' style={{display: 'flex', justifyContent:'space-between'}}>
            <div style={{display:'flex', columnGap:'5px'}}>
              <button className='btn btn-olive'>
                <Link to={`/accounting/viewaccounting/chartsofaccounts/editheaderaccount/${headerAccount.id}`}>Edit</Link>
              </button>
              <button className='btn btn-olive' onClick={() => setOpenModal(true)}>Update Detail Accounts</button>
            </div>
            <div>
              <button className='btn btn-olive' onClick={() => setOpenDeleteModal(true)}>Delete</button>
            </div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
          <div>
            <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
              <li>General Ledger Name: {headerAccount.general_ledger_name}</li>
              <li>General Ledger Code: {headerAccount.general_ledger_code}</li>
              <li>Account Type: {headerAccount.account_type}</li>
              <li>Account Date: {headerAccount.account_date}</li>
              <li>Description: {headerAccount.description}</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{margin:'1.5rem 0 1rem', display:'flex', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center'}}>
          <span style={{marginRight:'5px'}}><b>Detail Accounts</b></span>
        </div>
      </div>
      <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
        <div className='full__table'>
          <div className='table-responsive'>
            <div className='table__height'>
              <table className='table'>
                <tbody>
                  <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                    <th>General Ledger Code</th>
                    <th>General Ledger Name</th>
                    <th>Branch Name</th>
                    <th>Account Type</th>
                    <th>Account Date</th>
                    <th>Account Balance</th>
                    <th>Action</th>
                  </tr>
                  {headerAccount.detail_accounts.map(acc => {
                    return (
                      <tr key={acc.id}>
                        <td>{acc.general_ledger_code}</td>
                        <td>{acc.general_ledger_name}</td>
                        <td>{acc.branch__name}</td>
                        <td>{acc.account_type}</td>
                        <td>{acc.account_date}</td>
                        <td>{acc.currency__shortname} {acc.account_balance}</td>
                        <td>
                          <button
                            id={acc.id}
                            onClick={e => setDetAccId(e.target.id)}
                            style={{background:'#f5424b', color:'#fff', border:'none', borderRadius:'.15rem', cursor:'pointer', padding:'.2rem .25rem', marginLeft:'5px',fontSize: '0.75rem'}}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}

const UpdateDetailAccounts = ({open, setOpen, setHeaderAccount, headerAccountId}) => {

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.put(`/acc-api/add_detail_account/${headerAccountId}/${values.detail_account.value}/`, {}, CONFIG);
      setHeaderAccount(curr => ({...curr, detail_accounts: [response.data, ...curr.detail_accounts]}));
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

  return (
    <Modal title='Update Detail Accounts' setOpen={setOpen} open={open}>
      <Fetcher urls={['/acc-api/sub-accounts-list/']}>
        {({data}) => (
          <Formik initialValues={{detail_account: ''}} onSubmit={onSubmit}>
            {({ errors, setFieldValue, isSubmitting }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className="create_modal_container">
                    <div>
                      <CustomMultiSelect
                        required
                        isMulti={false}
                        label='Detail Account'
                        setFieldValue={setFieldValue}
                        name='detail_account'
                        options={data[0].map(acc => ({value: acc.id, label: `${acc.currency} ${acc.general_ledger_code} ${acc.general_ledger_name} ${acc.branch}`}))}
                      />
                    </div>
                    <ModalSubmit text='add' isSubmitting={isSubmitting} setOpen={setOpen} />
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>
    </Modal>
  )
}

function RemoveAccount({setOpen, setHeaderAccount, detAccId}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/acc-api/remove_detail_account/${detAccId}/`, values, CONFIG);
      setHeaderAccount(curr => ({...curr, detail_accounts: curr.detail_accounts.filter(acc => acc.id != detAccId)}));
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
              <div className='title' style={{fontSize: '0.875rem'}}>
                Are you sure you want to remove this account.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act='Remove'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

function DeleteHeaderAccount({setOpen, headerAccountId}) {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/acc-api/delete_header_account/${headerAccountId}/`, CONFIG);
      setOpen(false);
      navigate({pathname: '/accounting/viewaccounting/chartsofaccounts/headeraccounts'});
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
                Are you sure you want to delete this header account.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act='Remove'/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default HeaderAccount;