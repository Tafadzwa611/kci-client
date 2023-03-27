import React from 'react';

function MainTable({products, handleClick}) {
  return (
    <table className="table">
      <tbody>
        <tr className="journal-details header">
          <th>Name</th>
          <th>Loan_Product_#</th>
          <th>Interest_Rate</th>
          <th>Interest_Method</th>
          <th>Currency</th>
          <th>Date_Created</th>
        </tr>
        {products.map(product => {
          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td><span onClick={handleClick} id={product.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{product.loan_product_id}</span></td>
              <td>{product.default_interest_rate}%{product.interest_interval}</td>
              <td>{product.interest_method}</td>
              <td>{product.currency}</td>
              <td>{product.date_created}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MainTable;