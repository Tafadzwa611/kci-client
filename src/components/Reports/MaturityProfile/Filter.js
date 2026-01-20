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
    MultiSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter
} from '../../../common';

const statusValues = [
    'Open',
    'Arrears'
];

const Filter = ({setReport}) => {
    const {currencies} = useCurrencies();
    const {branches} = useBranches();

    const initialValues = {
        status_list: [],
        branch_ids: [],
        currency_id: '',
        report_date: ''
    };

    const allBranchIds = branches.map(br => br.id);

    const onSubmit = async (values, actions) => {
        try {
            const params = getParams(values);
            if (values.branch_ids.includes('*')) {
                params.delete('branch_ids');
                allBranchIds.forEach(id => params.append('branch_ids', id));
            }
            const response = await axios.get('/reportsapi/maturity_profile/', {params: params});
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
                                    <div className='row-payments-container' style={{width:'32.5%'}}>
                                        <CustomDatePickerFilter label='Report Date' name='report_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32.5%'}}>
                                        <CustomSelectFilter label='Currency' name='currency_id' required>
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32.5%'}}>
                                        <CustomMultiSelectFilter
                                            label='Status'
                                            name='status_list'
                                            options={statusValues.map(val => ({label: val, value: val}))}
                                            setFieldValue={setFieldValue}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
                                    <div style={{width:'90%'}}>
                                        <MultiSelectFilter
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
    )
}

export default Filter