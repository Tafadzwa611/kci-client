import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import EditProduct from '../CreateUpdate/EditProduct';
import AddProduct from '../CreateUpdate/AddProduct';
import { Fetcher, SuccessBtn } from '../../../../../common';

function ProductList({data}) {
  const [productId, setProductId] = React.useState(null);
  const [view, setView] = React.useState('list');
  const [selectedPrdct, setSelectedPrdct] = React.useState(null);
  const [products, setProducts] = React.useState(data);

  React.useEffect(() => {
    if (productId !== null) {
      const product = products.find(prd => prd.id == productId);
      setSelectedPrdct(product);
    }
  }, []);

  const handleClick = (e) => {
    const product = products.find(prd => prd.id == e.target.id);
    setSelectedPrdct(product);
  }

  const urls = ['/loansapi/list_fees/', '/usersapi/list_field_sets/?entity_type=LOAN'];

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Loan Product'}/>
        <Table
          setView={setView}
          products={products}
          selectedPrdct={selectedPrdct}
          handleClick={handleClick}
          setSelectedPrdct={setSelectedPrdct}
          setProducts={setProducts}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <Fetcher urls={urls}>
        {({data}) => (
          <EditProduct
            loanFees={data[0]}
            fieldSets={data[1]}
            initialValues={selectedPrdct}
            accounting={selectedPrdct.accounting}
            setView={setView}
            setSelectedPrdct={setSelectedPrdct}
            setProducts={setProducts}
          />
        )}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={urls}>
      {({data}) => (
        <AddProduct
          loanFees={data[0]}
          fieldSets={data[1]}
          setProducts={setProducts}
          setSelectedPrdct={setSelectedPrdct}
          setView={setView}
          setProductId={setProductId}
        />
      )}
    </Fetcher>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
