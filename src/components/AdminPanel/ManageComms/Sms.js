import React, { useState } from 'react';
import {
  Modal,
  NonFieldErrors,
  CustomInput,
  CustomSelect,
  SubmitButton
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
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Gateway: {gateway.gateway}</li>
            <li>Sender ID: {gateway.sender_id}</li>
          </ul>
        </div>
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
              <div className='divider divider-info'><span>Gateway Info</span></div>
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
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Sms;