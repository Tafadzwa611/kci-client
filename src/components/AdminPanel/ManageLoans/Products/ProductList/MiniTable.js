import React from 'react';

function MiniTable({products, handleClick, selectedPrdct}) {
  return (
    <table className='table'>
      <tbody>
        <tr className='journal-details header'>
          <th>Name</th>
        </tr>
        {products.map(product => {
          return (
            <tr key={product.id}>
              <td>
                <span
                  id={product.id}
                  onClick={handleClick}
                  style={{fontSize:'0.75rem', cursor:'pointer', ...(selectedPrdct.id == product.id && {color:'red'})}}
                  className='link'>
                  {product.name}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default MiniTable;
