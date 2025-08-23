import React from 'react';
import { Form, Formik } from 'formik';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import {
    NonFieldErrors,
    CustomInputFilter,
    SubmitButtonFilter,
    CustomSelectFilter,
    CustomDatePickerFilter
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
// import { useBranches } from '../../../contexts/BranchesContext';

function Filter({setDeposits}) {
    const { currencies } = useCurrencies();
    // const { branches } = useBranches();

    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            const params = getParams(data);
            const response = await axios.get('/deposits/list/', {params: params});
            setDeposits(response.data);
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    const initialValues = {
        account_number: '',
        min_balance: '',
        max_balance: '',
        q: '',
        currency_id: '',
        date_created_from: '',
        date_created_to: '',
        account_date_from: '',
        account_date_to: '',
        order_by: '',
        limit: 10,
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({isSubmitting, errors, setFieldValue}) => (
                <div className='search_background'>
                    <div className='row-containers' style={{border:'none'}}>
                        <Form>
                            <NonFieldErrors errors={errors}>
                                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomInputFilter label='Account Number' name='account_number'/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomInputFilter label='Min Balance' name='min_balance' type='number'/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomInputFilter label='Max Balance' name='max_balance' type='number'/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomInputFilter label='Search' name='q'/>
                                    </div>
                                    <div style={{width: '19%'}}>
                                        <CustomSelectFilter label='Currency' name='currency_id'>
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomDatePickerFilter label='Min Entry Date' name='date_created_from' setFieldValue={setFieldValue}/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomDatePickerFilter label='Max Entry Date' name='date_created_to' setFieldValue={setFieldValue}/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomDatePickerFilter label='Min Account Date' name='account_date_from' setFieldValue={setFieldValue}/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomDatePickerFilter label='Max Account Date' name='account_date_to' setFieldValue={setFieldValue}/>
                                    </div>
                                    <div style={{width: '19%'}}>
                                        <CustomSelectFilter label='Order By' name='order_by'>
                                            <option value=''>------</option>
                                            <option value='-id'>Order By ID DESC</option>
                                            <option value='id'>Show Oldest ID ASC</option>
                                            <option value='-account_number'>Order By Account Number DESC</option>
                                            <option value='account_number'>Show Oldest Account Number ASC</option>
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                                    <div style={{width: '19%'}}>
                                        <CustomSelectFilter label='Page Size' name='limit'>
                                            <option value='10'>10</option>
                                            <option value='25'>25</option>
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <SubmitButtonFilter isSubmitting={isSubmitting}/>
                            </NonFieldErrors>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default Filter;