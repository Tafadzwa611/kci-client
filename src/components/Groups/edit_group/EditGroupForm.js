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
  CustomPhoneNumber
} from '../../../common';
import { AddMember, Member } from '../add_group/Members';

const createGroupSchema = yup.object().shape({
  name: yup.string().required('Required').max(50),
  group_type_id: yup.number().integer().required('Required'),
  address: yup.string().required('Required'),
  group_phone_number: yup.object().shape({countryCode: yup.string().required(), phoneNumber: yup.string().required('Required')}),
});

const EditGroupForm = ({group, groupTypes, loanOfficers, groupRoles, clientControls}) => {
  const navigate = useNavigate();
  const phoneNumberArray = group.group_phone_number.split(' ');

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
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.group_phone_number = `${values.group_phone_number.countryCode} ${values.group_phone_number.phoneNumber}`;
      data.members = data.members.map(member => ({client_id: member.client_id, role_id: member.role_id}));
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

export default EditGroupForm;