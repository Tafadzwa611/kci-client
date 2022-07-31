import React from 'react';

function Provision({totalLoanlosses, loanLosses, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-red'>Provision for Loan losses</td>
        <td className='text-bold bg-red'></td>
        <td align='right' style={{fontWeight: 'bold'}}><input name='Provision' type='text' className='form-control well' value={`${currencyIso} ${totalLoanlosses}`} readOnly/></td>
      </tr>
      {(loanLosses.length > 0) ? loanLosses.map((l, idx) => {
        return (
          <tr key={idx}>
            <td><Link to='#' style={{cursor: 'pointer'}} onClick={handleClick} name={l.name} data-type={l.name}>{l.name}</Link></td>
            <td align='right'><input type='text' name={l.name} autoComplete='off' value={`${currencyIso} ${l.amount}`} readOnly={true} className='form-control well'/></td>
          </tr>
        )
      }) : 
      <tr>
        <td><h6>No Loan losses were incurred in the selected branches within the selected date range.</h6></td>
        <td align='right'><input type='text' autoComplete='off' value={`${currencyIso} 0.00`} readOnly={true} className='form-control well'/>
        </td>
      </tr>}
    </>
  )
}

export default Provision;