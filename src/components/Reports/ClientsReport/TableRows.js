import React from 'react';

const FirstRow = ({client}) => {
  return (
    <tr>
      <td className='text-bold bg-gray text-left' colSpan='9'>{ client.fullname }</td>
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

const SecondRow = ({client, currencyIso}) => {
  return (
    <tr>
      <td style={{textAlign: 'right'}} className="reports-table-border-left">{client.loan_count}</td>
      <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal}`}</td>
      <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal_due}`}</td>
      <td className='text-bold text-red text-right'>Amount:</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${client.sum_principal}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${client.sum_interest}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${client.sum_fees}`}</td>
      <td className='text-bold text-red text-right'>{`${currencyIso} ${client.sum_penalty}`}</td>
      <td className='text-bold text-red text-right reports-table-border-right'>{`${currencyIso} ${client.total_amount}`}</td>
    </tr>
  )
}
  
const ThirdRow = ({client, currencyIso}) => {
  return (
    <tr>
      <td className="reports-table-border-left"></td>
      <td></td>
      <td></td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal_paid}`}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_interest_paid}`}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_fees_paid}`}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_penalty_paid}`}</td>
      <td className='text-bold text-green reports-table-border-right' style={{textAlign: 'right'}}>{`${currencyIso} ${client.total_paid}`}</td>
    </tr>
  )
}
  
const FourthRow = ({client, currencyIso}) => {
  return (
    <tr>
      <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}} className="reports-table-border-left"></td>
      <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
      <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
      <td className="text-bold" style={{textAlign:"right", borderBottom:"1px solid #dee2e6", width:"9%"}}>Net Due:</td>
      <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${client.sum_principal_due}`}</td>
      <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${client.sum_interest_amount_due}`}</td>
      <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${client.sum_fees_due}`}</td>
      <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${client.sum_penalty_due}`}</td>
      <td className="text-bold reports-table-border-right" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${client.total_due}`}</td>
    </tr>
  )
}

export { FirstRow, SecondRow, ThirdRow, FourthRow };