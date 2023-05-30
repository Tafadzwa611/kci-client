import React from 'react';
import { Form, Formik } from 'formik';
// import { onModalSubmit } from './utils';
import { editTypeSchema } from './schemas';
import { Modal, NonFieldErrors, CustomInput, CustomCheckbox, ModalSubmit } from '../../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditType = ({open, setOpen, type, setTypes}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.patch(`/clientsapi/update_group_type/${type.id}/`, values, CONFIG);
      setTypes(curr => {
        return curr.map(type => {
          if (type.id == response.data.id) {
            return response.data
          }
          return type
        })
      });
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
    <Modal open={open} setOpen={setOpen} title={'Update Group Type'}>
      <Formik initialValues={type} validationSchema={editTypeSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div>
                  <CustomInput label='Name' name='name' type='text'/>
                  <CustomCheckbox label='Allow opening accounts' name='allow_opening_loan_accounts'/>
                  <CustomCheckbox label='Allow as guarantor' name='allow_as_guarantor'/>
                  <CustomCheckbox label='Is Active' name='is_active'/>
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

export default EditType;