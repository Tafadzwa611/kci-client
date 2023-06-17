import React from 'react';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ModalSubmit, NonFieldErrors, Modal, CustomSelect, CustomInput, Fetcher } from '../../../common';
import { processErrors } from './UpdatePersonalInfo';

function EditId({setOpen, setClient, ID}) {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.put(`/clientsapi/edit_client_id/${ID.id}/`, values, CONFIG);
      setClient(curr => ({...curr, id_nums: [response.data]}));
      setOpen(null);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, detail: processErrors(error.response.data)});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const initialValues = {id_number: ID.id_number, id_template_id: ID.id_template_id, ignore_warnings: false};
  return (
    <Modal open={true} setOpen={setOpen} title='Edit Identification' text='add'>
      <Fetcher urls={['/clientsapi/client_id_templates/']}>
        {({data}) => (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ errors, isSubmitting }) => (
                <Form autoComplete='off'>
                  <NonFieldErrors errors={errors}>
                    <div className='create_modal_container'>
                      <div>
                        <CustomInput label='Id Number' name='id_number' type='text'/>
                        <CustomSelect label='Id Number Template' name='id_template_id'>
                          <option value=''>------</option>
                          {data[0].map((tmp, index) => (
                            <option key={index} value={tmp.id}>
                              {`${tmp.id_type}-${tmp.issuer}-${tmp.template}`}
                            </option>
                          ))}
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

export default EditId;