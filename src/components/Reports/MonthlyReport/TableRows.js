import React from 'react';

const FirstRow = ({ monthlyReport }) => {
  const month = new Date(monthlyReport.month);
  const options = { month: 'long', year: 'numeric'};
  const monthYear = new Intl.DateTimeFormat('en-US', options).format(month);
  return (
    <tr>
      <td className='text-bold bg-gray text-left' colSpan='12'>{ monthYear }</td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
      <td style={{display: 'none'}}></td>
    </tr>
  )
}

const SecondRow = ({monthlyReport}) => {
  const month = new Date(monthlyReport.month);
  const options = { month: 'long', year: 'numeric'};
  const monthYear = new Intl.DateTimeFormat('en-US', options).format(month);

  return (
    <tr>
      <td style={{textAlign: 'right'}}>{ monthYear }</td>
      <td style={{textAlign: 'right'}}>{ monthlyReport.loan_count }</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_principal}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_interest}`}</td>
      <td style={{textAlign: 'right'}}>{ monthlyReport.payment_count }</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_amount_paid}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_principal_paid}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_interest_paid}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_penalty_paid}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_money_to_be_refunded}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.penalty_count}`}</td>
      <td style={{textAlign: 'right'}}>{`${monthlyReport.sum_penalty}`}</td>
    </tr>
  )
}
  
const ThirdRow = ({monthlyReport, currencyIso}) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      {/* <td></td> */}
      <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_principal_paid}`}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_interest_paid}`}</td>
      {/* <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_fees_paid}`}</td> */}
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_penalty_paid}`}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_paid}`}</td>
    </tr>
  )
}
  
const FourthRow = ({ monthlyReport }) => {
  return (
    <tr>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td style={{textAlign: 'right', borderBottom: '1px #000000 solid'}}></td>
      <td className='text-bold' style={{textAlign: 'right', borderBottom: '1px #000000 solid', width:'9%'}}>Net Due:</td>
      <td className='text-bold' style={{textAlign: 'right', fontWeight:'bold', borderBottom: '1px #000000 solid'}}>{ monthlyReport.sum_principal_due }</td>
      <td className='text-bold' style={{textAlign: 'right', fontWeight:'bold', borderBottom: '1px #000000 solid'}}>{ monthlyReport.sum_interest_due }</td>
      <td className='text-bold' style={{textAlign: 'right', fontWeight:'bold', borderBottom: '1px #000000 solid'}}>{ monthlyReport.sum_fees_due }</td>
      <td className='text-bold' style={{textAlign: 'right', fontWeight:'bold', borderBottom: '1px #000000 solid'}}>{ monthlyReport.sum_penalty_due }</td>
      <td className='text-bold' style={{textAlign: 'right', fontWeight:'bold', borderBottom: '1px #000000 solid'}}>{ monthlyReport.total_due }</td>
    </tr>
  )
}

export { FirstRow, SecondRow, ThirdRow, FourthRow };