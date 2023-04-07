import React, { useState } from 'react';
// import SolidarityGroupForm from './SolidarityGroupForm';
import { NonFieldErrors } from '../../../common';
import { CustomSelect } from '../../../common';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClientFormFields from './ClientFormFields';
import { removeEmptyValues } from '../../../utils/utils';

function AddLoan({products}) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const initialValues = {
    loan_product_id: '',
    principal: '',
    interest_rate: '',
    application_date: '',
    number_of_repayments: '',
    first_repayment_date: '',
    schedule_strategy: '',
    reason_for_loan: '',
    fees: [],
    files: [],
    client_id: '',
    group_id: ''
  };

  const onChange = (evt, setFieldValue, prevProductId) => {
    const {value} = evt.target;
    const product = products.find(prod => prod.id == value) || null;
    setProduct(product);
    setFieldValue('loan_product_id', value);
    if (product) {
      setFieldValue('schedule_strategy', product.schedule_strategy);
      setFieldValue('fees', product.fees);
    }
    const prevProduct = products.find(prod => prod.id == prevProductId);
    if (prevProduct) {
      if (prevProduct.client_type !== product.client_type) {
        setFieldValue('client_id', '');
        setFieldValue('group_id', '');
      }
    }
  }

  const onSubmit = async (values, actions) => {
    console.log(values);
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/add_loan_api/', data, CONFIG);
      navigate({pathname: '/loans/viewloans', search: `?loan_id=${response.data.loan_id}`});
    } catch (error) {
      console.log(error);
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
      {({isSubmitting, setFieldValue, errors, values}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Loan Product</span>
            </div>
            <CustomSelect
              label='Loan Product'
              name='loan_product_id'
              value={product ? product.id : ''}
              onChange={(evt) => onChange(evt, setFieldValue)}
              required
            >
              <option value=''>------</option>
              {products.map(product => (
                  <option key={product.id} value={product.id}>
                    ({product.currency})-{product.name}-{product.client_type}
                  </option>
                )
              )}
            </CustomSelect>
            {product && {
              'Groups': <ClientFormFields
                product={product}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                values={values}
              />,
              'Clients': <ClientFormFields
                product={product}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                values={values}
              />
            }[product.client_type]}
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default AddLoan;