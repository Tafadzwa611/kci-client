import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomInputFilter,
    CustomDatePickerFilter,
    CustomSelectFilter,
    MultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const Filter = ({setExpenseData, setParams, expensetypes}) => {
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    exp_name: '',
    exp_type_id: '',
    currency_id: '',
    min_expense_date: '',
    max_expense_date: '',
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const allBranchIds = branches.map(br => br.id);

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
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      setParams(params);
      const response = await axios.get('/expensesapi/expenseslist/', {params: params});
      setExpenseData(response.data);
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
                      <CustomDatePickerFilter label='Min Expense Date' name='min_expense_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className="row-payments-container" style={{width:"32%"}}>
                      <CustomDatePickerFilter label='Max Expense Date' name='max_expense_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className="row-payments-container" style={{width:"32%"}}>
                      <CustomInputFilter label='Expense Name' name='exp_name' type='text'/>
                    </div>
                  </div>
                  <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                    <div style={{width:"50%"}}>
                      <MultiSelectFilter
                        label='Branches'
                        name='branch_ids'
                        options={branches.map(br => ({label: br.name, value:br.id}))}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div style={{width:"20%"}}>
                      <CustomSelectFilter label='Expense Type' name='exp_type_id'>
                        <option value=''>------</option>
                        {expensetypes.map(expensetype => (
                          <option key={expensetype.id} value={expensetype.id}>
                            {expensetype.currency_shortname} {expensetype.name} {expensetype.branch_name}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>
                    <div style={{width:"20%"}}>
                      <CustomSelectFilter label='Currency' name='currency_id'>
                        <option value=''>------</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
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

