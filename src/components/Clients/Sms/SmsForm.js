import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  SubmitButton,
  NonFieldErrors,
  CustomTextField,
  CustomMultiSelect,
  CustomSelectRemote,
} from "../../../common";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { removeEmptyValues } from "../../../utils/utils";

const CLIENT_STATUS = ["Pending Approval", "Inactive", "Rejected", "Active", "Blacklisted", "Left"];
const LOAN_STATUS = [
  "Processing",
  "Open",
  "Approved",
  "Arrears",
  "Fully Paid",
  "Over Paid",
  "Rejected",
  "Written-Off",
  "Early Settlement",
];

const validationSchema = yup.object().shape({
  sms: yup.string().required("Required").max(160),
  client_status: yup.array(),
  loan_status: yup.array(),
});

function SmsForm() {
  const [notifs, setNotifs] = useState([]);

  const initialValues = {
    sms: "",
    client_status: [],
    loan_status: [],
    clients: [],
  };

  const onSubmit = async (values, actions) => {
    let data = {
      ...values,
      client_ids: (values.clients || []).map((client) => client.value),
      client_status: (values.client_status || []).map((status) => status.value),
      loan_status: (values.loan_status || []).map((status) => status.value),
    };
    data = removeEmptyValues(data);

    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios.post("/clientsapi/send_sms/", data, CONFIG);
      setNotifs((curr) => ["Message sent.", ...curr]);
      actions.resetForm();
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form autoComplete="off" className="sf-form">
          <NonFieldErrors errors={errors}>
            {/* Notifications */}
            {notifs.length > 0 ? (
              <div className="sf-section">
                <div className="sf-section-head">
                  <div className="sf-section-title">Notifications</div>
                </div>
                <div className="sf-section-body" style={{ display: "grid", gap: 8 }}>
                  {notifs.map((notif, idx) => (
                    <div className="success__submit" key={idx}>
                      {notif}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Stripe shell */}
            <div className="sf-page">
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Send SMS</div>
                  <div className="sf-shell-subtitle">
                    Compose a message and target clients by status, loan status, or specific client selection.
                  </div>
                </div>

                <div className="sf-shell-body">
                  {/* Section: SMS info */}
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">SMS information</div>
                      <div className="sf-section-right">
                        <span className="sf-pill">{String(values.sms || "").length}/160</span>
                      </div>
                    </div>

                    <div className="sf-section-body">
                      <CustomTextField label="Message" name="sms" />
                    </div>
                  </section>

                  {/* Section: Filters */}
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Filters</div>
                      <div className="sf-section-hint">Optional: narrow down who receives the message.</div>
                    </div>

                    <div className="sf-section-body" style={{ display: "grid", gap: 12 }}>
                      <CustomMultiSelect
                        label="Client Status"
                        name="client_status"
                        initVals={values.client_status}
                        setFieldValue={setFieldValue}
                        options={CLIENT_STATUS.map((s) => ({ label: s, value: s }))}
                      />

                      <CustomMultiSelect
                        label="Loan Status"
                        name="loan_status"
                        initVals={values.loan_status}
                        setFieldValue={setFieldValue}
                        options={LOAN_STATUS.map((s) => ({ label: s, value: s }))}
                      />

                      <CustomSelectRemote
                        selected={values.clients ? values.clients : ""}
                        label="Clients"
                        url="/clientsapi/search_client/"
                        setFieldValue={(fieldName, selected) => setFieldValue(fieldName, selected)}
                        params={[{ key: "all_branches", value: 1 }]}
                        queryParamName="query"
                        placeholder="Search client"
                        name="clients"
                        isMulti
                      />
                    </div>
                  </section>
                </div>

                {/* Sticky footer submit (uses your global sf-shell-footer styles) */}
                <div className="sf-shell-footer">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </div>
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  );
}

export default SmsForm;