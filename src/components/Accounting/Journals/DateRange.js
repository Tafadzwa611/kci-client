import React, {useState} from 'react';
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

const DateRange = ({setJournals, setParams, setIntValues, accounts, staff, setAccountId, setOpenBal}) => {
    const initialValues = {
        branch_ids: [],
        page_num: 1,
        min_date: '',
        max_date: '',
        order: '',
        account_id: '',
        user_id: '',
    };
    const {currencies} = useCurrencies();
    const {branches} = useBranches();

    const [currencyId, seCurrencyId] = useState('');
    const onChange = (setFieldValue, newValue) => {
        setFieldValue('currency_id', newValue);
        seCurrencyId(newValue)
    }

    const onChangeAccount = (setFieldValue, newValue) => {
        setFieldValue('account_id', newValue);
        setAccountId(newValue)
    }

    const newaccounts = accounts.filter(acc => acc.currency == currencyId);

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
            const response = await axios.get('/acc-api/journals-list/', {params: params});
            setJournals(response.data);
            setOpenBal(response.data.account_opening_balance);
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
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                    <CustomSelectFilter 
                                                label='Currency' 
                                            name='currency_id' 
                                            onChange={evt => onChange(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomDatePickerFilter label='Min Date' name='min_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomDatePickerFilter label='Max Date' name='max_date' setFieldValue={setFieldValue} required/>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomSelectFilter 
                                            label='Account' 
                                            name='account_id'
                                            onChange={evt => onChangeAccount(setFieldValue, evt.target.value)}
                                            required
                                        >
                                            <option value=''>------</option>
                                            {newaccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                    <div className="row-payments-container" style={{width:"19%"}}>
                                        <CustomSelectFilter label='User' name='user_id'>
                                            <option value=''>------</option>
                                            {staff.map(mbr => <option key={mbr.id} value={mbr.id}>{mbr.first_name} {mbr.last_name}</option>)}
                                        </CustomSelectFilter>
                                    </div>
                                </div>
                                <div style={{marginTop:"1rem", display:"flex", justifyContent:"space-between"}}>
                                    <div style={{width:"80%"}}>
                                        <CustomMultiSelectFilter
                                            label='Branches'
                                            name='branch_ids'
                                            options={branches.map(br => ({label: br.name, value:br.id}))}
                                            setFieldValue={setFieldValue}
                                            required
                                        />
                                    </div>
                                    <div className="row-payments-container" style={{width:"10%"}}>
                                        <CustomSelectFilter label='Order' name='order' required>
                                            <option value=''>------</option>
                                            <option value={'date_created'}>Show oldest first</option>
                                            <option value={'-date_created'}>Show newest first</option>
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

export default DateRange;

