import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const DateRange = ({setStatement, setParams, setIntValues, setReconciled, accounts}) => {
  const initialValues = {
    account_id: '',
    report_date: '',
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
      setIntValues(values);
      const response = await axios.get('/acc-api/cash-report/', {params: params});
      setStatement(response.data);
      setReconciled(response.data.reconciled);
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
          <div className="search_background">
            <div className="row-containers" style={{border:"none"}}>
                <Form>
                    <NonFieldErrors errors={errors}>
                        <div className="row row-payments row-loans" style={{marginTop:"1rem"}}>
                            <div className="row-payments-container" style={{width:"45%"}}>
                                <CustomDatePickerFilter label='Report Date' name='report_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"45%"}}>
                                <CustomSelectFilter label='Account' name='account_id' required>
                                    <option value=''>------</option>
                                    {accounts.accounts.map(account => <option key={account.id} value={account.id}>{account.currency} {account.label} {account.branch}</option>)}
                                </CustomSelectFilter>
                            </div>
                            <SubmitButtonFilter isSubmitting={isSubmitting}/>
                        </div>
                    </NonFieldErrors>
                </Form>
            </div>
        </div>
      )}
    </Formik>
  );
}

export default DateRange;

