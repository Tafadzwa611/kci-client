import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ClientFormFields from './ClientFormFields';

function ClientForm({product}) {
  const navigate = useNavigate();
  const initialValues = {
    loan_product_id: product.id,
    principal: '',
    interest_rate: '',
    application_date: '',
    number_of_repayments: '',
    first_repayment_date: '',
    schedule_strategy: product.schedule_strategy,
    reason_for_loan: '',
    fees: product.fees.map(fee => ({fee_name: fee.fee_name, fee_type: fee.fee_type, fee_payment: fee.fee_payment, value: fee.value, is_mandatory: fee.is_mandatory})),
    files: [],
    ...product.client_type === 'Clients' ? {client_id: ''} : {group_id: ''}
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/add_loan_api/', values, CONFIG);
      navigate({pathname: '/loans/viewloans', search: `?loan_id=${response.data.loan_id}`});
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
    <ClientFormFields
      onSubmit={onSubmit}
      product={product}
      initialValues={initialValues}
    />
  )
}

export default ClientForm;