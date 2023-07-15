import React, {useState} from 'react';
import { Form, Formik } from 'formik';
import {addSchema} from './schema';
import {
  NonFieldErrors,
} from '../../../common';
import {
    CustomInputFilter,
    CustomSelectFilter,
    CustomMultiSelectFilter,
    SubmitButtonFilter,
    Modal
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import axios from 'axios';
import { removeEmptyValues } from '../../../utils/utils';

const AddPar = (
    {
        open, 
        setOpen, 
        setPars, 
        setIntValues, 
        setParams, 
        setCurrency,
        setLowerLimit, 
        setUpperLimit, 
        setCurrencyId, 
        setSelectedBranchesIds,
        selectedBranchesIds
    }) => {
    const initialValues = {branch_ids: [], currency_id: '', lower_limit: '', upper_limit: ''};

    const {currencies} = useCurrencies();
    const {branches} = useBranches();
  
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
            setSelectedBranchesIds(values.branch_ids)
            setLowerLimit(values.lower_limit);
            setUpperLimit(values.upper_limit);
            setCurrencyId(values.currency_id);
            const response = await axios.get('/reportsapi/par-report/', {params: params});
            setPars(curr => [...curr, {...response.data, selectedBIds: values.branch_ids }]);
            setCurrency(response.data.currency)
            setOpen(false);
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
        <Modal open={open} setOpen={setOpen} title={'Add Par'}>
            <Formik initialValues={initialValues} validationSchema={addSchema} onSubmit={onSubmit}>
                {({ isSubmitting, setFieldValue, errors }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className="create_modal_container">
                                <div style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                                    <CustomMultiSelectFilter
                                        label='Branches'
                                        name='branch_ids'
                                        options={branches.map(br => ({label: br.name, value:br.id}))}
                                        setFieldValue={setFieldValue}
                                        required
                                    />
                                    <CustomSelectFilter label='Currency' name='currency_id' required>
                                        <option value=''>------</option>
                                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                                    </CustomSelectFilter>
                                    <CustomInputFilter label='Lower Limit' name='lower_limit' type='text'/>
                                    <CustomInputFilter label='Upper Limit' name='upper_limit' type='text'/>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-end'}}>
                                    <SubmitButtonFilter isSubmitting={isSubmitting}/>
                                </div>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default AddPar;