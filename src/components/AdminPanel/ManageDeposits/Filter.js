import React from 'react';
import { Form, Formik } from 'formik';
import { removeEmptyValues, getParams } from '../../../utils/utils';
import axios from 'axios';
import {
  NonFieldErrors,
  CustomInputFilter,
  SubmitButtonFilter,
  CustomCheckBoxfilter
} from '../../../common';

function Filter({setProducts}) {
    const onSubmit = async (values, actions) => {
        try {
            const data = removeEmptyValues(values);
            const params = getParams(data);
            const response = await axios.get('/deposits/list/', {params: params});
            setProducts(response.data);
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
        <Formik initialValues={{active: true, name: ''}} onSubmit={onSubmit}>
            {({isSubmitting, errors}) => (
                <div className='search_background'>
                    <div className='row-containers' style={{border:'none'}}>
                        <Form>
                            <NonFieldErrors errors={errors}>
                                <div className='row row-payments row-loans' style={{marginTop:'1rem'}}>
                                    <div className='row-payments-container' style={{width:'19%'}}>
                                        <CustomInputFilter label='Name' name='name'/>
                                        <CustomCheckBoxfilter label='Active' name='active'/>
                                    </div>
                                </div>
                                <div style={{marginTop:'1rem', display:'flex', justifyContent:'space-between'}}>
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