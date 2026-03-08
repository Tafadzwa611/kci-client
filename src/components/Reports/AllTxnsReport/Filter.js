import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  MultiSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';

const Filter = ({setReport, setParams}) => {
  const initialValues = {
    min_date: '',
    max_date: '',
    currency_id: '',
    entry_type: '',
    page_num: 1,
    branch_ids: [],
    txn_types: [],
    mode: 'html'
  };
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const allBranchIds = branches.map(br => br.id);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      if (values.branch_ids.includes('*')) {
        params.delete('branch_ids');
        allBranchIds.forEach(id => params.append('branch_ids', id));
      }
      if (values.mode === 'html') {
        setParams(params);
        const response = await axios.get('/reportsapi/txns_report/', {params: params});
        setReport(response.data);
      }else {
        params.append('file_format', values.mode);
        await axios.get('/reportsapi/txns_report_export/', {params: params});
      }
    }catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const txnTypes = [
    {label: 'Disbursement', value: 'Disbursement'},
    {label: 'Fee Applied', value: 'Fee Applied'},
    {label: 'Interest Applied', value: 'Interest Applied'},
    {label: 'Penalty Interest', value: 'Scheduled Interest Applied'},
    {label: 'Interest Reversed', value: 'Interest Reversed'},
    {label: 'Penalty Applied', value: 'Penalty Applied'},
    {label: 'Penalty Reversed', value: 'Penalty Reversed'},
    {label: 'Payment', value: 'Repayment'},
    {label: 'Refund', value: 'Refund'},
    {label: 'Payment Reversed', value: 'Repayment Reversed'},
    {label: 'Interest Waived', value: 'Interest Waived'},
    {label: 'Penalty Waived', value: 'Penalty Waived'},
    {label: 'Fees Waived', value: 'Fees Waived'},
    {label: 'Fees Reversed', value: 'Fees Reversed'},
    {label: 'Top-Up Principal', value: 'Top-Up Principal'},
    {label: 'Top-Up Interest', value: 'Top-Up Interest'},
    {label: 'Write Off', value: 'Write Off'},
    {label: 'Undo Write Off', value: 'Undo Write Off'},
  ]

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors}) => (
        <div className='search_background'>
          <div className='row-containers' style={{border:'none'}}>
            <Form>
              <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                <div className='row-payments-container' style={{width:'18%'}}>
                  <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                </div>
                <div className='row-payments-container' style={{width:'18%'}}>
                  <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                </div>
                <div className='row-payments-container' style={{width:'18%'}}>
                  <CustomSelectFilter label='Currency' name='currency_id' required>
                    <option value=''>------</option>
                    {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                  </CustomSelectFilter>
                </div>
                <div className='row-payments-container' style={{width:'18%'}}>
                  <CustomSelectFilter label='Entry Type' name='entry_type'>
                    <option value=''>-----</option>
                    <option value='Dr'>Debit</option>
                    <option value='Cr'>Credit</option>
                  </CustomSelectFilter>
                </div>
                <div className='row-payments-container' style={{width:'18%'}}>
                  <CustomSelectFilter label='Mode' name='mode' required>
                    <option value='html'>Screen (HTML)</option>
                    <option value='xlsx'>Excel</option>
                    <option value='csv'>CSV</option>
                    <option value='pdfa4'>PDF A4</option>
                    <option value='pdfa3'>PDF A3</option>
                    <option value='pdfa2'>PDF A2</option>
                    <option value='pdfa1'>PDF A1</option>
                  </CustomSelectFilter>
                </div>
              </div>
              <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                <div style={{width:'45%'}}>
                  <MultiSelectFilter
                    label='Txn Types'
                    name='txn_types'
                    options={txnTypes}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div style={{width:'45%'}}>
                  <MultiSelectFilter
                    label='Branches'
                    name='branch_ids'
                    options={branches.map(br => ({label: br.name, value:br.id}))}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <SubmitButtonFilter isSubmitting={isSubmitting}/>
              </div>
              <NonFieldErrors errors={errors} />
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Filter;
