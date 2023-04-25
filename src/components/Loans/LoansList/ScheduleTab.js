import React, {useState} from 'react';
import { CheckBox } from '../../../common';

const thStyle1 = {border: 'none', borderBottom: '1px solid #c1d0d7', borderRight: '1px solid #c1d0d7'};
const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function ScheduleTab({installments}) {
  const [expected, setExpected] = useState(true);
  const [paid, setPaid] = useState(true);
  const [dues, setDues] = useState(true);

  return (
    <>
      <CheckBox isChecked={expected} label='Amount Expected' onChange={() => setExpected(curr => !curr)} />
      <CheckBox isChecked={paid} label='Amount Paid' onChange={() => setPaid(curr => !curr)} />
      <CheckBox isChecked={dues} label='Amount Due' onChange={() => setDues(curr => !curr)} />
      <table>
        <thead>
          <tr style={{backgroundColor: '#F2F8FF'}}>
            <th style={{width: '10px', border: 'none', borderBottom: '1px solid #c1d0d7'}}><b>#</b></th>
            <th style={thStyle1}><b>Due Date</b></th>
            {expected &&
            <>
              <th style={thStyle2}><b>Principal Expected</b></th>
              <th style={thStyle2}><b>Interest Expected</b></th>
              <th style={thStyle2}><b>Fees Expected</b></th>
              <th style={thStyle2}><b>Penalty Expected</b></th>
              <th style={thStyle1}><b>Total Expected</b></th>
            </>}
            {paid &&
            <>
              <th style={thStyle2}><b>Principal Paid</b></th>
              <th style={thStyle2}><b>Interest Paid</b></th>
              <th style={thStyle2}><b>Fees Paid</b></th>
              <th style={thStyle2}><b>Penalty Paid</b></th>
              <th style={thStyle1}><b>Total Paid</b></th>
            </>}
            {dues &&
            <>
              <th style={thStyle2}><b>Principal Due</b></th>
              <th style={thStyle2}><b>Interest Due</b></th>
              <th style={thStyle2}><b>Fees Due</b></th>
              <th style={thStyle2}><b>Penalty Due</b></th>
              <th style={thStyle1}><b>Total Due</b></th>
            </>}
            <th style={thStyle2}><b>State</b></th>
          </tr>
        </thead>
        <tbody>
          {installments.map(installment => (
            <tr key={installment.period}>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.period}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef,border-right: 1px solid #c1d0d7'}}>{installment.installment_date}</td>
              {expected &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.interest_on_settlement && installment.interest_on_settlement != installment.interest ?
                  <>
                    <del>{`${installment.interest}`}</del>
                    {` ${installment.interest_on_settlement}`}
                  </> :
                  `${installment.interest}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.fees_on_settlement && installment.fees_on_settlement != installment.fees ?
                  <>
                    <del>{`${installment.fees}`}</del>
                    {` ${installment.fees_on_settlement}`}
                  </> :
                  `${installment.fees}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.penalty_on_settlement && installment.penalty_on_settlement != installment.penalty ?
                  <>
                    <del>{`${installment.penalty}`}</del>
                    {` ${installment.penalty_on_settlement}`}
                  </> :
                  `${installment.penalty}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.installment}</td>
              </>}
              {paid &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.interest_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.fees_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.penalty_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.total_paid}</td>
              </>}
              {dues &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.interest_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.fees_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.penalty_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.balance}</td>
              </>}
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Pending</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ScheduleTab;