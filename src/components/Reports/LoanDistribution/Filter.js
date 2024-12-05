import React from 'react';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import { getParams } from '../../../utils/utils';
import axios from 'axios';
import { Form, Formik } from 'formik';

const Filter = ({setReport}) => {
    const {currencies} = useCurrencies();
    const {branches} = useBranches();
    const initialValues = {branch_ids: [], currency_id: '', min_date: '', max_date: ''};

    const onSubmit = async (values, actions) => {
        try {
            const params = getParams(values);
            const response = await axios.get('/reportsapi/distribution_by_sector/', {params: params});
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
            {({isSubmitting, setFieldValue, errors}) => ()}
        </Formik>
    )
}

export default Filter;