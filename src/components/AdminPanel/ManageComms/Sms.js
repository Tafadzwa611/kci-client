import React, { useState } from 'react';
import {
  Modal,
  NonFieldErrors,
  CustomInput,
  CustomSelect,
  ModalSubmit
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';

function Sms({data}) {
  const [modal, setModal] = useState(false);
  const [gateway, setGateway] = useState(data);

  return (
    <>
      {modal ? <GateWayForm setOpen={setModal} setGateway={setGateway}/> : null}
      <div style={{margin: '20px 0'}}>
        <button type='button' className='btn btn-success' onClick={() => setModal(true)}>Update Gateway</button>
      </div>
      <div className="table-responsive font-12">
        <table className="table table-hover">
          <tbody>
            <tr className="journal-details header">
              <th>Gateway</th>
              <th>Sender ID</th>
            </tr>  
            <tr className="table-row">
              <td>{gateway.gateway}</td>
              <td>{gateway.sender_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

const GateWayForm = ({setOpen, setGateway}) => {
  const initialValues = {gateway: '', econet_sender_id: '', econet_api_key: ''};

  const onSubmit = async (values, actions) => {
    const data = removeEmptyValues(values);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put('/usersapi/update_sms_gateway/', data, CONFIG);
      let senderId = 'Not Set';
      if (values.gateway === 'Default') {
        senderId = 'AlphaSol';
      }
      if (values.econet_sender_id !== '') {
        senderId = values.econet_sender_id;
      }
      setGateway({gateway: values.gateway, sender_id: senderId});
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
    <Modal open={true} setOpen={setOpen} title='Update Gateway'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, values }) => (
          <Form autoComplete='off'>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomSelect label='Gateway' name='gateway'>
                    <option value=''>------</option>
                    <option value='Not Set'>None</option>
                    <option value='Default'>Default</option>
                    <option value='Econet'>Econet</option>
                  </CustomSelect>
                  {values.gateway === 'Econet' ?
                  <>
                    <CustomInput label='Econet Sender ID' name='econet_sender_id' type='text' autoComplete='new-password' required/>
                    <CustomInput label='Econet Api Key' name='econet_api_key' type='text' required/>
                  </>: null}
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

export default Sms;