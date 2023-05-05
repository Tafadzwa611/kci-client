import React from 'react';
import { Form, Formik } from 'formik';
import {ModalActionSubmit, NonFieldErrors, ActionModal } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteGroup = ({setOpen, groupID, setGroupsData, setGroupId, setGroupDetails}) => {
  const navigate = useNavigate();
  const onSubmit = async (_, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.delete(`/clientsapi/delete_group/${groupID}/`, CONFIG);
      setOpen(false);
      if (setGroupId) {
        setGroupDetails(null);
        setGroupId(null);
        setGroupsData(curr => {
          return {
            count: curr.count - 1,
            next_page_num: curr.next_page_num,
            groups: curr.groups.filter(grp => grp.id !== groupID)
          }
        });
      }
      navigate({pathname: '/groups/viewgroups'});

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
    <ActionModal>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <div className="title" style={{fontSize: "0.875rem"}}>
                Are you sure you want to delete group.
              </div>
              <ModalActionSubmit isSubmitting={isSubmitting} setOpen={setOpen} act={'Continue'} />
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </ActionModal>
  )
}

export default DeleteGroup;