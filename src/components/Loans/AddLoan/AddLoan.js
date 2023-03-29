import React, { useState } from 'react';
import {
  Select,
} from '../../../common';
import ClientForm from './ClientForm';
import PureGroupForm from './PureGroupForm';
import SolidarityGroupForm from './SolidarityGroupForm';

function AddLoan({products}) {
  const [product, setProduct] = useState({});

  const onChange = (evt) => {
    const product = products.find(prod => prod.id == evt.target.value);
    setProduct(product);
  }

  const getForm = () => {
    if (product.client_type === 'Clients') {
      return <ClientForm product={product} />;
    } else if (product.client_type === 'Groups') {
      return <PureGroupForm product={product} />;
    } else if (product.client_type === 'Groups (solidarity)') {
      return <SolidarityGroupForm product={product} />;
    }
    return null;
  }

  return (
    <>
      <div className='row custom-background' style={{paddingBottom: '1.25rem'}}>
        <label className='form-label'>Loan Product</label>
        <Select onChange={onChange}>
          <option value=''>------</option>
          {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
        </Select>
      </div>
      {getForm()}
    </>
  )
}

export default AddLoan;