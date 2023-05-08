import React, { useState, useRef } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DeletePayment from './DeletePayment';
import EditPayment from './EditPayment';
import Refund from './Refund';
import { Link } from 'react-router-dom';

const MODAL_STATES = {
  reverse: 'reverse',
  edit: 'edit',
  refund: 'refund',
  none: false,
};

function Payments({
  payments,
  clientName,
  setLoan,
  currencyName,
  accountId
}) {
  const {reverse, edit, refund, none } = MODAL_STATES;
  const [modal, setModal] = useState(none);
  const paymentRef = useRef(null);
  const [payId, setPayId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const showModal = (evt) => {
    const payment = payments.find(payment => payment.id == evt.target.id);
    paymentRef.current = payment;
    setModal(evt.target.getAttribute('data-name'));
  }

  const handleClick = (e) => {
    setPayId(e.target.id);
    setSelectedPayment(payments.find(payment => payment.id == e.target.id));
  }

  return (
    <>
      {modal == reverse && <DeletePayment paymentId={payId} setOpen={setModal} setLoan={setLoan} setPayId={setPayId}/>}
      {modal == edit && <EditPayment selectedPayment={paymentRef.current} setOpen={setModal} setLoan={setLoan} setSelectedPayment={setSelectedPayment}/>}
      {modal == refund && <Refund selectedPayment={paymentRef.current} setOpen={setModal} setLoan={setLoan} payId={payId} setSelectedPayment={setSelectedPayment}/>}
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='payments'
          filename={`${currencyName}'s payments`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{padding:'1.5rem'}} className='miniLoanDetails-container'>
        <div className={payId ? 'table-responsive journal__table-container-journals-payments' : 'table-responsive full__table'}>
          <div style={{width:'100%', overflowX:'auto'}}>
            <div style={{maxHeight:'600px'}}>
              <table className='table' id='payments'>
                <thead>
                  {payId ?
                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                      <th className='schedule__table'>Date_Recorded</th>
                      <th className='schedule__table'>Collection_Date</th>
                    </tr>:
                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                      <th className='schedule__table'>Date_Recorded</th>
                      <th className='schedule__table'>Collection_Date</th>
                      <th className='schedule__table'>Collected_by</th>
                      <th className='schedule__table'>Principal Paid</th>
                      <th className='schedule__table'>Interest Paid</th>
                      <th className='schedule__table'>Penalty Paid</th>
                      <th className='schedule__table'>Fees Paid</th>
                      <th className='schedule__table'>To_Be Refunded</th>
                      <th className='schedule__table'>Total Amount_Paid</th>
                    </tr>
                  }
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.id}>
                      {payId ?
                        <>
                          <td className='schedule__table'>
                            {(selectedPayment.id==payment.id) ?
                              <span onClick={handleClick} id={payment.id} style={{fontSize:'0.75rem', cursor:'pointer', color:'red'}} className='link'>
                                {payment.date_recorded}
                              </span>:
                              <span onClick={handleClick} id={payment.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                                {payment.date_recorded}
                              </span>
                            }
                          </td>
                          <td className='schedule__table'>{payment.cdate_created}</td>
                        </>:
                        <>
                          <td className='schedule__table'>
                            <span onClick={handleClick} id={payment.id} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>
                              {payment.date_recorded}
                            </span>
                          </td>
                          <td className='schedule__table'>{payment.cdate_created}</td>
                          <td className='schedule__table'>{payment.user_name}</td>
                          <td className='schedule__table'>{payment.principal_amount_paid}</td>
                          <td className='schedule__table'>{payment.interest_amount_paid}</td>
                          <td className='schedule__table'>{payment.penalty}</td>
                          <td className='schedule__table'>{payment.fees}</td>
                          <td className='schedule__table'>{payment.money_to_be_refunded}</td>
                          <td className='schedule__table'>{payment.amount_paid}</td>
                        </>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {payId &&
            <div style={{position:'sticky', top:'0', width:'100%'}}>
              <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
                <div style={{marginBottom:'1.5rem', display:'flex', justifyContent:'space-between'}}>
                  <button><a onClick={() => setPayId(null)} className='btn btn-default' style={{borderRadius:'0'}}>Close</a></button>
                  <div style={{display:'flex', columnGap:'3px'}}>
                    <button className='btn btn-olive' id={selectedPayment.id} data-name={reverse} onClick={showModal}>Reverse</button>
                    <button className='btn btn-olive' id={selectedPayment.id} data-name={edit} onClick={showModal}>Edit</button>
                    <button className='btn btn-olive'>
                      <Link
                        to={{pathname: `/create_file?type=payment&receiptNumber=${selectedPayment.receipt_number}&collectedBy=${selectedPayment.user_name}&paymentDate=${selectedPayment.cdate_created}&dateRecorded=${selectedPayment.date_recorded}&amountPaid=${selectedPayment.amount_paid}&currencyName=${currencyName}&clientName=${clientName}&accountId=${accountId}`}}
                        target='_blank'
                      >
                        Print
                      </Link>
                    </button>
                    <button className='btn btn-olive' id={selectedPayment.id} data-name={refund} onClick={showModal}>Refund</button>
                  </div>
                </div>
                <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                  <div>
                    <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                      <li>Date Recorded: {selectedPayment.date_recorded}</li>
                      <li>Collection Date: {selectedPayment.cdate_created}</li>
                      <li>Collected by: {selectedPayment.user_name}</li>
                      <li>Branch Collected: {selectedPayment.branch_name}</li>
                      <li>Account: {selectedPayment.fund_account_name}</li>
                    </ul>
                  </div>
                  <div>
                    <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                      <li>Principal Paid: {selectedPayment.principal_amount_paid}</li>
                      <li>Interest Paid: {selectedPayment.interest_amount_paid}</li>
                      <li>Penalty Paid: {selectedPayment.penalty}</li>
                      <li>Fees Paid: {selectedPayment.fees}</li>
                      <li>Total Amount Paid: {selectedPayment.amount_paid}</li>
                    </ul>
                  </div>
                  <div>
                    <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                      <li>To Be Refunded: {selectedPayment.money_to_be_refunded}</li>
                      <li>Receipt Number: {selectedPayment.receipt_number}</li>
                      <li>Notes: {selectedPayment.notes}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Payments;