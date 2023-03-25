import React, { useState } from 'react';
import { Fetcher } from '../../../../common';
import List from './List';

function ProductCategories() {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <>
      <Fetcher urls={['/loansapi/product_groups/']} extra={{categoryId, setCategoryId}}>
        {({data, extra}) => <List data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default ProductCategories;