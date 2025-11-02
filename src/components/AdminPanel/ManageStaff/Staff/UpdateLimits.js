import React from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Formik, FieldArray } from 'formik';
import {
    ButtonDefault,
    ButtonSuccess,
    CustomSelect,
    CustomInput,
    SubmitButton,
    NonFieldErrors
} from '../../../../common';
import { useCurrencies } from '../../../../contexts/CurrenciesContext';
import Cookies from 'js-cookie';

function UpdateLimits() {
    const params = useParams();
    const navigate = useNavigate();
    const { currencies } = useCurrencies();
    const [limits, setLimits] = React.useState(null);

    React.useEffect(() => {
        async function fetch() {
            const response = await axios.get(`/usersapi/limits/${params.staffId}/`);
            setLimits(response.data);
        }
        fetch();
    }, []);

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            await axios.put(`/usersapi/update_limits/${params.staffId}/`, values, CONFIG);
            navigate({pathname: `/users/admin/staff/staffdetails/${params.staffId}`});
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

    if (limits === null) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <button type='button' className='btn btn-default max'>
                <Link to={`/users/admin/staff/staffdetails/${params.staffId}`}>Back</Link>
            </button>
            <Formik initialValues={{limits}} onSubmit={onSubmit}>
                {({ values, isSubmitting, errors}) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='divider divider-info'>
                                <span>Set User Limits</span>
                            </div>
                            <FieldArray name='limits'>
                                {({ push, remove }) => (
                                    <div>
                                        {values.limits.map((limit, index) => (
                                            <div key={index}>
                                                <CustomSelect label='Currency' name={`limits[${index}].currency_id`} required>
                                                    <option value=''>------</option>
                                                    {currencies.map(currency => (
                                                        <option key={currency.id} value={currency.id}>
                                                            {currency.fullname}
                                                        </option>
                                                    ))}
                                                </CustomSelect>
                                                <CustomInput label='Amount' name={`limits[${index}].amount`} type='number' required/>
                                                <ButtonDefault
                                                    value='Remove Limit'
                                                    handler={(evt) => {
                                                        evt.preventDefault();
                                                        remove(index);
                                                    }}
                                                />
                                                <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                                            </div>
                                        ))}
                                        <div style={{marginTop: '10px'}}>
                                            <ButtonSuccess value='Add Limit' handler={() => push({currency_id: '', amount: ''})} />
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
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

export default UpdateLimits;