import React from 'react';
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

const Filter = ({setClientsReportData, setParams, setIntValues}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
    client_str: '',
    order: '',
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
      const response = await axios.get('/reportsapi/clients-report/', {params: params});
      setClientsReportData(response.data);
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
                            <div className="row-payments-container" style={{width:"24%"}}>
                                <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue}/>
                            </div>
                            <div className="row-payments-container" style={{width:"24%"}}>
                                <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue}/>
                            </div>
                            <div className="row-payments-container" style={{width:"24%"}}>
                                <CustomInputFilter label='Search Client' name='client_str' type='text'/>
                            </div>
                            <div className="row-payments-container" style={{width:"24%"}}>
                                <CustomSelectFilter label='Currency' name='currency_id' required>
                                    <option value=''>------</option>
                                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                </CustomSelectFilter>
                            </div>
                        </div>
                        <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                            <div style={{width:"75%"}}>
                                <CustomMultiSelectFilter
                                    label='Branches'
                                    name='branch_ids'
                                    options={branches.map(br => ({label: br.name, value:br.id}))}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className="row-payments-container" style={{width:"15%"}}>
                                <CustomSelectFilter label='Order' name='order' required>
                                    <option value=''>------</option>
                                    <option value={'-id'}>Show newest first</option>
                                    <option value={'id'}>Show oldest first</option>
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

export default Filter;

