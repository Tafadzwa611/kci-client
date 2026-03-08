import React from 'react';

const ReceiptBooksContext = React.createContext({});

const ReceiptBooksProvider = ({children}) => {
  const [receiptBooks, setReceiptBooks] = React.useState([]);

  return (
    <ReceiptBooksContext.Provider value={{receiptBooks, setReceiptBooks}}>
      {children}
    </ReceiptBooksContext.Provider>
  );
};

function useReceiptBooks() {
  return React.useContext(ReceiptBooksContext)
}

export {ReceiptBooksContext, ReceiptBooksProvider, useReceiptBooks};