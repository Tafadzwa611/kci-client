import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setInstallments, setParams, setIntValues, setAggregateData}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    start_date: '',
    end_date: '',
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
      setIntValues(values);
      const response = await axios.get('/reportsapi/expected_installments_report/', {params: params});
      setInstallments(response.data.installments);
      setAggregateData(response.data.aggregate_data);
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
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomDatePickerFilter label='Start Value Date' name='start_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomDatePickerFilter label='End Value Date' name='end_date' setFieldValue={setFieldValue} required/>
                            </div>
                            <div className="row-payments-container" style={{width:"32%"}}>
                                <CustomSelectFilter label='Currency' name='currency_id' required>
                                    <option value=''>------</option>
                                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                </CustomSelectFilter>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"90%"}}>
                                <CustomMultiSelectFilter
                                    label='Branches'
                                    name='branch_ids'
                                    options={branches.map(br => ({label: br.name, value:br.id}))}
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

export default Filter;

