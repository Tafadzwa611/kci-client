import React from 'react';

const ProductsContext = React.createContext({});

const ProductsProvider = ({children}) => {
  const [products, setProducts] = React.useState([]);

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts() {
  return React.useContext(ProductsContext)
}

export {ProductsContext, ProductsProvider, useProducts};