import React from 'react';
import { Form, Formik } from 'formik';
import {
  ModalActionSubmit,
  NonFieldErrors,
  ActionModal,
} from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteTransfer = ({ setOpen, transfer, setTransferId, setTransferData }) => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true, // keep cookies/session for CSRF
      };

      // ✅ Use DELETE (no body needed here)
      await axios.delete(`/acc-api/delete_transfer/${transfer.id}/`, CONFIG);

      setOpen(false);

      if (setTransferId) {
        setTransferId(null);
      } else {
        navigate({ pathname: '/transfers/viewtransfers' });
      }

      if (setTransferData) {
        setTransferData(curr => {
          return {
            ...curr,
            count: curr.count - 1,
            transfers: curr.transfers.filter(t => t.id !== transfer.id),
          };
        });
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className="title" style={{ fontSize: "0.875rem" }}>
              Are you sure you want to reverse transfer.
            </div>
            <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            <NonFieldErrors errors={errors} />
          </Form>
        )}
      </Formik>
    </ActionModal>
  );
};

export default DeleteTransfer;
