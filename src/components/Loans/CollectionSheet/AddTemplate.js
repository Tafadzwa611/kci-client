import React from "react";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { COLUMNS, SWAPPED_COLUMNS } from "./CollectionTable";
import {
  NonFieldErrors,
  CustomInput,
  SubmitButton,
  CustomMultiSelect,
  CustomSortableSelect,
} from "../../../common";

const AddTemplate = ({ data }) => {
  const [columns] = data;
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "/usersapi/add_report_template/",
        { ...values, columns: values.order.map((column) => SWAPPED_COLUMNS[column]) },
        CONFIG
      );
      navigate({ pathname: "/loans/viewloans/collection_sheet/templates" });
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
    <Formik
      initialValues={{ report_type: "COLLECTION_SHEET", report_name: "", columns: [], order: [] }}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, setFieldValue, errors }) => (
        <Form autoComplete="off" className="sf-form">
          <NonFieldErrors errors={errors}>
            <div className="sf-page">
              <div style={{ marginBottom: 12 }}>
                <button type="button" className="btn btn-default max">
                  <Link to="/loans/viewloans/collection_sheet/templates">Back</Link>
                </button>
              </div>
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Create Template</div>
                  <div className="sf-shell-subtitle">
                    Choose which columns appear on the collection sheet and set their order.
                  </div>
                </div>

                <div className="sf-shell-body">
                  {/* Section: Template Information */}
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Template Information</div>
                      <div className="sf-section-hint">Name your template and pick columns.</div>
                    </div>

                    <div className="sf-section-body" style={{ display: "grid", gap: 12 }}>
                      <CustomInput label="Template Name" name="report_name" type="text" required />

                      <CustomMultiSelect
                        label="Columns"
                        name="columns"
                        initVals={values.columns}
                        setFieldValue={(name, selectedColumns) => {
                          setFieldValue(name, selectedColumns);

                          let newOrder = values.order;
                          selectedColumns.forEach((col) => {
                            if (!newOrder.includes(col.label)) {
                              newOrder.push(col.label);
                            }
                          });
                          newOrder = newOrder.filter((item) =>
                            selectedColumns.find((col) => col.label === item)
                          );
                          setFieldValue("order", newOrder);
                        }}
                        options={columns.map((column) => ({ label: COLUMNS[column], value: column }))}
                      />

                      <CustomSortableSelect
                        label="Column Order"
                        setFieldValue={(name, items) => setFieldValue(name, items)}
                        name="order"
                        options={values.order}
                      />
                    </div>
                  </section>
                </div>

                {/* Sticky footer submit (same as SmsForm) */}
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
};

export default AddTemplate;