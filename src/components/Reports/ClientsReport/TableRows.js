import React from 'react';

const FirstRow = ({client}) => {
  return (
    <tr>
      <td className='text-bold text-left journal-details header' colSpan='9'>{ client.fullname }</td>
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

const SecondRow = ({client}) => {
  return (
    <tr>
      <td style={{textAlign: 'right'}}>{client.loan_count}</td>
      <td style={{textAlign: 'right'}}>{client.sum_principal}</td>
      <td style={{textAlign: 'right'}}>{client.sum_principal_due}</td>
      <td className='text-bold text-red text-right'>Amount:</td>
      <td className='text-bold text-red text-right'>{client.sum_principal}</td>
      <td className='text-bold text-red text-right'>{client.sum_interest}</td>
      <td className='text-bold text-red text-right'>{client.sum_fees}</td>
      <td className='text-bold text-red text-right'>{client.sum_penalty}</td>
      <td className='text-bold text-red text-right'>{client.total_amount}</td>
    </tr>
  )
}
  
const ThirdRow = ({client}) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{client.sum_principal_paid}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{client.sum_interest_paid}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{client.sum_fees_paid}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{client.sum_penalty_paid}</td>
      <td className='text-bold text-green' style={{textAlign: 'right'}}>{client.total_paid}</td>
    </tr>
  )
}
  
const FourthRow = ({client}) => {
  return (
    <tr>
      <td style={{textAlign:"right"}} className="last__row__border"></td>
      <td style={{textAlign:"right"}} className="last__row__border"></td>
      <td style={{textAlign:"right"}} className="last__row__border"></td>
      <td className="text-bold last__row__border" style={{textAlign:"right", width:"9%"}}>Net Due:</td>
      <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{client.sum_principal_due}</td>
      <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{client.sum_interest_amount_due}</td>
      <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{client.sum_fees_due}</td>
      <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{client.sum_penalty_due}</td>
      <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{client.total_due}</td>
    </tr>
  )
}

export { FirstRow, SecondRow, ThirdRow, FourthRow };