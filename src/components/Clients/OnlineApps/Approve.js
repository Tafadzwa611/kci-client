import React from 'react';
import { Form, Formik } from 'formik';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomDatePicker,
  CustomSelect,
  Fetcher
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';

function Approve({setOpen, appId}) {
  const navigate = useNavigate();

  const initialValues = {
    approval_date: '',
    client_manager_id: '',
    ignore_warnings: false
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(`/clientsapi/approve_online_application/${appId}/`, data, CONFIG);
      navigate({pathname: `/clients/viewclients/clientdetails/${response.data.client_id}`});
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
    <Modal open={true} setOpen={setOpen} title={'Approve Client Application'}>
      <Fetcher urls={[`/usersapi/staff/?loan_officers_only=1`, '/clientsapi/client_controls/']}>
        {({data}) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='create_modal_container'>
                    <div>
                      <CustomDatePicker label='Approval Date' name='approval_date' setFieldValue={setFieldValue} required/>
                      <CustomSelect label='Client Manager' name='client_manager_id' required={data[1].client_officer_required}>
                        <option value=''>------</option>
                        {data[0].map(user => <option key={user.id} value={user.id}>{`${user.first_name} ${user.last_name} - ${user.branch__name}`}</option>)}
                      </CustomSelect>
                    </div>
                    <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
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

export default Approve;