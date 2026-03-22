import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import {
  CustomInput,
  CustomSelect,
  NonFieldErrors,
  CustomTextField,
  CustomDatePicker,
  SubmitButton,
} from "../../../../common";
import axios from "axios";
import Cookies from "js-cookie";
import { removeEmptyValues } from "../../../../utils/utils";

function AddHeaderAccount() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Header Account";
  }, []);

  const initialValues = {
    general_ledger_code: "",
    general_ledger_name: "",
    account_type: "",
    date_created: "",
    description: "",
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const data = removeEmptyValues(values);
      const response = await axios.post("/acc-api/create-main-account/", data, CONFIG);
      navigate({
        pathname: `/accounting/viewaccounting/chartsofaccounts/headeraccount/${response.data.id}`,
      });
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <div className="sf-page">
      <div style={{ marginBottom: 12 }}>
        <button type="button" className="btn btn-default max">
          <Link to="/accounting/viewaccounting/chartsofaccounts/headeraccounts">Back</Link>
        </button>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue }) => (
          <Form autoComplete="off" className="sf-form">
            <NonFieldErrors errors={errors}>
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Create Header Account</div>
                  <div className="sf-shell-subtitle">
                    Add a main ledger header account to categorize detail accounts.
                  </div>
                </div>

                <div className="sf-shell-body">
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Header account information</div>
                      <div className="sf-section-hint">Provide the code, name, type and date.</div>
                    </div>

                    <div className="sf-section-body sf-stack">
                      <CustomInput
                        label="General Ledger Name"
                        name="general_ledger_name"
                        type="text"
                        required
                      />

                      <CustomInput
                        label="General Ledger Code"
                        name="general_ledger_code"
                        type="text"
                        required
                      />

                      <CustomSelect label="Account Type" name="account_type">
                        <option value="">------</option>
                        <option value="ASSET">ASSET</option>
                        <option value="LIABILITY">LIABILITY</option>
                        <option value="EQUITY">EQUITY</option>
                        <option value="INCOME">INCOME</option>
                        <option value="EXPENSE">EXPENSE</option>
                      </CustomSelect>

                      <CustomDatePicker
                        label="Account Date"
                        name="date_created"
                        setFieldValue={setFieldValue}
                        required
                      />

                      <CustomTextField label="Description" name="description" />
                    </div>
                  </section>
                </div>

                <div className="sf-shell-footer">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddHeaderAccount;