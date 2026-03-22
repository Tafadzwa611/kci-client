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
  CustomCheckbox,
  Fetcher,
} from "../../../../common";
import { useCurrencies } from "../../../../contexts/CurrenciesContext";
import axios from "axios";
import Cookies from "js-cookie";
import { removeEmptyValues } from "../../../../utils/utils";

function AddDetailAccount() {
  const initialValues = {
    general_ledger_name: "",
    general_ledger_code: "",
    account_type: "",
    account_open_date: "",
    currency_id: "",
    branch_id: "",
    is_cash_account: false,
    description: "",
    header_account_id: "",
    add_in_all_branches: false,
  };

  const { currencies } = useCurrencies();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Detail Account";
  }, []);

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
      const response = await axios.post("/acc-api/create-sub-account/", data, CONFIG);
      console.log(response.data);
      navigate({
        pathname: `/accounting/viewaccounting/chartsofaccounts/detailaccount/${response.data.id}`,
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
    <>
      <div className="sf-page">
        <div style={{ marginBottom: 12 }}>
          <button type="button" className="btn btn-default max">
            <Link to="/accounting/viewaccounting/chartsofaccounts">Back</Link>
          </button>
        </div>

        <Fetcher urls={["/acc-api/main-accounts-list/", "/usersapi/branch-list/"]}>
          {({ data }) => (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting, errors, setFieldValue }) => (
                <Form autoComplete="off" className="sf-form">
                  <NonFieldErrors errors={errors}>
                    <div className="sf-shell">
                      <div className="sf-shell-head">
                        <div className="sf-shell-title">Create Detail Account</div>
                        <div className="sf-shell-subtitle">
                          Create a sub-account under a header account and assign branch + currency.
                        </div>
                      </div>

                      <div className="sf-shell-body">
                        <section className="sf-section">
                          <div className="sf-section-head">
                            <div className="sf-section-title">Detail account information</div>
                            <div className="sf-section-hint">Fill required fields to create the account.</div>
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

                            <CustomSelect label="Account Type" name="account_type" required>
                              <option value="">------</option>
                              <option value="ASSET">ASSET</option>
                              <option value="LIABILITY">LIABILITY</option>
                              <option value="EQUITY">EQUITY</option>
                              <option value="INCOME">INCOME</option>
                              <option value="EXPENSE">EXPENSE</option>
                            </CustomSelect>

                            <CustomSelect label="Branch" name="branch_id" required>
                              <option value="">------</option>
                              {data[1].map((br) => (
                                <option key={br.id} value={br.id}>
                                  {br.name}
                                </option>
                              ))}
                            </CustomSelect>

                            <CustomSelect label="Currency" name="currency_id" required>
                              <option value="">------</option>
                              {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                  {currency.fullname}
                                </option>
                              ))}
                            </CustomSelect>

                            <CustomDatePicker
                              label="Account Date"
                              name="account_open_date"
                              setFieldValue={setFieldValue}
                              required
                            />

                            <CustomSelect label="Header Account" name="header_account_id">
                              <option value="">------</option>
                              {data[0].map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                  {acc.general_ledger_code}-{acc.general_ledger_name}-{acc.account_type}
                                </option>
                              ))}
                            </CustomSelect>

                                <CustomCheckbox label="Is Cash Account" name="is_cash_account" />

                                <CustomCheckbox label="Add in all Branches" name="add_in_all_branches" />


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
          )}
        </Fetcher>
      </div>
    </>
  );
}

export default AddDetailAccount;