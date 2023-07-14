import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setLoans, setParams, intValues}) => {
    const initialValues = {
        page_num: 1, 
        branch_ids: intValues.branch_ids, 
        currency_id: intValues.currency_id, 
        lower_limit: intValues.lower_limit, 
        upper_limit: intValues.upper_limit
    };

    const getParams = (values) => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(values)) {
            if (Array.isArray(value)) {
                value.forEach(el => params.append(key, el));
            }else {
                params.append(key, value);
            }
        }
        return params
    }

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      setParams(params);
      const response = await axios.get('/reportsapi/ageing-report/', {params: params});
      setLoans(response.data);
    } catch (error) {
      if (error.message === "Network Error") {
        actions.setErrors({responseStatus: "Network Error"});
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
            <div style={{height:'50px'}}>
                <Form>
                    <NonFieldErrors errors={errors}>
                        <SubmitButtonFilter isSubmitting={isSubmitting}/>
                    </NonFieldErrors>
                </Form>
            </div>
        )}
    </Formik>
  );
}

const SubmitButtonFilter = ({isSubmitting}) => {
    if (isSubmitting) {
        return (
            <div style={{marginTop:"10px"}}>
                <label className='form-label row-label'></label>
                <span>
                    <button className='btn btn-olive' type='submit' style={{pointerEvents: 'none', opacity: '0.7'}} disabled={true}>
                        <i className='fa fa-spinner fa-spin'></i> Please wait..
                    </button>
                </span>
            </div>
        )
    }
    return (
        <div style={{marginTop:"10px"}}>
            <label className='form-label row-label'></label>
            <span>
                <button className='btn btn-olive' type='submit'>Show Loans</button>
            </span>
        </div>
    )
}

export default Filter;

