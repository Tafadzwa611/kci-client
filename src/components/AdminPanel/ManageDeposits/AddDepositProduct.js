import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    CustomSelect,
    CustomInput,
    SubmitButton,
    NonFieldErrors
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

function AddDepositProduct() {
    const { currencies } = useCurrencies();
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post('/deposits/create_product/', values, CONFIG);
            navigate({pathname: `/users/admin/staff/staffdetails/${response.data.id}`});
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

    const initialValues = {name: ''};

    return (
        <div>
            <button type='button' className='btn btn-default max'>
                <Link to='/users/admin/managedeposits'>Back</Link>
            </button>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, isSubmitting, errors}) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='divider divider-info'>
                                <span>Product Information</span>
                            </div>
                            <CustomInput label='Product Name' name='name' type='text' required/>
                            <CustomSelect label='Currency' name='currency_id' required>
                                <option value=''>------</option>
                                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                            </CustomSelect>
                            <CustomSelect label='Interest Term' name='interest_term' required>
                                <option value=''>------</option>
                                <option value='Fixed'>Fixed</option>
                            </CustomSelect>
                            {values.interest_term === 'Fixed' && (
                                <CustomInput 
                                    label='Fixed Interest Rate' 
                                    name='fixed_interest_rate' 
                                    type='number' 
                                    required
                                />
                            )}
                            <CustomSelect label='Interest Method' name='interest_method' required>
                                <option value=''>------</option>
                                <option value='End of Day Balance'>End of Day Balance</option>
                            </CustomSelect>
                            <CustomSelect label='Interest Posting Frequency' name='interest_posting_frequency' required>
                                <option value=''>------</option>
                                <option value='Daily'>Daily</option>
                                <option value='Weekly'>Weekly</option>
                                <option value='Monthly'>Monthly</option>
                                <option value='Quarterly'>Quarterly</option>
                                <option value='Semi-Annually'>Semi-Annually</option>
                                <option value='Annually'>Annually</option>
                            </CustomSelect>
                            <div className='divider divider-info'>
                                <span>Accounting</span>
                            </div>
                            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                                <SubmitButton isSubmitting={isSubmitting}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddDepositProduct;