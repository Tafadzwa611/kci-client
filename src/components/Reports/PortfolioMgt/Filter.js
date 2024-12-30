import React from 'react';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import { getParams } from '../../../utils/utils';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
    NonFieldErrors,
    CustomDatePickerFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';

const Filter = ({setReport}) => {
    const {currencies} = useCurrencies();
    const {branches} = useBranches();
    const initialValues = {status_list: [], branch_ids: [], currency_id: '', min_date: '', max_date: ''};

    const onSubmit = async (values, actions) => {
        try {
            const params = getParams(values);
            const response = await axios.get('/reportsapi/portfolio_mgt/', {params: params});
            setReport(response.data);
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
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomDatePickerFilter label='Min Date' name='start_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomDatePickerFilter label='Max Date' name='end_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomSelectFilter label='Currency' name='currency_id' required>
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                                    <div style={{width:'45%'}}>
                                        <CustomMultiSelectFilter
                                            label='Branches'
                                            name='branch_ids'
                                            options={branches.map(br => ({label: br.name, value:br.id}))}
                                            setFieldValue={setFieldValue}
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
    )
}

export default Filter;