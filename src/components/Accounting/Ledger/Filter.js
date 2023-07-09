import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {
    CustomDatePickerFilter,
    CustomSelectFilter,
    SubmitButtonFilter,
    NonFieldErrors
} from '../../../common';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';

const Filter = ({ 
    setTxns, 
    accounts, 
    setParams, 
    branches, 
    setOpeningBal, 
    setIntValues,
    setMode,
    mode
}) => {
    
    const initialValues = {
        page_num: 1,
        min_date: '',
        max_date: '',
        account_id: '',
        created_by_id: '',
    };
    const {currencies} = useCurrencies();

    const [currencyId, seCurrencyId] = useState('');
    const [branchId, setBranchId] = useState('');
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('currency_id', newValue);
        seCurrencyId(newValue)
    }

    const onChangeAccount = (setFieldValue, newValue) => {
        setFieldValue('branch_id', newValue);
        setBranchId(newValue)
    }

    const onChangeMode = (setFieldValue, newValue) => {
        setFieldValue('report_mode', newValue);
        setMode(newValue)
    }

    const newaccounts = accounts.filter(acc => acc.currency == currencyId).filter(acc => acc.branch_id == branchId);
    
    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            const params = getParams(data);
            setParams(params);
            setIntValues(values);
            const response = await axios.get(`/acc-api/${mode}/`, {params: params});
            setOpeningBal(response.data.account_opening_balance);
            setTxns(response.data);
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

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({isSubmitting, setFieldValue, errors}) => (
                <div className='search_background'>
                    <div className='row-containers' style={{border:'none'}}>
                        <Form>
                            <NonFieldErrors errors={errors}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomSelectFilter 
                                            label='Currency' 
                                            name='currency_id' 
                                            onChange={evt => onChange(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomDatePickerFilter label='Start Value Date' name='min_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomDatePickerFilter label='End Value Date' name='max_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                </div>
                                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomSelectFilter 
                                            label='Branch' 
                                            name='branch_id'
                                            onChange={evt => onChangeAccount(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {branches.map(branch => (<option key={branch.id} value={branch.id}>{branch.name}</option>))}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomSelectFilter label='Account' name='account_id'>
                                            <option value=''>------</option>
                                            {newaccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className='row-payments-container' style={{width:'32%'}}>
                                        <CustomSelectFilter 
                                            label='Mode' 
                                            name='report_mode'
                                            onChange={evt => onChangeMode(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            <option value='ledger'>Screen (HTML)</option>
                                            <option value='ledger_excel'>Excel</option>
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
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
