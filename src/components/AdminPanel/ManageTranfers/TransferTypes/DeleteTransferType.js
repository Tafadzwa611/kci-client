import React from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ActionModal,
  ActionModalDialog,
  NonFieldErrors,
} from "../../../../common";

function DeleteTransferType({ setOpenModal, transfertypeId, onDeleted }) {
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`/acc-api/delete_transfer_type/${transfertypeId}/`, CONFIG);

      onDeleted?.(transfertypeId);
      setOpenModal(false);
    } catch (error) {
      console.log(error);

      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data,
        });
      } else {
        actions.setErrors({
          responseStatus: error.response?.status ?? 500,
        });
      }
    }
  };

  return (
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <ActionModalDialog
                isSubmitting={isSubmitting}
                msg={"Are you sure you want to delete this transfer type."}
                setOpen={setOpenModal}
                act={"Delete"}
              />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  );
}

export default DeleteTransferType;
