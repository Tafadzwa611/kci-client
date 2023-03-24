import React from 'react';
import ProductForm from './ProductForm';
import {editLoanProductSchema} from './schema';
import { removeNull,removeEmptyValues } from '../../../../../utils/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

function EditProduct({productGrps, initialValues, setView, setSelectedPrdct}) {
  removeNull(initialValues);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/edit_loan_product/${data.id}/`, data, CONFIG);
      setSelectedPrdct(values);
      setView('list');
    } catch (error) {
      if (error.message === "Network Error") {
        actions.setErrors({responseStatus: "Network Error"});
      } else if (error.response.status === 400) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const back = () => setView('list');

  return (
    <ProductForm
      productGrps={productGrps}
      initialValues={initialValues}
      validationSchema={editLoanProductSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditProduct;
