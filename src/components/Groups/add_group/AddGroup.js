import React from 'react';
import {createGroupSchema} from './schema';
import GroupForm from './GroupForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { removeEmptyValues } from '../../../utils/utils';

function AddGroup({groupTypes, loanOfficers, groupRoles, clientControls}) {
  const navigate = useNavigate();

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
  };

  const onSubmit = async (values, actions) => {
    try {
      const phoneNumbers = {group_phone_number: ''};
      if (values.group_phone_number.phoneNumber) {
        phoneNumbers.group_phone_number = `${values.group_phone_number.countryCode} ${values.group_phone_number.phoneNumber}`;
      }
      let dataValues = {...values, ...phoneNumbers};
      const data = removeEmptyValues(dataValues);
      data.members = values.members.map(member => ({client_id: member.client_id, role_id: member.role_id}))
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/clientsapi/add_group/', data, CONFIG);
      navigate({pathname: '/groups/viewgroups', search: `?group_id=${response.data.id}`});
    } catch (error) {
      console.log(error);
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
    <GroupForm
      groupTypes={groupTypes}
      loanOfficers={loanOfficers}
      clientControls={clientControls}
      validationSchema={createGroupSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      groupRoles={groupRoles}
    />
  )
}

export default AddGroup;

