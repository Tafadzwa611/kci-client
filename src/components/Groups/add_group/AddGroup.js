import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { removeEmptyValues } from '../../../utils/utils';
import { Form, Formik, FieldArray } from 'formik';
import {
  CustomCheckbox,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  CustomDatePicker,
  CustomPhoneNumber
} from '../../../common';
import CustomForm from './CustomForm';
import { Member, AddMember } from './Members';
import * as yup from 'yup';

const createGroupSchema = yup.object().shape({
  name: yup.string().required('Required').max(50),
  group_type_id: yup.number().integer().required('Required'),
  address: yup.string().required('Required'),
  group_phone_number: yup.object().shape({countryCode: yup.string().required(), phoneNumber: yup.string().required('Required')}),
});

function AddGroup({groupTypes, loanOfficers, groupRoles, clientControls, units}) {
  const [fieldsets, setFieldsets] = React.useState(null);
  const navigate = useNavigate();

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

  const initialValues = {
    name: '',
    members: [],
    group_type_id: '',
    group_date: '',
    address: '',
    group_phone_number: {},
    group_account_number: '',
    group_bank_name: '',
    group_officer_id: '',
    unit_id: '',
    fieldsets: {}
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    // try {
    //   const data = removeEmptyValues(values);
    //   data.group_phone_number = `${values.group_phone_number.countryCode} ${values.group_phone_number.phoneNumber}`;
    //   data.members = values.members.map(member => ({client_id: member.client_id, role_id: member.role_id}))
    //   const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
    //   const response = await axios.post('/clientsapi/add_group/', data, CONFIG);
    //   navigate({pathname: '/groups/viewgroups', search: `?group_id=${response.data.id}`});
    // } catch (error) {
    //   console.log(error);
    //   if (error.message === 'Network Error') {
    //     actions.setErrors({responseStatus: 'Network Error'});
    //   } else if (error.response.status >= 400 && error.response.status < 500) {
    //     actions.setErrors({responseStatus: error.response.status, ...error.response.data});
    //   } else {
    //     actions.setErrors({responseStatus: error.response.status});
    //   }
    // }
  }

  return (
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
  )
}

const getElement = (form, field, values, setFieldValue) => {
  const dataTypes = {
    free_text: 'text',
    integer: 'number',
    decimal: 'number',
    date: 'date',
  };

  const fieldLabel = field.is_required ? field.name : `${field.name} (Optional)`;
  const name = `fieldsets.${form.id}.${field.name}`;

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

export default AddGroup;
