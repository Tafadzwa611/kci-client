import React, {useState} from 'react';
import { NonFieldErrors, CustomSelect } from '../../../common';
import { Form, Formik } from 'formik';
import SolidarityGroupForm from './SolidarityGroupForm';
import { removeEmptyValues } from '../../../utils/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function EditSolidarityLoanForm({loan, loanProducts}) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(loanProducts.find(prod => prod.id == loan.loan_product_id));
  const products = loanProducts.filter(prod => prod.client_type === 'Groups (solidarity)' && prod.is_active && prod.id !== product.id);

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
    principal_distribution: loan.sub_loans_list,
    group_id: loan.group_id,
    group: {value: loan.group_id, label: `${loan.group_name} - ${loan.group_branch}`},
    guarantor_id: loan.guarantor_id,
    guarantor: loan.guarantor_id ? {value: loan.guarantor_id, label: `${loan.guarantor}`} : '',
    group_guarantor_id: loan.group_guarantor_id,
    group_guarantor: loan.group_guarantor_id ? {value: loan.group_guarantor_id, label: `${loan.group_guarantor}`} : '',
  };

  const onChange = (evt, setFieldValue) => {
    const {value} = evt.target;
    const product = products.find(prod => prod.id == value);
    setProduct(product);
    setFieldValue('fees', product.fees);
    setFieldValue('loan_product_id', value);
  }

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/update_soloan_api/${loan.id}/`, {...data, fees: values.fees}, CONFIG);
      navigate({pathname: `/loans/viewloans/loandetails/cli/${loan.id}`});
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
              {[product, ...products].map(product => (
                <option key={product.id} value={product.id}>
                  ({product.currency})-{product.name}-{product.client_type}
                </option>
              )
              )}
            </CustomSelect>
            <SolidarityGroupForm
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

export default EditSolidarityLoanForm;