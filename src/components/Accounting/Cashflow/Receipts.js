import React from 'react';

function Receipts({statement, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-green text-bold'>Receipts</td>
        <td></td>
      </tr>
      <tr>
        <td><b>Cash</b><em><small> ( @ opening )</small></em></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.cash_at_opening}</td>
      </tr>
      <tr>
        <td><b>Cash</b><em><small> ( from overpaid loans )</small></em></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.overpayments}</td>
      </tr>
      <tr>
        <td><b>Cash</b><em><small> ( from creditors )</small></em></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.money_borrowed_from_creditors}</td>
      </tr>
      <tr>
        <td><b>Loan Principal Repayments</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.princ_repayments}</td>
      </tr>
      <tr>
        <td><b>Loan Interest Repayments</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.int_repayments}</td>
      </tr>
      <tr>
        <td><b>Loan Penalty Repayments</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.pen_repayments}</td>
      </tr>
      <tr>
        <td><b>Non Deductable Loan Fees</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.non_deductable_fees_repayments}</td>
      </tr>
      <tr>
        <td><b>Deductable Loan Fees</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.deductable_fees}</td>
      </tr>
      <tr>
        <td><b>Other Income</b></td>
        <td style={{textAlign: 'right'}}>{currencyIso} {statement.income}</td>
      </tr>
      <tr>
        <td style={{borderBottom: '1px solid #000000'}} className='text-green'><b>Total Receipts (A)</b></td>
        <td style={{textAlign: 'right', borderBottom: '1px solid #000000'}} className='text-bold text-green'>{currencyIso} {statement.total_receipts}</td>
      </tr>
    </>
  )
}

export default Receipts;