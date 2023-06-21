import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import {
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
  NonFieldErrors
} from '../../../common';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

function SmsList() {
  const [messages, setMessages] = useState({
    next_page_num: 1, 
    prev_page_num: null,
    number: null,
    num_of_pages: null,
    count: null,
    sms_list: []
  });
  const [params, setParams] = useState(null);


  return (
    <>
      <Filter setParams={setParams} setMessages={setMessages}/>
      <div style={{paddingTop: '2rem'}}></div>
      <div className='table-header'>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <Pager
            nextPageNumber={messages.next_page_num}
            params={params}
            prevPageNumber={messages.prev_page_num}
            setMessages={setMessages}
          />
          <div style={{marginTop:'6px'}}>Showing {messages.sms_list.length} of {messages.count} messages.</div>
        </div>
        <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
          <div style={{marginTop:'6px'}}>Page {messages.number} of {messages.num_of_pages}</div>
          <div>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='sms'
              filename='Sms List'
              sheet='tablexls'
              buttonText='Download as XLS'
            />
          </div>
        </div>
      </div>
      <MainTable messages={messages}/>
    </>
  )
}

const Filter = ({setParams, setMessages}) => {
  const initialValues = {
    page_num: 1,
    sender_id: '',
    min_date: '',
    max_date: '',
    status: '',
  };

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/clientsapi/sms_list/', {params: params});
      setMessages(response.data);
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors}) => (
        <div className="search_background">
          <div className="row-containers" style={{border:"none"}}>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue}/>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Status' name='status'>
                      <option value=''>------</option>
                      <option value='SENT'>Sent</option>
                      <option value='FAILED'>Failed</option>
                      <option value='PENDING'>Pending</option>
                    </CustomSelectFilter>
                  </div>
                  <div className='row-payments-container' style={{width:'24%'}}>
                    <CustomSelectFilter label='Sender' name='sender_id'>
                      <option value=''>------</option>
                    </CustomSelectFilter>
                  </div>
                </div>
                <SubmitButtonFilter isSubmitting={isSubmitting}/>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

const MainTable = ({messages}) => {
  return (
    <div style={{display:'block'}}>
      <div style={{padding:'0', border:'none'}}>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table className='table' id='sms'>
              <thead>
                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                  <th style={{textAlign:'start'}}>Client</th>
                  <th style={{textAlign:'start'}}>Phone_Number</th>
                  <th style={{textAlign:'start'}}>Message</th>
                  <th style={{textAlign:'start'}}>Status</th>
                  <th style={{textAlign:'start'}}>Date_Send</th>
                  <th style={{textAlign:'start'}}>Send_By</th>
                </tr>
              </thead>
              <tbody>
                {messages.sms_list.map(message => {
                  return (
                    <tr key={message.id}>
                      <td><Link to={`/clients/viewclients/clientdetails/${message.client_id}`}>{message.client__fullname}</Link></td>
                      <td>{`+${message.phone_number}`}</td>
                      <td>{message.sms}</td>
                      <td>{message.status}</td>
                      <td>{message.date_send}</td>
                      <td>{message.sender}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Pager = ({
  prevPageNumber,
  nextPageNumber,
  setMessages,
  params
}) => {
  const [errors, setErrors] = useState(null);

  const onClick = async (evt) => {
    try {
      const pageNum = evt.target.innerText === 'Next' ? nextPageNumber : prevPageNumber;
      params.set('page_num', pageNum);
      const response = await axios.get('/clientsapi/sms_list/', {params: params});
      setMessages(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        setErrors({detail: 'Network Error'});
      } else {
        setErrors({detail: 'Server Error'});
      }
    }
  }

  return (
    <div className='footer-container font-12 text-light' style={{display:'flex', columnGap:'3px'}}>
      {errors && JSON.stringify(errors)}
      {prevPageNumber ? <><button className='btn btn-default' onClick={onClick}>Back</button><br/></>: null}
      {nextPageNumber && params ? <button className='btn btn-default' onClick={onClick}>Next</button>: null}
    </div>
  )
}

export default SmsList;