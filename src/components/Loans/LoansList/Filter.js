import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik, useField } from "formik";
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomMultiSelectFilter,
  CustomSelectFilter,
  MultiSelectFilter,
  SubmitButtonFilter,
} from "../../../common";
import { useCurrencies } from "../../../contexts/CurrenciesContext";
import { useBranches } from "../../../contexts/BranchesContext";
import { statusValues } from "./data";
import axios from "axios";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import Select from "react-select";
import { uuidv4 } from "../../../utils";

const Filter = ({
  products,
  units,
  setLoanData,
  setLoanId,
  setParams,
  setLoanDetails,
}) => {
  const initialValues = {
    branch_ids: [],
    status: [],
    page_num: 1,
    page_size: 10,
    min_loan_added_on: "",
    max_loan_added_on: "",
    min_approval_date: "",
    max_approval_date: "",
    min_application_date: "",
    max_application_date: "",
    min_principal_amount_due: "",
    max_principal_amount_due: "",
    min_total_amount_paid: "",
    max_total_amount_paid: "",
    client: "",
    loan_num: "",
    group: "",
    product: null,
    loan_product_id: "",
    client_type: "",
    unit_id: "",
    sector: "",
    order_by: "-application_date",
    currency_id: "",
    gender: "",
  };

  const { currencies } = useCurrencies();
  const { branches } = useBranches();
  const allBranchIds = branches.map((br) => br.id);

  const changeClientType = (evt, setFieldValue) => {
    const { value } = evt.target;
    setLoanId(null);
    setLoanDetails(null);
    setFieldValue("client_type", value);
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      delete data.product;

      const params = getParams(data);

      if (values.branch_ids.includes("*")) {
        params.delete("branch_ids");
        allBranchIds.forEach((id) => params.append("branch_ids", id));
      }

      setParams(params);

      const response = await axios.get("/loansapi/loan_list/", { params });
      setLoanData(response.data);
    } catch (error) {
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data,
        });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, errors }) => (
        <div className="search_background">
          <div className="row-containers sf-shellwrap">
            <Form>
              <NonFieldErrors errors={errors}>
                <div className="row row-payments row-loans sf-card">
                  {/* Row 1 */}
                  <div className="sf-row sf-row-3">
                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Min Disbursement Date"
                          name="min_loan_added_on"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Max Disbursement Date"
                          name="max_loan_added_on"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter
                          label="Min Principal Outstanding"
                          name="min_principal_amount_due"
                          type="number"
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter
                          label="Max Principal Outstanding"
                          name="max_principal_amount_due"
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter
                          label="Min Amount Paid"
                          name="min_total_amount_paid"
                          type="number"
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter
                          label="Max Amount Paid"
                          name="max_total_amount_paid"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="sf-row sf-row-3 sf-mt-3">
                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Min Approval Date"
                          name="min_approval_date"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Max Approval Date"
                          name="max_approval_date"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Min Application Date"
                          name="min_application_date"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomDatePickerFilter
                          label="Max Application Date"
                          name="max_application_date"
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter
                          label="Loan Number"
                          name="loan_num"
                          type="text"
                        />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomSelectFilter label="Gender" name="gender">
                          <option value="">------</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </CustomSelectFilter>
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="sf-row sf-row-3 sf-mt-3">
                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomMultiSelect
                          label="Loan Product"
                          name="product"
                          isMulti={false}
                          setFieldValue={(fieldName, selectedOpt) => {
                            setFieldValue(fieldName, selectedOpt);
                            setFieldValue(
                              "loan_product_id",
                              selectedOpt ? selectedOpt.value : ""
                            );
                          }}
                          options={products.map((product) => ({
                            label: product.name,
                            value: product.id,
                          }))}
                        />
                      </div>

                      <div className="row-payments-container sf-w-49">
                        <CustomSelectFilter
                          label="Client Type"
                          name="client_type"
                          onChange={(evt) => changeClientType(evt, setFieldValue)}
                        >
                          <option value="">-----</option>
                          <option value="Clients">Client</option>
                          <option value="Groups">Group</option>
                          <option value="Groups (solidarity)">
                            Groups (solidarity)
                          </option>
                        </CustomSelectFilter>
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomSelectFilter label="Currency" name="currency_id">
                          <option value="">------</option>
                          {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>
                              {currency.fullname}
                            </option>
                          ))}
                        </CustomSelectFilter>
                      </div>

                      <div className="row-payments-container sf-w-49">
                        <CustomSelectFilter
                          label="Page Size"
                          name="page_size"
                          required
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="75">75</option>
                          <option value="100">100</option>
                        </CustomSelectFilter>
                      </div>
                    </div>

                    <div className="sf-col sf-col-32 sf-split-2">
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter label="Client Name" name="client" />
                      </div>
                      <div className="row-payments-container sf-w-49">
                        <CustomInputFilter label="Group Name" name="group" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="sf-row sf-row-2 sf-mt-3">
                    <div className="row-payments-container sf-w-32">
                      <CustomSelectFilter label="Order By" name="order_by" required>
                        <option value="-loan_id">Order By ID DESC</option>
                        <option value="loan_id">Show Oldest ID ASC</option>
                        <option value="-date_created">
                          Order By Date Entered DESC
                        </option>
                        <option value="date_created">
                          Order By Date Entered ASC
                        </option>
                        <option value="-loan_added_on">
                          Order By Date Disbursed DESC
                        </option>
                        <option value="loan_added_on">
                          Order By Date Disbursed ASC
                        </option>
                        <option value="-approval_date">
                          Order By Date Approved DESC
                        </option>
                        <option value="approval_date">
                          Order By Date Approved ASC
                        </option>
                        <option value="-application_date">
                          Order By Application Date DESC
                        </option>
                        <option value="application_date">
                          Order By Application Date ASC
                        </option>
                        <option value="-maturity_date">
                          Order By Maturity Date DESC
                        </option>
                        <option value="maturity_date">
                          Order By Maturity Date ASC
                        </option>
                        <option value="-client__fullname">
                          Order By Client Fullname DESC
                        </option>
                        <option value="client__fullname">
                          Order By Client Fullname ASC
                        </option>
                      </CustomSelectFilter>
                    </div>

                    <div className="row-payments-container sf-w-32">
                      <CustomSelectFilter label="Unit" name="unit_id">
                        <option value="">------</option>
                        {units.map((ut) => (
                          <option key={ut.id} value={ut.id}>
                            {ut.name}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>

                    <div className="row-payments-container sf-w-32">
                      <CustomSelectFilter label="Sector" name="sector">
                        <option value="">-----</option>
                        <option value="CONSUMER">CONSUMER</option>
                        <option value="COMMERCIAL - Agriculture">Agriculture</option>
                        <option value="COMMERCIAL - Manufacturing">
                          Manufacturing
                        </option>
                        <option value="COMMERCIAL - Mining">Mining</option>
                        <option value="COMMERCIAL - Housing">Housing</option>
                        <option value="COMMERCIAL - Distribution & Services">
                          Distribution & Services
                        </option>
                        <option value="COMMERCIAL - Retail">Retail</option>
                        <option value="COMMERCIAL - Transport">Transport</option>
                        <option value="COMMERCIAL - Health">Health</option>
                        <option value="COMMERCIAL - Education">Education</option>
                        <option value="COMMERCIAL - Cross Border Traders">
                          Cross Border Traders
                        </option>
                        <option value="COMMERCIAL - Construction">
                          Construction
                        </option>
                        <option value="COMMERCIAL - Vendors">Vendors</option>
                        <option value="OTHER">OTHER</option>
                      </CustomSelectFilter>
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="sf-footer sf-mt-3">
                    <div className="sf-w-49">
                      <CustomMultiSelectFilter
                        label="Status"
                        name="status"
                        options={statusValues.map((val) => ({
                          label: val,
                          value: val,
                        }))}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="sf-w-49 sf-branches">
                      <MultiSelectFilter
                        label="Branches"
                        name="branch_ids"
                        options={branches.map((br) => ({
                          label: br.name,
                          value: br.id,
                        }))}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                </div>

                <div className="sf-actions">
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

const CustomMultiSelect = ({ label, options, initVals, setFieldValue, ...props }) => {
  const [optionSelected, setOptionSelected] = useState(initVals || (props.isMulti === false ? null : []));
  const [field, meta] = useField(props);

  const inputId = useMemo(() => uuidv4(), []);

  useEffect(() => {
    const el = document.getElementById(inputId);
    if (el) el.required = props.required;
  }, [inputId, props.required]);

  const handleMultiSelect = (selected) => {
    let selectedOpts = selected;

    if (
      props.isMulti !== false &&
      selected !== null &&
      Array.isArray(selected) &&
      selected.length > 0 &&
      selected[selected.length - 1].value === "*"
    ) {
      selectedOpts = options;
    }

    setOptionSelected(selectedOpts);
    setFieldValue(field.name, selectedOpts);

    const el = document.getElementById(inputId);
    if (!el) return;

    if (
      selected === null ||
      (Array.isArray(selected) && selected.length === 0)
    ) {
      el.required = props.required;
    } else {
      el.required = false;
    }
  };

  const selectStyles = useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        border: "1px solid var(--sf-border)",
        boxShadow: state.isFocused ? "0 0 0 4px var(--sf-focus-ring)" : "none",
        backgroundColor: "var(--sf-input-bg)",
        minHeight: 42,
        borderRadius: 12,
        "&:hover": {
          borderColor: "var(--sf-border-strong)",
        },
      }),

      menuPortal: (base) => ({
        ...base,
        zIndex: 2147483647,
      }),

      menu: (base) => ({
        ...base,
        zIndex: 2147483647,
        backgroundColor: "var(--app-surface)",
        border: "1px solid var(--app-border)",
        boxShadow: "var(--app-shadow)",
      }),

      option: (base, state) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          fontSize: "12px",
          lineHeight: "1.2",
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: isDark
            ? state.isSelected
              ? "rgba(59,130,246,0.25)"
              : state.isFocused
              ? "rgba(148,163,184,0.14)"
              : "transparent"
            : state.isSelected
              ? "rgba(59,130,246,0.12)"
              : state.isFocused
                ? "rgba(15,23,42,0.06)"
                : "transparent",
          color: "var(--app-text)",
          cursor: "pointer",
        };
      },

      singleValue: (base) => ({
        ...base,
        color: "var(--app-text)",
      }),

      input: (base) => ({
        ...base,
        color: "var(--app-text)",
        margin: 0,
        padding: 0,
      }),

      placeholder: (base) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          color: isDark ? "rgba(148,163,184,0.9)" : "#64748b",
        };
      },

      valueContainer: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),

      multiValue: (base) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: isDark
            ? "rgba(148,163,184,0.16)"
            : "rgba(15,23,42,0.06)",
        };
      },

      multiValueLabel: (base) => ({
        ...base,
        color: "var(--app-text)",
      }),

      multiValueRemove: (base) => ({
        ...base,
        color: "var(--app-text)",
      }),
    }),
    []
  );

  return (
    <div className="custom-background custom-multi-select" style={{ alignItems: "center" }}>
      <label className="form-label" style={{width:'100%'}}>
        {label}
        {props.required && <span style={{ color: "red" }}>&#42;</span>}
      </label>

      <div>
        {props.isMulti === false ? (
          <Select
            isClearable
            name="multi-select"
            options={options}
            value={optionSelected}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelect}
            inputId={inputId}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
          />
        ) : (
          <Select
            isMulti
            name="multi-select"
            options={[{ label: "Select all", value: "*" }, ...options]}
            value={optionSelected}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelect}
            inputId={inputId}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
          />
        )}

        {meta.error && <div className="error">{JSON.stringify(meta.error)}</div>}
      </div>
    </div>
  );
};

export default Filter;