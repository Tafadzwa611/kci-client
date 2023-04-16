import React from 'react';
import ProductForm from './ProductForm';
import {editLoanProductSchema} from './schema';
import { removeNull,removeEmptyValues } from '../../../../../utils/utils';
import { useCurrencies } from '../../../../../contexts/CurrenciesContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { uuidv4 } from '../../../../../utils';

function EditProduct({productGrps, loanFees, initialValues, setView, setSelectedPrdct, setProducts}) {
  const {currencies} = useCurrencies();
  initialValues.fees = initialValues.fees.map(fee => ({...fee, id: uuidv4()}));
  removeNull(initialValues);

  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.put(`/loansapi/edit_loan_product/${data.id}/`, {...data, fees: values.fees, allowed_branches_ids: values.allowed_branches_ids}, CONFIG);
      setProducts(curr => {
        return curr.map(prod => {
          if (prod.id === values.id) {
            const currency = currencies.find(currency => currency.id == values.currency_id);
            const group = productGrps.find(group => group.id == values.product_category_id);
            values.currency = currency.fullname;
            values.product_category = group.name;
            values.fees = values.fees.map(fee => {
              const lf = loanFees.find(lf => lf.id == fee.loanfee_id);
              return {
                fee_calculation: lf.fee_calculation,
                fee_type: lf.fee_type,
                is_mandatory: lf.is_mandatory,
                name: lf.name,
                loanfee_id: fee.loanfee_id,
                value: fee.value,
                id: fee.id,
              }
            });
            return values
          }
          return prod
        })
      });
      setSelectedPrdct(values);
      setView('list');
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

  const back = () => setView('list');

  return (
    <ProductForm
      loanFees={loanFees}
      productGrps={productGrps}
      initialValues={initialValues}
      validationSchema={editLoanProductSchema}
      onSubmit={onSubmit}
      back={back}
    />
  )
}

export default EditProduct;
