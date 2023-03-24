import React from 'react';
import ProductForm from './ProductForm';
import {editLoanProductSchema} from './schema';
import { removeNull } from '../../../../../utils/utils';
import { put } from './post';

function EditProduct({productGrps, initialValues, setView, setSelectedPrdct}) {
  removeNull(initialValues);

  const onSubmit = async (values, actions) => {
    put(values, actions.setErrors, setSelectedPrdct, setView);
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
