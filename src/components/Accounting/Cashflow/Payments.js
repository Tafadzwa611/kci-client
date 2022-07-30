import React from 'react';

function Payments({statement, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-red text-bold'><b>Payments</b></td>
        <td></td>
      </tr>
      <tr>
        <td><b>Expenses</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.expenses}</td>
      </tr>
      <tr>
        <td><b>Refunds</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.refunds}</td>
      </tr>
      <tr>
        <td><b>Payments</b><em><small> ( to creditors )</small></em></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.money_paid_to_creditors}</td>
      </tr>
      <tr>
        <td><b>Loans Released (Principal)</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.amount_disbursed}</td>
      </tr>
      <tr>
        <td style={{borderBottom: '1px solid #000000'}} className='text-red'><b>Total Payments (B)</b></td>
        <td style={{textAlign: 'right', borderBottom: '1px solid #000000'}} className='text-red text-bold'>{currencyIso} {statement.total_payments}</td>
      </tr>
    </>
  )
}

export default Payments;