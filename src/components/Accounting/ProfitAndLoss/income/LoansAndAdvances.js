import React from 'react';
import { Link } from 'react-router-dom';

function LoansAndAdvances({totalAmount, loansAndAdvances, currencyIso}) {

  const handleClick = (evt) => {
    console.log('handleClick');
  }
  return (
    <>
      <tr>
        <td className='text-bold bg-green'>Interest Income from Loans and Advances</td>
        <td className='text-bold bg-green'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          <input
            name='loansAndAdvances'
            type='text'
            className='form-control well'
            value={`${currencyIso} ${totalAmount}`}
            readOnly
          />
        </td>
      </tr>
      {(loansAndAdvances.length>0) ? loansAndAdvances.map((la, idx) => {
        return (
          <tr key={idx}>
            <td>
              <Link to='#' style={{cursor: 'pointer'}} onClick={handleClick} name={la.name} data-type={la.name}>{la.name}</Link>
            </td>
            <td align='right'>
              <input
                type='text'
                name={la.name}
                autoComplete='off'
                value={`${currencyIso} ${la.amount}`}
                readOnly={true}
                className='form-control well'
              />
            </td>
          </tr>
        )
      }) : <tr>
            <td><h6>No Interest Income from Loans and Advances was received in the selected branches within the selected date range.</h6></td>
            <td align='right'>
              <input
                type='text'
                autoComplete='off'
                value={`${currencyIso} 0.00`}
                readOnly={true}
                className='form-control well'
              />
            </td>
          </tr>}
    </>
  )
}

export default LoansAndAdvances;