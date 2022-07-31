import React from 'react';

function Investments({totalInvestments, investments, currencyIso}) {
  const handleClick = (evt) => {
    console.log('handleClick');
  }

  return (
    <>
      <tr>
        <td className='text-bold bg-green'>Interest Income and discounts received from investments</td>
        <td className='text-bold bg-green'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          <input
            name='investments'
            type='text'
            className='form-control well'
            value={`${currencyIso} ${totalInvestments}`}
            readOnly
          />
        </td>
      </tr>
      {(investments.length > 0) ? investments.map((inv, idx) => {
        return (
          <tr key={idx}>
            <td>
              <Link to='#' style={{cursor: 'pointer'}} onClick={handleClick} name={inv.name} data-type={inv.name}>{inv.name}</Link>
            </td>
            <td align='right'>
              <input
                type='text'
                name={inv.name}
                autoComplete='off'
                value={`${currencyIso} ${inv.amount}`}
                readOnly={true}
                className='form-control well'
              />
            </td>
          </tr>
        )
      }) : <tr>
            <td><h6>No Interest Income and discounts received from investments was received in the selected branches within the selected date range.</h6></td>
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

export default Investments;