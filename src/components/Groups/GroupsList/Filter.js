import React from "react";
import { Form, Formik } from "formik";
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  MultiSelectFilter,
  SubmitButtonFilter,
} from "../../../common";
import { useBranches } from "../../../contexts/BranchesContext";
import axios from "axios";
import { removeEmptyValues, getParams } from "../../../utils/utils";

const Filter = ({ setGroupsData, setParams, units }) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    search_str: "",
    min_reg_date: "",
    max_reg_date: "",
    min_grp_date: "",
    max_grp_date: "",
    status: "",
    unit_id: "",
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

      const response = await axios.get("/clientsapi/groups/", { params });
      setGroupsData(response.data);
    } catch (error) {
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
          <div className="row-containers sf-shellwrap groups-filter">
            <Form>
              <NonFieldErrors errors={errors}>
                <div className="row row-payments row-loans sf-card">
                  {/* Row 1: Dates (2 + 2) */}
                  <div className="sf-row sf-row-4">
                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Min Reg Date"
                        name="min_reg_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Max Reg Date"
                        name="max_reg_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Min Group Date"
                        name="min_grp_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="row-payments-container sf-w-24">
                      <CustomDatePickerFilter
                        label="Max Group Date"
                        name="max_grp_date"
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>

                  {/* Row 2: Name + Status */}
                  <div className="sf-row sf-row-2 sf-mt-3">
                    <div className="row-payments-container sf-w-49">
                      <CustomInputFilter label="Group Name" name="search_str" type="text" />
                    </div>

                    <div className="row-payments-container sf-w-49">
                      <CustomSelectFilter label="Status" name="status">
                        <option value=""></option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Active">Active</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Blacklisted">Blacklisted</option>
                        <option value="Left">Left</option>
                      </CustomSelectFilter>
                    </div>
                  </div>

                  {/* Footer: Branches + Unit + Submit */}
                  <div className="sf-footer sf-mt-3 sf-footer-groups">
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

                    <div className="row-payments-container sf-unit">
                      <CustomSelectFilter label="Unit" name="unit_id">
                        <option value="">------</option>
                        {units.map((ut) => (
                          <option key={ut.id} value={ut.id}>
                            {ut.name}
                          </option>
                        ))}
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
};

export default Filter;