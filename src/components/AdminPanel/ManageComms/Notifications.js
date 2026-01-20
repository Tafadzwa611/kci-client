import React, { useState } from 'react';
import { Fetcher, DeleteBtn } from '../../../common';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Modal,
  NonFieldErrors,
  CustomSelect,
  CustomInput,
  CustomTimePicker,
  ModalSubmit
} from '../../../common';
import { Form, Formik } from 'formik';
import { removeEmptyValues } from '../../../utils/utils';

function Notifications() {
  return (
    <Fetcher urls={['/usersapi/schedule_notifications_list/']}>
      {({data}) => <Table initTasks={data[0]} />}
    </Fetcher>
  )
}

const TARGETS_MAP = {user: 'Users', client: 'Clients'};
const NOTIFICATIONS_MAP = {
  arrears: 'Loan Default',
  reminder: 'Installment Reminder',
  birthday: 'Birthday Reminder'
};

const Table = ({initTasks}) => {
  const [tasks, setTasks] = useState(initTasks);
  const [modal, setModal] = useState(false);

  const del_task = async (evt) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.delete(`/usersapi/delete_periodic_task/${evt.target.id}/`, CONFIG);
      setTasks(curr => curr.filter((task) => task.id != evt.target.id))
    } catch (error) {
      if (error.message === 'Network Error') {
        console.log({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        console.log({responseStatus: error.response.status, ...error.response.data});
      } else {
        console.log({responseStatus: error.response.status});
      }
    }
  }

  return (
    <>
      <div style={{margin: '20px 0'}}>
        <button type='button' className='btn btn-success' onClick={() => setModal(true)}>Add Notification</button>
      </div>
      {modal ? <CreatePeriodicTask setOpen={setModal} setTasks={setTasks}/> : null}
      <div className='table-responsive font-12'>
        <table className='table table-hover'>
          <tbody>
            <tr className='journal-details header'>
              <th>Target</th>
              <th>Notification</th>
              <th>Description</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
            {tasks.map(task => (
              <tr key={task.id} className='table-row'>
                <td>{TARGETS_MAP[task.target]}</td>
                <td>{NOTIFICATIONS_MAP[task.notification]}</td>
                <td>{task.description}</td>
                <td>{task.time}</td>
                <td>
                  <DeleteBtn id={task.id} handler={del_task} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const CreatePeriodicTask = ({setTasks, setOpen}) => {
  const initialValues = {
    target: '',
    notification: '',
    schedule_time: '',
    num_of_days_from_installment: ''
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const cleanValues = removeEmptyValues(values);
      const {target, notification, schedule_time, ...rest} = cleanValues;
      const data = {target, notification, schedule_time, extra_data: rest};
      const response = await axios.post('/usersapi/schedule_notification/', data, CONFIG);
      const newTask = response.data;
      const newTaskStr = `${newTask.target}${newTask.notification}${newTask.time}`;
      setTasks(curr => [newTask, ...curr.filter((task) => `${task.target}${task.notification}${task.time}` !== newTaskStr)]);
      setOpen(false);
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
    <Modal open={true} setOpen={setOpen} title='Create Notification'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <Form autoComplete='off'>
            <NonFieldErrors errors={errors}>
              <div className='create_modal_container'>
                <div>
                  <CustomSelect label='Target' name='target' required>
                    <option value=''>------</option>
                    <option value='user'>Users</option>
                    <option value='client'>Clients</option>
                  </CustomSelect>
                  <CustomSelect label='Notification' name='notification' required>
                    <option value=''>------</option>
                    <option value='arrears'>Loan Default</option>
                    <option value='reminder'>Installment Reminder</option>
                    <option value='birthday'>Birthday Reminder</option>
                  </CustomSelect>
                  {values.notification === 'reminder' ? <CustomInput label='Days From Installment' type='number' min='1' step='1' name='num_of_days_from_installment' required/> : null}
                  <CustomTimePicker setFieldValue={setFieldValue} label='Time' name='schedule_time' required/>
                </div>
                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Notifications;