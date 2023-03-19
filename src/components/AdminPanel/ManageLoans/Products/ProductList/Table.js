import React from 'react';
import PropTypes from 'prop-types';
import ProductDetails from './ProductDetails';
import MainTable from './MainTable';
import MiniTable from './MiniTable';

function Table({
  products,
  selectedPrdct,
  handleClick,
  setSelectedPrdct,
}) {
  const close = () => setSelectedPrdct(null);
  const showDetails = selectedPrdct !== null;

  return (
    <>
      <div style={{padding:"0", border:"none"}} className={showDetails ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={showDetails ? "table-responsive journal__table-container" : "table-responsive full__table"} >
          <div className="table__height">
            {showDetails ? <MiniTable products={products} handleClick={handleClick} selectedPrdct={selectedPrdct}/> : <MainTable products={products} handleClick={handleClick}/>}
          </div>
          {showDetails && <ProductDetails product={selectedPrdct} close={close}/>}
        </div>
      </div>
    </>
  )
}

Table.propTypes = {
  details: PropTypes.bool,
  loadingMore: PropTypes.bool,
  products: PropTypes.array,
  selectedPrdct: PropTypes.object,
  handleClick: PropTypes.func,
  setDetails: PropTypes.func,
  loadMore: PropTypes.func,
  nextPageNumber: PropTypes.number,
  totalCount: PropTypes.number,
};

export default Table;