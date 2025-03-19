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
        branch_ids: [],
        page_num: 1,
        min_date: '',
        max_date: '',
        client_str: '',
        reason: '',
        status: '',
        mode: 'html',
        level: 'Detailed',
    };
    const {currencies} = useCurrencies();
    const {branches} = useBranches();

    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            if (values.mode === 'html') {
                const params = getParams(data);
                setParams(params);
                const response = await axios.get('/reportsapi/loans_granted/', {params: params});
                setReport(response.data);
            }else {
                data.file_format = values.mode;
                await axios.get('/reportsapi/loans_granted_export/', {params: getParams(data)});
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({isSubmitting, setFieldValue, errors}) => (
                <div className='search_background'>
                    <div className='row-containers' style={{border:'none'}}>
                        <Form>
                            <NonFieldErrors errors={errors}>
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
                                        <CustomSelectFilter label='Mode' name='mode' required>
                                            <option value='html'>Screen (HTML)</option>
                                            <option value='xlsx'>Excel</option>
                                            <option value='csv'>CSV</option>
                                        </CustomSelectFilter>
                                    </div>
                                    <div className='row-payments-container' style={{width:'18%'}}>
                                        <CustomSelectFilter label='Order' name='order' required>
                                            <option value={'-id'}>Show newest first</option>
                                            <option value={'id'}>Show oldest first</option>
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                                    <div style={{width:'80%'}}>
                                        <MultiSelectFilter
                                            label='Branches'
                                            name='branch_ids'
                                            options={branches.map(br => ({label: br.name, value:br.id}))}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className='row-payments-container' style={{width:'10%'}}>
                                        <CustomSelectFilter label='Level' name='level' required>
                                            <option value='Detailed'>Detailed</option>
                                            <option value='Summary'>Summary</option>
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

