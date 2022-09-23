import React from 'react';

const PaymentList = ({payments}) => {

    return (
        <div style={{paddingTop:"1.5rem"}}>
            <div className='table-responsive font-12'>
                <table className='table'>
                    <thead>
                        <tr className="journal-details header">
                            <th style={{textAlign:"start"}}>Loan #</th>
                            <th style={{textAlign:"start"}}>Collection_Date</th>
                            <th style={{textAlign:"start"}}>Collected_By</th>
                            <th style={{textAlign:"start"}}>Payment_Type</th>
                            <th style={{textAlign:"start"}}>Method</th>
                            <th style={{textAlign:"start"}}>Client</th>
                            <th style={{textAlign:"start"}}>Amount_Paid</th>
                            {/* <th style={{textAlign:"start"}}>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td style={{verticalAlign:"middle"}}>{payment.loan}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.date_created}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.collected_by}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.payment_type}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.payment_method}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.client}</td>
                                <td style={{verticalAlign:"middle"}}>{payment.amount_paid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentList;