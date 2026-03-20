import React from "react";
import { useBranches } from "../../../contexts/BranchesContext";
import { Form, Formik } from "formik";
import {
  MultiSelectFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  CustomInputFilter,
  NonFieldErrors,
} from "../../../common";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import axios from "axios";

function Filter({ clientTypes, setParams, setAppsData }) {
  const initialValues = {
    page_num: 1,
    page_size: 10,
    branch_ids: [],
    search_str: "",
    min_app_date: "",
    max_app_date: "",
    min_dob: "",
    max_dob: "",
    client_type_id: "",
    gender: "",
    status: "",
  };

  const { branches } = useBranches();
  const allBranchIds = branches.map((br) => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);

      if (values.branch_ids.includes("*")) {
        params.delete("branch_ids");
        allBranchIds.forEach((id) => params.append("branch_ids", id));
      }

      setParams(params);

      const response = await axios.get("/clientsapi/applications_list/", {
        params,
      });
      setAppsData(response.data);
    } catch (error) {
      console.log(error);

      if (error?.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
        return;
      }

      const status = error?.response?.status;

      if (status >= 400 && status < 500) {
        actions.setErrors({
          responseStatus: status,
          ...(error?.response?.data || {}),
        });
      } else {
        actions.setErrors({ responseStatus: status || "Unknown Error" });
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
                  <div className="sf-row sf-row-4">
                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Min Application Date"
                        name="min_app_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Max Application Date"
                        name="max_app_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Min Date Of Birth"
                        name="min_dob"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Max Date Of Birth"
                        name="max_dob"
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="sf-row sf-row-4 sf-mt-3">
                    <div className="row-payments-container sf-w-24">
                      <CustomSelectFilter label="Client Type" name="client_type_id">
                        <option value="">------</option>
                        {clientTypes.map((ct) => (
                          <option key={ct.id} value={ct.id}>
                            {ct.name}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomInputFilter label="Search" name="search_str" />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomSelectFilter label="Gender" name="gender">
                        <option value="">------</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </CustomSelectFilter>
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomSelectFilter label="Status" name="status">
                        <option value="">------</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Approved">Approved</option>
                      </CustomSelectFilter>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="sf-footer sf-mt-3 online-filters-footer">
                    <div className="sf-branches">
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

                    <div className="row-payments-container sf-pagesize">
                      <CustomSelectFilter label="Page Size" name="page_size" required>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                      </CustomSelectFilter>
                    </div>

                  </div>
                </div>
                <div className="sf-submit">
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Filter;