import React from 'react';
import {createLoanProductSchema} from './schema';
import { post } from './post';
import ProductForm from './ProductForm';

function AddProduct({productGrps, setView, setProductId}) {
  const initialValues = {
    name: '',
    description: '',
    product_category_id: '',
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
  };

  const repaymentOrder = [
    initialValues.repayment_order.first,
    initialValues.repayment_order.second,
    initialValues.repayment_order.third,
    initialValues.repayment_order.fourth
  ];

  const onSubmit = async (values, actions) => {
    post(values, actions.setErrors, setProductId, setView);
  }

  const back = () => setView('list');

  return (
    <ProductForm
      productGrps={productGrps}
      initialValues={initialValues}
      validationSchema={createLoanProductSchema}
      onSubmit={onSubmit}
      back={back}
      repaymentOrder={repaymentOrder}
    />
  )
}

export default AddProduct;