import React from 'react';
import Payment from './Payment';

const PaymentList = () => {

    var payments = [
        {loan_number:'10000000000001', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'1'},
        {loan_number:'10000000000002', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'2'},
        {loan_number:'10000000000003', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'3'},
        {loan_number:'10000000000004', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'4'},
        {loan_number:'10000000000005', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'5'},
        {loan_number:'10000000000006', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'6'},
        {loan_number:'10000000000007', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'7'},
        {loan_number:'10000000000008', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'8'},
        {loan_number:'10000000000009', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'9'},
        {loan_number:'10000000000010', collection_date:'07/12/21', collected_by:'tafadzwa kuno', payment_type:'installment', method:'stop order', client:'tavonga gudyanga', amount_paid:'100', id:'10'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Loan #</th>
                        <th style={{textAlign:"start"}}>Collection_Date</th>
                        <th style={{textAlign:"start"}}>Collected_By</th>
                        <th style={{textAlign:"start"}}>Payment_Type</th>
                        <th style={{textAlign:"start"}}>Method</th>
                        <th style={{textAlign:"start"}}>Client</th>
                        <th style={{textAlign:"start"}}>Amount_Paid</th>
                        <th style={{textAlign:"start"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <Payment 
                            key={payment.id} 
                            loan_number={payment.loan_number}
                            collection_date={payment.collection_date} 
                            collected_by={payment.collected_by} 
                            payment_type={payment.payment_type}
                            method={payment.method}
                            client={payment.client}
                            amount_paid={payment.amount_paid}

                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;