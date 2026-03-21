import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  NonFieldErrors,
  Fetcher,
  CustomSelect,
  CustomInput,
  SubmitButton,
  CustomDatePicker,
  ButtonDefault,
} from "../../../common";
import axios from "axios";
import Cookies from "js-cookie";

function Calculator() {
  const [data, setData] = useState(null);

  const initialValues = {
    loan_product_id: "",
    principal: "",
    interest_rate: "",
    application_date: "",
    number_of_repayments: "",
    first_repayment_date: "",
    schedule_strategy: "",
    loan_duration_time_unit: "",
    fees: [],
  };

  useEffect(() => {
    const schedule = document.getElementById("schedule");
    schedule.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/loansapi/loan_calc_api/", values, CONFIG);
      setData(response.data);
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

  const onChange = (evt, setFieldValue, products) => {
    const { value } = evt.target;
    const product = products.find((prod) => prod.id == value) || null;
    setFieldValue("loan_product_id", value);
    if (product) {
      setFieldValue("loan_duration_time_unit", product.loan_duration_time_unit);
      setFieldValue("schedule_strategy", product.schedule_strategy);
      setFieldValue("fees", product.fees);
    }
  };

  return (
    <>
      <Fetcher urls={["/loansapi/loan_products_list/?allowed_in_user_branch_only=1"]}>
        {({ data }) => (
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting, setFieldValue, errors, values }) => (
              <Form autoComplete="off" className="sf-form">
                <NonFieldErrors errors={errors}>
                  <div className="sf-page">
                    <div className="sf-shell">
                      <div className="sf-shell-head">
                        <div className="sf-shell-title">Loan Calculator</div>
                        <div className="sf-shell-subtitle">
                          Pick a product and inputs to generate an amortization schedule.
                        </div>
                      </div>

                      <div className="sf-shell-body">
                        {/* Section: Loan details */}
                        <section className="sf-section">
                          <div className="sf-section-head">
                            <div className="sf-section-title">Loan details</div>
                            <div className="sf-section-hint">
                              Required fields to compute the schedule.
                            </div>
                          </div>

                          {/* ✅ VERTICAL STACK (no grid-2) */}
                          <div className="sf-section-body" style={{ display: "grid", gap: 12 }}>
                            <CustomSelect
                              label="Loan Product"
                              name="loan_product_id"
                              onChange={(evt) => onChange(evt, setFieldValue, data[0])}
                              required
                            >
                              <option value="">------</option>
                              {data[0].map((product) => (
                                <option key={product.id} value={product.id}>
                                  ({product.currency})-{product.name}-{product.client_type}
                                </option>
                              ))}
                            </CustomSelect>

                            <CustomInput label="Principal" name="principal" type="number" required />

                            <CustomInput
                              label="Interest Rate"
                              name="interest_rate"
                              type="number"
                              required
                            />

                            <CustomDatePicker
                              label="Application Date"
                              name="application_date"
                              setFieldValue={setFieldValue}
                              required
                            />

                            <CustomInput
                              label="Number of Repayments"
                              name="number_of_repayments"
                              type="number"
                              required
                            />

                            <CustomDatePicker
                              label="First Repayment Date"
                              name="first_repayment_date"
                              setFieldValue={setFieldValue}
                              required
                            />

                            <CustomSelect
                              label="Loan Schedule Strategy"
                              name="schedule_strategy"
                              required
                            >
                              <option value="">------</option>
                              {values.loan_duration_time_unit
                                ? scheduleStrategies[values.loan_duration_time_unit].map((strategy) => (
                                    <option key={strategy} value={strategy}>
                                      {strategy}
                                    </option>
                                  ))
                                : null}
                            </CustomSelect>
                          </div>
                        </section>

                        {/* Section: Fees */}
                        <section className="sf-section">
                          <div className="sf-section-head">
                            <div className="sf-section-title">Loan fees</div>
                            <div className="sf-section-hint">
                              Product fees are auto-loaded. Optional fees can be removed.
                            </div>
                          </div>

                          <div className="sf-section-body">
                            {values.fees && values.fees.length > 0 ? (
                              <div className="sf-stack">
                                {values.fees.map((fee, index) => (
                                  <Fee
                                    key={index}
                                    setFieldValue={setFieldValue}
                                    fee={fee}
                                    values={values}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="sf-empty">No fees for this product.</div>
                            )}
                          </div>
                        </section>
                      </div>

                      <div className="sf-shell-footer">
                        <SubmitButton isSubmitting={isSubmitting} />
                      </div>
                    </div>
                  </div>
                </NonFieldErrors>
              </Form>
            )}
          </Formik>
        )}
      </Fetcher>

      <div id="schedule">
        {data ? (
          <div className="sf-page">
            <div className="sf-shell">
              <div className="sf-shell-head">
                <div className="sf-shell-title">Repayment schedule</div>
                <div className="sf-shell-subtitle">Generated amortization table and totals.</div>
              </div>

              <div className="sf-shell-body">
                <LoanSchedule data={data} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

const LoanSchedule = ({ data }) => {
  const isMobile = window.innerWidth <= 900;

  return (
    <section className="sf-section">
      <div className="sf-section-head">
        <div className="sf-section-title">Summary</div>
        <div className="sf-section-hint">Totals and maturity date.</div>
      </div>

      <div className="sf-section-body">
        <ul
          className="sf-summary-list"
          style={{
            paddingLeft: isMobile ? "1rem" : "",
            margin: 0,
          }}
        >
          <li>Total: {data.amount_due}</li>
          <li>Total Principal: {data.principal_amount_due}</li>
          <li>Total Interest: {data.interest_amount_due}</li>
          <li>Total Fees: {data.total_non_deduc_fees}</li>
          <li>Total Capitalized Fees: {data.total_capitalized_fees}</li>
          <li>Maturity Date: {data.repayment_dates_sequence.at(-1)}</li>
        </ul>

        <div
          className="miniLoanDetails-container sf-table-wrap"
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            marginTop: "1rem",
          }}
        >
          <table
            className="table"
            style={{
              width: isMobile ? "760px" : "100%",
              minWidth: isMobile ? "760px" : "100%",
            }}
          >
            <thead>
              <tr className="journal-details schedule__tables sf-sticky-head">
                <th className="schedule__table">
                  <b>#</b>
                </th>
                <th
                  className="schedule__table schedule__installment__right"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Due Date
                </th>
                <th className="schedule__table" style={{ whiteSpace: "nowrap" }}>
                  Principal Expected
                </th>
                <th className="schedule__table" style={{ whiteSpace: "nowrap" }}>
                  Interest Expected
                </th>
                <th className="schedule__table" style={{ whiteSpace: "nowrap" }}>
                  Fees Expected
                </th>
                <th
                  className="schedule__table schedule__installment__right"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Total Expected
                </th>
              </tr>
            </thead>
            <tbody>
              {data.amortization_table.map((installment) => (
                <tr key={installment.Period}>
                  <td className="schedule__table schedule__installment">
                    {installment.Period}
                  </td>
                  <td
                    className="schedule__table schedule__installment schedule__installment__right"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {installment.Payment_Date}
                  </td>
                  <td className="schedule__table schedule__installment schedule__installment__right">
                    {installment.Principal}
                  </td>
                  <td className="schedule__table schedule__installment schedule__installment__right">
                    {installment.Interest}
                  </td>
                  <td className="schedule__table schedule__installment schedule__installment__right">
                    {installment.Fees}
                  </td>
                  <td className="schedule__table schedule__installment schedule__installment__right">
                    {installment.Installment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

function Fee({ fee, setFieldValue, values }) {
  return (
    <div className="sf-fee-card">
      <div className="sf-fee-card-body">
        <div className="sf-kv">
          <div className="sf-kv-row">
            <div className="sf-kv-key">Fee Name</div>
            <div className="sf-kv-val">{fee.name}</div>
          </div>
          <div className="sf-kv-row">
            <div className="sf-kv-key">Fee Type</div>
            <div className="sf-kv-val">{fee.fee_type}</div>
          </div>
          <div className="sf-kv-row">
            <div className="sf-kv-key">Fee Payment</div>
            <div className="sf-kv-val">
              {fee.value} {fee.fee_calculation}
            </div>
          </div>
        </div>

        {!fee.is_mandatory ? (
          <div className="sf-fee-actions">
            <ButtonDefault
              value={"Remove Fee"}
              handler={(evt) => {
                evt.preventDefault();
                const feeName = fee.fee_name;
                setFieldValue("fees", values.fees.filter((fee) => fee.fee_name !== feeName));
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

const scheduleStrategies = {
  Days: ["Everyday"],
  Weeks: [
    "Every Mon",
    "Every Tue",
    "Every Wed",
    "Every Thu",
    "Every Fri",
    "Every Sat",
    "Every Sun",
    "Every Seven Days",
  ],
  "2 Weeks": ["Same Day", "Biweek Interval"],
  Months: ["Same Day", "First Day Of Next Month", "Last Day Of Next Month", "Monthly Interval"],
  "2 Months": ["Same Day", "Bimonth Interval"],
  "3 Months": ["Same Day", "Quarter Interval"],
  "4 Months": ["Same Day", "Quadrimester Interval"],
  "6 Months": ["Same Day", "Semi-annual Interval"],
  Years: ["Same Day", "Year Interval"],
  "": [],
};

export default Calculator;