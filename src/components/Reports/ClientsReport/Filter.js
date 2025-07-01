import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomInputFilter,
  CustomDatePickerFilter,
  CustomSelectFilter,
  MultiSelectFilter,
  SubmitButtonFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import ReportFields from '../ReportFields/ReportFields';

const Filter = ({setClientsReportData, setParams, units, savedTemplates, columns}) => {
  const [showReportFields, setShowReportFields] = React.useState(false);
  const [templates, setTemplates] = React.useState(savedTemplates);
  const initialValues = {
    branch_ids: [],
    page_num: 1,
    min_date: '',
    max_date: '',
    client_str: '',
    order: '-id',
    mode: 'html',
    unit_id: '',
    report_template_id: ''
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
        const response = await axios.get('/reportsapi/clients-report/', {params});
        setClientsReportData(response.data);
      }else {
        params.append('file_format', values.mode);
        await axios.get('/reportsapi/clients_report_export/', {params});
      }
    } catch (error) {
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
    <>
      {showReportFields && (
        <ReportFields 
          columns={columns}
          templates={templates}
          setTemplates={setTemplates}
          setOpen={setShowReportFields}
          reportType='CLIENTS_REPORT'
        />
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({isSubmitting, setFieldValue, errors}) => (
          <div className='search_background'>
            <div className='row-containers' style={{border:'none'}}>
              <Form>
                <NonFieldErrors errors={errors}>
                  <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomDatePickerFilter label='Min Client Reg Date' name='min_date' setFieldValue={setFieldValue} required/>
                    </div>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomDatePickerFilter label='Max Client Reg Date' name='max_date' setFieldValue={setFieldValue} required/>
                    </div>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomDatePickerFilter label='Min Loan DB Date' name='min_db_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomDatePickerFilter label='Max Loan DB Date' name='max_db_date' setFieldValue={setFieldValue}/>
                    </div>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomSelectFilter label='Unit' name='unit_id'>
                        <option value=''>------</option>
                        {units.map(ut => <option key={ut.id} value={ut.id}>{ut.name}</option>)}
                      </CustomSelectFilter>
                    </div>
                    <div className='row-payments-container' style={{width:'16%'}}>
                      <CustomInputFilter label='Search Client' name='client_str' type='text'/>
                    </div>
                  </div>
                  <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                    <div style={{width:'53%'}}>
                      <MultiSelectFilter
                          label='Branches'
                          name='branch_ids'
                          options={branches.map(br => ({label: br.name, value:br.id}))}
                          setFieldValue={setFieldValue}
                          required
                      />
                    </div>
                    <div className='row-payments-container' style={{width:'10%'}}>
                      <CustomSelectFilter label='Template' name='report_template_id'>
                        <option value=''>------</option>
                        {templates.map(template => <option key={template.id} value={template.id}>{template.report_name}</option>)}
                      </CustomSelectFilter>
                      <a onClick={() => setShowReportFields(true)}>View Templates</a>
                    </div>
                    <div className='row-payments-container' style={{width:'10%'}}>
                      <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                      </CustomSelectFilter>
                    </div>
                    <div className='row-payments-container' style={{width:'10%'}}>
                      <CustomSelectFilter label='Order' name='order' required>
                        <option value={'-id'}>Show newest first</option>
                        <option value={'id'}>Show oldest first</option>
                      </CustomSelectFilter>
                    </div>
                    <div className='row-payments-container' style={{width:'10%'}}>
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
                    <SubmitButtonFilter isSubmitting={isSubmitting}/>
                  </div>
                </NonFieldErrors>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Filter;

