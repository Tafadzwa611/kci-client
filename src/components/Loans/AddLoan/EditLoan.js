import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher, NonFieldErrors } from '../../../common';
import { CustomSelect } from '../../../common';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClientFormFields from './ClientFormFields';
import { removeEmptyValues } from '../../../utils/utils';

function EditLoan({products}) {
  const params = useParams();

  return (
    <Fetcher urls={[`/loansapi/get_loan/${params.loanId}/`]}>
      {({data}) => {
        return (
          <EditLoanFoam loanDetails={data[0]} products={products} />
        )
      }}
    </Fetcher>
  )
}

const EditLoanFoam = ({loanDetails, products}) => {
  const navigate = useNavigate();
  const {loan} = loanDetails;
  const [product, setProduct] = useState(products.find(prod => prod.id == loanDetails.loan.loan_product_id));

  const initialValues = {
    loan_product_id: product.id,
    principal: loan.principal,
    interest_rate: loan.interest_rate,
    application_date: loan.app_date,
    number_of_repayments: loan.number_of_repayments,
    first_repayment_date: loan.first_payment_date,
    schedule_strategy: loan.schedule_strategy,
    reason_for_loan: loan.reason_for_borrowing,
    fees: product.fees,
    files: [],
    client_id: loan.client_id || '',
    group_id: loan.group_id || '',
    client: loan.client_id ? {value: loan.client_id, label: `${loan.client_fullname} - ${loan.client_branch}`} : '',
    group: loan.group_id ? {value: loan.group_id, label: `${loan.group_name} - ${loan.group_branch}`} : ''
  };

  const onChange = (evt, setFieldValue, prevProductId) => {
    const {value} = evt.target;
    const product = products.find(prod => prod.id == value);
    const prevProduct = products.find(prod => prod.id == prevProductId);
    setProduct(product);
    setFieldValue('fees', product.fees);
    setFieldValue('loan_product_id', value);
    if (prevProduct.client_type !== product.client_type) {
      setFieldValue('client_id', '');
      setFieldValue('group_id', '');
    }
  }

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/update_loan_api/${loan.id}/`, data, CONFIG);
      navigate({pathname: '/loans/viewloans', search: `?loan_id=${loan.id}`});
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
      {({isSubmitting, setFieldValue, errors, values}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Loan Product</span>
            </div>
            <CustomSelect
              label='Loan Product'
              name='loan_product_id'
              value={product.id}
              onChange={(evt) => onChange(evt, setFieldValue, values.loan_product_id)}
              required
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  ({product.currency})-{product.name}-{product.client_type}
                </option>
              )
              )}
            </CustomSelect>
            <ClientFormFields
              product={product}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              values={values}
            />
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

export default EditLoan;