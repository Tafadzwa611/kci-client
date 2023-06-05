import React, {useEffect} from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomInputFilter,
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setPayments, setParams, reportId}) => {
  const initialValues = {
    status: '',
    page_num: 1,
    report_pk: reportId,
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

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
      const response = await axios.get('/loansapi/excel_payments_list/', {params: params});
      setPayments(response.data);
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
                            <div style={{width:"70%"}}>
                                <CustomSelectFilter label='Status' name='status' required>
                                    <option value=''>------</option>
                                    <option value='Failed'>Failed</option>
                                    <option value='Paid'>Paid</option>
                                    <option value='Over Paid'>Over Paid</option>
                                </CustomSelectFilter>
                                <input value={initialValues.report_pk} type="hidden" />
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

export default Filter;

