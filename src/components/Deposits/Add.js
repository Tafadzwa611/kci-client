import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
    CustomSelect,
    SubmitButton,
    NonFieldErrors,
    CustomSelectRemote
} from '../../common';
import { useBranches } from '../../contexts/BranchesContext';

function Add() {
    const [products, setProducts] = React.useState(null);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const { branches } = useBranches();

    React.useEffect(() => {
        async function fetch() {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            try {
                const response = await axios.get('/deposits/products/list/?active=true', CONFIG);
                setProducts(response.data);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.detail);
                    return;
                }
                console.error('An error occurred while fetching the product:', error);
            }
        }
        fetch();
    }, []);

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post('/deposits/create/', values, CONFIG);
            navigate({pathname: `/deposits/${response.data.id}`});
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

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!products) {
        return <div>Loading...</div>
    }

    const initialValues = {
        client_id: '',
        deposit_product_id: '',
        branch_id: ''
    }

    return (
        <div>
            <button type='button' className='btn btn-default max'>
                <Link to='/deposits'>Go To Deposits</Link>
            </button>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, setFieldValue, isSubmitting, errors}) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='divider divider-info'>
                                <span>Create Deposit</span>
                            </div>
                            <CustomSelectRemote
                                selected={values.client  || ''}
                                label='Client'
                                url='/clientsapi/search_client/'
                                setFieldValue={(fieldName, selected) => {
                                    setFieldValue('client', selected);
                                    setFieldValue(fieldName, selected.value);
                                }}
                                params={[{key: 'all_branches', value: 1}, {key: 'exclude_blacklisted', value: 1}, {key: 'exclude_rejected', value: 1}]}
                                queryParamName='query'
                                placeholder='Search Client'
                                name='client_id'
                                required
                            />
                            <CustomSelect label='Deposit Product' name='deposit_product_id' required>
                                <option value=''>------</option>
                                {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                            </CustomSelect>
                            <CustomSelect label='Branch' name='branch_id' required>
                                <option value=''>------</option>
                                {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                            </CustomSelect>
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

export default Add;