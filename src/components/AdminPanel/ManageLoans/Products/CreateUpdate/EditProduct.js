import React from 'react';
import ProductForm from './ProductForm';
import {editLoanProductSchema} from './schema';
import { removeNull, removeEmptyValues } from '../../../../../utils/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import { uuidv4 } from '../../../../../utils';

function EditProduct({loanFees, fieldSets, initialValues, setView, setSelectedPrdct, setProducts}) {
  initialValues.fees = initialValues.fees.map(fee => ({...fee, id: uuidv4()}));
  initialValues.custom_forms = initialValues.custom_forms.map(custom_form => ({...custom_form, id: uuidv4()}));
  initialValues.schedule_penalties = initialValues.schedule_penalties.map(schedule_penalty => ({...schedule_penalty, id: uuidv4()}));
  removeNull(initialValues);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const allowed_branches_ids = values.allowed_branches_ids.map(allowed_branches_id => allowed_branches_id.value);
      data.interest_application = values.product_type === 'Dynamic Term Loan' ? 'On Installment Date' : 'Upfront';
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.put(`/loansapi/edit_loan_product/${data.id}/`, {...data, fees: values.fees, custom_forms: values.custom_forms, allowed_branches_ids}, CONFIG);
      setProducts(curr => curr.map(prod => {
        if (prod.id === response.data.id) {
          return response.data;
        }
        return prod;
      }));
      setSelectedPrdct(response.data);
      setView('list');
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

  const back = () => setView('list');

  return (
    <ProductForm
      loanFees={loanFees}
      fieldSets={fieldSets}
      initialValues={initialValues}
      validationSchema={editLoanProductSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditProduct;
