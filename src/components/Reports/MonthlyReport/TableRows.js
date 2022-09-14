import React from 'react';

const FirstRow = ({ monthlyReport }) => {
  const date = new Date(monthlyReport.date);
  const options = { month: 'long', year: 'numeric'};
  const monthYear = new Intl.DateTimeFormat('en-US', options).format(date);
  return (
    <tr>
      <td className='text-bold journal-details header text-left' colSpan='12'>{ monthYear }</td>
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

const SecondRow = ({monthlyReport, currencyIso}) => {
  return (
    <tr>
      <td style={{textAlign: 'right'}}></td>
      <td style={{textAlign: 'right'}}>{ monthlyReport.loan_count }</td>
      <td style={{textAlign: 'right'}}>{ monthlyReport.active_clients }</td>
      <td style={{textAlign: 'right'}}>{ monthlyReport.payment_count }</td>
      <td style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.sum_principal}`}</td>
      <td style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.sum_principal_due}`}</td>
      <td className='text-bold text-red text-right'>Amount Disbursed:</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${monthlyReport.sum_principal}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${monthlyReport.sum_interest}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${monthlyReport.sum_fees}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${monthlyReport.sum_penalty}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${monthlyReport.total_amount}`}</td>
    </tr>
  )
}
  
const ThirdRow = ({monthlyReport, currencyIso}) => {
  return (
    <tr>
      <td className="last__row__border"></td>
      <td className="last__row__border"></td>
      <td className="last__row__border"></td>
      <td className="last__row__border"></td>
      <td className="last__row__border"></td>
      <td className="last__row__border"></td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>Total Payments:</td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_principal_paid}`}</td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_interest_paid}`}</td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_fees_paid}`}</td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_penalty_paid}`}</td>
      <td className='text-bold text-green last__row__border' style={{textAlign: 'right'}}>{`${currencyIso} ${monthlyReport.total_paid}`}</td>
    </tr>
  )
}
  
const FourthRow = ({ monthlyReport }) => {
  return (
    <tr>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td style={{textAlign: 'right'}} className="last__row__border"></td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', width:'9%'}}>Net Due:</td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', fontWeight:'bold'}}>{ monthlyReport.sum_principal_due }</td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', fontWeight:'bold'}}>{ monthlyReport.sum_interest_due }</td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', fontWeight:'bold'}}>{ monthlyReport.sum_fees_due }</td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', fontWeight:'bold'}}>{ monthlyReport.sum_penalty_due }</td>
      <td className='text-bold last__row__border' style={{textAlign: 'right', fontWeight:'bold'}}>{ monthlyReport.total_due }</td>
    </tr>
  )
}

export { FirstRow, SecondRow, ThirdRow, FourthRow };