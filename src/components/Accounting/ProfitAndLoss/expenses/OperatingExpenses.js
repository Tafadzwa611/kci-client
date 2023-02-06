import React from 'react';
import { Link } from 'react-router-dom';

function OperatingExpenses({totalOperatingExpenses, operatingExpenses, currencyIso}) {

  const handleClick = (evt) => {
    console.log('handleClick');
  }

  return (
    <>
      <tr>
        <td className='text-bold bg-red'>Operating Expenses</td>
        <td className='text-bold bg-red'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input name='InterestExpenses' type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalOperatingExpenses}`} readOnly/> */}
          {`${currencyIso} ${totalOperatingExpenses}`}
        </td>
      </tr>
      {(operatingExpenses.length > 0) ? operatingExpenses.map((ie, idx) => {
        return (
          <tr key={idx}>
            <td><Link to='#' style={{cursor: 'pointer'}} onClick={handleClick} name={ie.name} data-type={ie.name}>{ie.name}</Link></td>
            <td align='right'>
              {/* <input type='text' name={ie.name} autoComplete='off' value={`${currencyIso} ${ie.amount}`} readOnly={true} className='custom-select-form row-form input-background'/> */}
              {`${currencyIso} ${ie.amount}`}
            </td>
          </tr>
        )
      }) : 
      <tr>
        <td><h6>No Operating Expenses were incurred in the selected branches within the selected date range.</h6></td>
        <td align='right'>
          {/* <input type='text' autoComplete='off' value={`${currencyIso} 0.00`} readOnly={true} className='custom-select-form row-form input-background'/> */}
          {`${currencyIso} 0.00`} 
        </td>
      </tr>}
    </>
  )
}

export default OperatingExpenses;