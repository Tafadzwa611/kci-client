import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  CustomPhoneNumber,
  CustomCheckbox
} from '../../../common';
import { AddMember, Member } from '../add_group/Members';

const createGroupSchema = yup.object().shape({
  name: yup.string().required('Required').max(50),
  group_type_id: yup.number().integer().required('Required'),
  address: yup.string().required('Required'),
  group_phone_number: yup.object().shape({countryCode: yup.string().required(), phoneNumber: yup.string().required('Required')}),
});

const EditGroupForm = ({group, groupTypes, loanOfficers, groupRoles, clientControls, units}) => {
  const [fieldsets, setFieldsets] = React.useState(null);
  const navigate = useNavigate();
  const phoneNumberArray = group.group_phone_number.split(' ');

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/usersapi/list_field_sets/?entity_type=GROUP&active=1');
      setFieldsets(response.data);
    }
    fetch();
  }, []);

  if (fieldsets === null) {
    return <div>Loading...</div>
  }

  const formikFieldsets = convertToFormikFieldsets(fieldsets).fieldsets;
  hydrateTargetFromCustomFields(group.custom_field_values, formikFieldsets);

  const initialValues = {
    name: group.group_name,
    group_id: group.id,
    members: group.members.map(member => ({...member, id: member.client_id})),
    group_type_id: group.group_type_id,
    group_type: group.group_type_id ? {value: group.group_type_id, label: `${group.group_type}`} : '',
    group_date: group.db_group_date,
    address: group.address,
    group_phone_number: {countryCode: phoneNumberArray[0], phoneNumber: phoneNumberArray[1]},
    group_account_number: group.group_account_number,
    group_bank_name: group.group_bank_name,
    group_officer_id: group.group_officer_id || '',
    unit_id: group.unit_id || '',
    fieldsets: formikFieldsets
  };

  const onSubmit = async (values, actions) => {
    try {
      const custom_data = toFieldValueArray(values.fieldsets);
      const data = removeEmptyValues(values);
      data.group_phone_number = `${values.group_phone_number.countryCode} ${values.group_phone_number.phoneNumber}`;
      data.members = data.members.map(member => ({client_id: member.client_id, role_id: member.role_id}));
      data.custom_data = custom_data;
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/clientsapi/edit_group/${group.id}/`, data, CONFIG);
      navigate({pathname: `/groups/viewgroups?group_id=${group.id}`});
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  return (
    <>
      <div>
        <button type='button' className='btn btn-default max'>
          <Link to={`/groups/viewgroups?group_id=${group.id}`}>Back</Link>
        </button>
      </div>
      <Formik initialValues={initialValues} validationSchema={createGroupSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className='divider divider-info'>
                <span>Group Information</span>
              </div>
              <CustomSelect label='Group Type' name='group_type_id' required>
                <option value=''>------</option>
                {groupTypes.map(gtype => <option key={gtype.id} value={gtype.id}>{gtype.name}</option>)}
              </CustomSelect>
              <CustomInput label='Group Name' name='name' type='text' required/>
              <CustomDatePicker label='Group Date' name='group_date' setFieldValue={setFieldValue} required/>
              <CustomPhoneNumber label='Group Phone Number' name='group_phone_number' setFieldValue={setFieldValue} />
              <CustomInput label='Group Address' name='address' type='text' required/>
              <CustomInput label='Group Account Number' name='group_account_number' type='text' required/>
              <CustomInput label='Group Bank Name' name='group_bank_name' type='text' required/>
              {clientControls.group_officer_required ? 
              <CustomSelect label='Group Officer' name='group_officer_id' required>
                <option value=''>------</option>
                {loanOfficers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
              </CustomSelect>:
              <CustomSelect label='Group Officer' name='group_officer_id'>
                <option value=''>------</option>
                {loanOfficers.map(officer => <option key={officer.id} value={officer.id}>{officer.first_name} {officer.last_name}</option>)}
              </CustomSelect>}
              {clientControls.use_client_units ? 
                <CustomSelect label='Unit' name='unit_id' required>
                  <option value=''>------</option>
                  {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                </CustomSelect>:
                <CustomSelect label='Unit' name='unit_id'>
                  <option value=''>------</option>
                  {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                </CustomSelect>
              }
              {fieldsets.map(fieldset => (
                <React.Fragment key={fieldset.id}>
                  <div className='divider divider-info'>{fieldset.name}</div>
                  {fieldset.fields.map(field => getElement(fieldset, field, setFieldValue))}
                </React.Fragment>
              ))}
              <div className='divider divider-info'>
                <span>Members</span>
              </div>
              {values.members.map((member, index) => {
                return(
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
                )
              })}
              <AddMember members={values.members} setFieldValue={setFieldValue} />
              <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
              <div style={{display:'flex', justifyContent: 'flex-end'}}> 
              <SubmitButton isSubmitting={isSubmitting}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

const toFieldValueArray = (fieldsets) => {
  return Object.values(fieldsets).flatMap((fields) =>
    Object.entries(fields).map(([field_id, value]) => ({
      field_id: Number(field_id),
      value,
    }))
  );
};

const convertToFormikFieldsets = (fieldsets) => {
  return {
    fieldsets: Object.fromEntries(
      fieldsets.map((fieldset) => [
        String(fieldset.id),
        Object.fromEntries(
          fieldset.fields.map((field) => [String(field.id), ""])
        ),
      ])
    ),
  };
};

function hydrateTargetFromCustomFields(customFieldValues, target) {
  Object.values(customFieldValues).forEach(fields => {
    fields.forEach(({ field_id, value }) => {
      Object.keys(target).forEach(groupId => {
        if (field_id in target[groupId]) {
          target[groupId][field_id] = value;
        }
      });
    });
  });

  return target;
}

const getElement = (fieldset, field, setFieldValue) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  const fieldLabel = field.is_required ? field.name : `${field.name} (Optional)`;
  const name = `fieldsets.${fieldset.id}.${field.id}`;

  if (field.data_type === 'select') {
    return (
      <CustomSelect key={field.id} label={fieldLabel} name={name} required={field.is_required}>
        <option value=''>------</option>
        {field.select_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </CustomSelect>
    )
  }

  if (field.data_type === 'checkbox') {
    return <CustomCheckbox key={field.id} label={fieldLabel} name={name} required={field.is_required}/>
  }

  return {
    free_text: <CustomInput key={field.id} label={fieldLabel} name={name} type={dataTypes[field.data_type]} required={field.is_required}/>,
    integer: <CustomInput
      key={field.id}
      label={fieldLabel}
      required={field.is_required}
      name={name}
      type={dataTypes[field.data_type]}
      onKeyDown={e => {if(e.key==='.')e.preventDefault()}}
    />,
    decimal: <CustomInput key={field.id} label={fieldLabel} name={name} type={dataTypes[field.data_type]} required={field.is_required}/>,
    date: <CustomDatePicker key={field.id} label={fieldLabel} name={name} setFieldValue={setFieldValue} required={field.is_required}/>
  }[field.data_type]
}

export default EditGroupForm;