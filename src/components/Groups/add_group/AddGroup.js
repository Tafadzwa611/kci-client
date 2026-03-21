import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { removeEmptyValues } from "../../../utils/utils";
import { Form, Formik } from "formik";
import {
  CustomCheckbox,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  CustomPhoneNumber,
} from "../../../common";
import { Member, AddMember } from "./Members";
import * as yup from "yup";

const createGroupSchema = yup.object().shape({
  name: yup.string().required("Required").max(50),
  group_type_id: yup.number().integer().required("Required"),
  address: yup.string().required("Required"),
  group_phone_number: yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required("Required"),
  }),
});

function AddGroup({ groupTypes, loanOfficers, groupRoles, clientControls, units }) {
  const [fieldsets, setFieldsets] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchFieldsets = async () => {
      const response = await axios.get("/usersapi/list_field_sets/?entity_type=GROUP&active=1");
      setFieldsets(response.data);
    };
    fetchFieldsets();
  }, []);

  if (fieldsets === null) return <div>Loading...</div>;

  const initialValues = {
    name: "",
    members: [],
    group_type_id: "",
    group_date: "",
    address: "",
    group_phone_number: { countryCode: "", phoneNumber: "" },
    group_account_number: "",
    group_bank_name: "",
    group_officer_id: "",
    unit_id: "",
    fieldsets: convertToFormikFieldsets(fieldsets).fieldsets,
  };

  const onSubmit = async (values, actions) => {
    const custom_data = toFieldValueArray(values.fieldsets);

    try {
      let data = removeEmptyValues({ ...values });

      const cc = values?.group_phone_number?.countryCode || "";
      const pn = values?.group_phone_number?.phoneNumber || "";
      data.group_phone_number = `${cc} ${pn}`.trim();

      data.members = (values.members || []).map((m) => ({
        client_id: m.client_id,
        role_id: m.role_id,
      }));

      data.custom_data = custom_data;

      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/clientsapi/add_group/", data, CONFIG);

      navigate({
        pathname: "/groups/viewgroups",
        search: `?group_id=${response.data.id}`,
      });
    } catch (error) {
      console.log(error);
      if (error?.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error?.response?.status >= 400 && error?.response?.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error?.response?.status });
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={createGroupSchema} onSubmit={onSubmit}>
      {({ isSubmitting, errors, values, setFieldValue }) => (
        <Form autoComplete="off" className="sf-form">
          <NonFieldErrors errors={errors}>
            <div className="sf-page">
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Add Group</div>
                  <div className="sf-shell-subtitle">
                    Capture group details, custom fields, and members. Required fields must be completed before saving.
                  </div>
                </div>

                <div className="sf-shell-body">
                  {/* Section: Group Information */}
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Group information</div>
                      <div className="sf-section-hint">Core details used to register the group.</div>
                    </div>

                    <div className="sf-section-body sf-stack">
                      <CustomSelect label="Group Type" name="group_type_id" required>
                        <option value="">------</option>
                        {groupTypes.map((gtype) => (
                          <option key={gtype.id} value={gtype.id}>
                            {gtype.name}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomInput label="Group Name" name="name" type="text" required />

                      <CustomDatePicker
                        label="Group Date"
                        name="group_date"
                        setFieldValue={setFieldValue}
                        required
                      />

                      <CustomPhoneNumber
                        label="Group Phone Number"
                        name="group_phone_number"
                        setFieldValue={setFieldValue}
                      />

                      <CustomInput label="Group Address" name="address" type="text" required />

                      <CustomInput
                        label="Group Account Number"
                        name="group_account_number"
                        type="text"
                        required
                      />

                      <CustomInput label="Group Bank Name" name="group_bank_name" type="text" required />

                      <CustomSelect
                        label="Group Officer"
                        name="group_officer_id"
                        required={Boolean(clientControls?.group_officer_required)}
                      >
                        <option value="">------</option>
                        {loanOfficers.map((officer) => (
                          <option key={officer.id} value={officer.id}>
                            {officer.first_name} {officer.last_name}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomSelect
                        label="Unit"
                        name="unit_id"
                        required={Boolean(clientControls?.use_client_units)}
                      >
                        <option value="">------</option>
                        {units.map((ut) => (
                          <option key={ut.id} value={ut.id}>
                            {ut.name}
                          </option>
                        ))}
                      </CustomSelect>
                    </div>
                  </section>

                  {/* Section: Custom Fields */}
                  {fieldsets.map((fieldset) => (
                    <section className="sf-section" key={fieldset.id}>
                      <div className="sf-section-head">
                        <div className="sf-section-title">{fieldset.name}</div>
                        <div className="sf-section-hint">Additional information for this group.</div>
                      </div>

                      <div className="sf-section-body sf-stack">
                        {fieldset.fields.map((field) => getElement(fieldset, field, setFieldValue))}
                      </div>
                    </section>
                  ))}

                  {/* Section: Members */}
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Members</div>
                      <div className="sf-section-hint">Add members and assign roles.</div>
                    </div>

                    <div className="sf-section-body sf-stack">
                      {(values.members || []).map((member, index) => (
                        <React.Fragment key={index}>
                          <Member
                            id={member.id}
                            index={index}
                            groupRoles={groupRoles}
                            members={values.members}
                            setFieldValue={setFieldValue}
                            selectedMember={member}
                          />
                        </React.Fragment>
                      ))}

                      <AddMember members={values.members} setFieldValue={setFieldValue} />
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
  );
}

const convertToFormikFieldsets = (fieldsets) => ({
  fieldsets: Object.fromEntries(
    fieldsets.map((fieldset) => [
      String(fieldset.id),
      Object.fromEntries(fieldset.fields.map((field) => [String(field.id), ""])),
    ])
  ),
});

const toFieldValueArray = (fieldsets) =>
  Object.values(fieldsets).flatMap((fields) =>
    Object.entries(fields).map(([field_id, value]) => ({
      field_id: Number(field_id),
      value,
    }))
  );

const getElement = (fieldset, field, setFieldValue) => {
  const dataTypes = {
    free_text: "text",
    integer: "number",
    decimal: "number",
    date: "date",
  };

  const fieldLabel = field.is_required ? field.name : `${field.name} (Optional)`;
  const name = `fieldsets.${fieldset.id}.${field.id}`;

  if (field.data_type === "select") {
    return (
      <CustomSelect key={field.id} label={fieldLabel} name={name} required={field.is_required}>
        <option value="">------</option>
        {field.select_opts.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </CustomSelect>
    );
  }

  if (field.data_type === "checkbox") {
    return <CustomCheckbox key={field.id} label={fieldLabel} name={name} required={field.is_required} />;
  }

  return {
    free_text: (
      <CustomInput
        key={field.id}
        label={fieldLabel}
        name={name}
        type={dataTypes[field.data_type]}
        required={field.is_required}
      />
    ),
    integer: (
      <CustomInput
        key={field.id}
        label={fieldLabel}
        required={field.is_required}
        name={name}
        type={dataTypes[field.data_type]}
        onKeyDown={(e) => {
          if (e.key === ".") e.preventDefault();
        }}
      />
    ),
    decimal: (
      <CustomInput
        key={field.id}
        label={fieldLabel}
        name={name}
        type={dataTypes[field.data_type]}
        required={field.is_required}
      />
    ),
    date: (
      <CustomDatePicker
        key={field.id}
        label={fieldLabel}
        name={name}
        setFieldValue={setFieldValue}
        required={field.is_required}
      />
    ),
  }[field.data_type];
};

export default AddGroup;