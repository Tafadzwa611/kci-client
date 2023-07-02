import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomDatePickerFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const DateRange = ({setLoanProductsReportData, setParams, setIntValues, products}) => {
  const initialValues = {
    loan_product_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
  };
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
      console.log(params)
      setParams(params);
      setIntValues(values);
      const response = await axios.get('/reportsapi/loan-product-report/', {params: params});
      setLoanProductsReportData(response.data);
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
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"49%"}}>
                                <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"90%"}}>
                                <CustomMultiSelectFilter
                                    label='Loan Products'
                                    name='loan_product_ids'
                                    options={products.map(br => ({label: br.name, value:br.id}))}
                                    setFieldValue={setFieldValue}
                                    required
                                />
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

