import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { NonFieldErrors, CustomSelect } from '../../../common';
import GroupForm from '../add_group/GroupForm';
import {createGroupSchema} from '../add_group/schema';
import { Form, Formik } from 'formik';

const EditGroupForm = ({group, groupTypes, loanOfficers, groupRoles}) => {
  const navigate = useNavigate();
  const initialValues = {
    name: group.group_name,
    group_id: group.id,
    members: group.members.map(member => ({...member, id: member.client_id})),
    group_type_id: group.group_type_id,
    group_type: group.group_type_id ? {value: group.group_type_id, label: `${group.group_type}`} : '',
    group_date: group.grou_date,
    address: group.address,
    group_phone_number: group.group_phone_number,
    group_account_number: group.group_account_number,
    group_bank_name: group.group_bank_name,
    group_officer_id: group.group_officer_id,
    group_officer: group.group_officer_id ? {value: group.group_officer_id, label: `${group.group_officer}`} : '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.members = data.members.map(member => ({client_id: member.client_id, role_id: member.role_id}))
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/clientsapi/edit_group/${group.id}/`, {...data}, CONFIG);
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
        <GroupForm
            groupTypes={groupTypes}
            loanOfficers={loanOfficers}
            validationSchema={createGroupSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
            groupRoles={groupRoles}
        />
    )
}

export default EditGroupForm;