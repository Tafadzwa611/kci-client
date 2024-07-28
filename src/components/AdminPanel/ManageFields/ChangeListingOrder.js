import React from 'react';
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomSortableSelect
} from '../../../common';
import { Form, Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';

function ChangeListingOrder({open, setOpen, fields, fieldSetId}) {
  const onSubmit = async (values, actions) => {
    try {
      const data = values.names.map((nam, idx) => {
        const field = fields.find(field => field.name === nam);
        return {field_id: field.id, position: idx}
      });
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/usersapi/update_field_listing_position/${fieldSetId}/`, {positions: data}, CONFIG);
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

  const names = fields.map(field => field.name);
  const initialValues = {names: names};

  return (
    <Modal open={open} setOpen={setOpen} title={'Change Listing Order'}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <CustomSortableSelect
                  label='Listing Order'
                  setFieldValue={(name, items) => setFieldValue(name, items)}
                  name='names'
                  options={names}
                />
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default ChangeListingOrder;