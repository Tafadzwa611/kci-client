import React from 'react';
import {createLoanProductSchema} from './schema';
import ProductForm from './ProductForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../../utils/utils';

function AddProduct({loanFees, setView, setProductId, setProducts, setSelectedPrdct}) {
  const initialValues = {
    name: '',
    ext_name: '',
    description: '',
    product_type: '',
    loan_product_id: '',
    minimum_principal_amount: '',
    default_principal_amount: '',
    maximum_principal_amount: '',
    currency_id: '',
    minimum_interest_rate: '',
    default_interest_rate: '',
    maximum_interest_rate: '',
    interest_method: '',
    interest_interval: '',
    loan_duration_time_unit: '',
    schedule_strategy: '',
    action_on_holiday: '',
    minimum_loan_duration: '',
    default_loan_duration: '',
    maximum_loan_duration: '',
    number_of_decimal_places: '',
    rounding_scheme: '',
    allow_early_settlement_on_penalties: false,
    is_active: false,
    client_type: '',
    allowed_branches_ids: [],
    repayment_order: {first: 'penalty', second: 'fees', third: 'interest', fourth: 'principal'},
    fees: [],
    action_on_loan_default: 'Do Nothing',
    apply_late_repayment_penalty_on: '',
    penalty_charged_per: '',
    late_repayment_penalty_percentage: '',
    grace_period: '',
    topup_window_period: 0,
    number_of_topups_allowed: 0,
    topup_limit: 0,
    send_sms_on_default: false,
    auto_restructure: false,
    auto_restructure_interest: '',
    auto_restructure_installments: '',
  };

  const back = () => setView('list');

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      data.default_principal_amount = data.minimum_principal_amount;
      data.default_interest_rate = data.minimum_interest_rate;
      data.default_loan_duration = data.minimum_loan_duration;
      data.allowed_branches_ids = values.allowed_branches_ids.map(allowed_branches_id => allowed_branches_id.value);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post('/loansapi/add_loan_product/', {...data, fees: values.fees}, CONFIG);
      setProductId(response.data.id);
      setProducts(curr => [response.data, ...curr]);
      setSelectedPrdct(response.data);
      setView('list');
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
    <ProductForm
      initialValues={initialValues}
      validationSchema={createLoanProductSchema}
      onSubmit={onSubmit}
      back={back}
      loanFees={loanFees}
    />
  )
}

export default AddProduct;