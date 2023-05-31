import React, {useState} from 'react';
import { CheckBox } from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
  SuccessBtn
} from '../../../common';
import EarlySettlement from './EarlySettlement';

const MODAL_STATES = {
  es: 'es',
  none: false
};

function ScheduleTab({installments, client_name, loanId, currencyId, setLoan, setLoanData}) {
  const {es, none } = MODAL_STATES;
  const [modal, setModal] = useState(none);
  const [expected, setExpected] = useState(true);
  const [paid, setPaid] = useState(true);
  const [dues, setDues] = useState(true);

  return (
    <>
      <SuccessBtn handler={() => setModal(es)} value={'Early Settlement'}/>
      {modal === es && <EarlySettlement setLoanData={setLoanData} setOpen={setModal} setLoan={setLoan} loanId={loanId} currencyId={currencyId} />}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem"}}>
        <div className="schedule__check__section" style={{display: "flex", columnGap: "1rem", alignItems:"center"}}>
          <CheckBox isChecked={expected} label='Amount Expected' onChange={() => setExpected(curr => !curr)} />
          <CheckBox isChecked={paid} label='Amount Paid' onChange={() => setPaid(curr => !curr)} />
          <CheckBox isChecked={dues} label='Amount Due' onChange={() => setDues(curr => !curr)} />
        </div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='schedule'
            filename={`${client_name}'s schedule`}
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
      <div style={{overflow:"auto", maxHeight:"600px"}} className="miniLoanDetails-container">
        <table className="table" id="schedule">
          <thead>
            <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
              <th className="schedule__table"><b>#</b></th>
              <th className="schedule__table schedule__installment__right">Due Date</th>
              {expected &&
              <>
                <th className="schedule__table">Principal Expected</th>
                <th className="schedule__table">Interest Expected</th>
                <th className="schedule__table">Fees Expected</th>
                <th className="schedule__table">Penalty Expected</th>
                <th className="schedule__table schedule__installment__right">Total Expected</th>
              </>}
              {paid &&
              <>
                <th className="schedule__table">Principal Paid</th>
                <th className="schedule__table">Interest Paid</th>
                <th className="schedule__table">Fees Paid</th>
                <th className="schedule__table">Penalty Paid</th>
                <th className="schedule__table schedule__installment__right">Total Paid</th>
              </>}
              {dues &&
              <>
                <th className="schedule__table">Principal Due</th>
                <th className="schedule__table">Interest Due</th>
                <th className="schedule__table">Fees Due</th>
                <th className="schedule__table">Penalty Due</th>
                <th className="schedule__table schedule__installment__right">Total Due</th>
              </>}
              <th className="schedule__table">State</th>
            </tr>
          </thead>
          <tbody>
            {installments.map(installment => (
              <tr key={installment.period}>
                <td className='schedule__table schedule__installment'>{installment.period}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.installment_date}</td>
                {expected &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal}</td>
                  <td className='schedule__table schedule__installment'>
                    {installment.interest_on_settlement && installment.interest_on_settlement != installment.interest ?
                    <>
                      <del>{`${installment.interest}`}</del>
                      {` ${installment.interest_on_settlement}`}
                    </> :
                    `${installment.interest}`}
                  </td>
                  <td className='schedule__table schedule__installment'>
                    {installment.fees_on_settlement && installment.fees_on_settlement != installment.fees ?
                    <>
                      <del>{`${installment.fees}`}</del>
                      {` ${installment.fees_on_settlement}`}
                    </> :
                    `${installment.fees}`}
                  </td>
                  <td className='schedule__table schedule__installment'>
                    {installment.penalty_on_settlement && installment.penalty_on_settlement != installment.penalty ?
                    <>
                      <del>{`${installment.penalty}`}</del>
                      {` ${installment.penalty_on_settlement}`}
                    </> :
                    `${installment.penalty}`}
                  </td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.installment}</td>
                </>}
                {paid &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.interest_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.fees_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.penalty_paid}</td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.total_paid}</td>
                </>}
                {dues &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.interest_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.fees_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.penalty_due}</td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.balance}</td>
                </>}
                <td className='schedule__table schedule__installment'>{installment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ScheduleTab;