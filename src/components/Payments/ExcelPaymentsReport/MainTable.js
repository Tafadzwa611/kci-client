import React, {useState} from 'react';

function MainTable({payments}) {

    return (
        <>
            <div style={{display:'block'}}>
                <div style={{padding:'0', border:'none'}}>
                    <div style={{width:'100%', overflowX:'auto'}}>
                        <div className='table__height'>
                            <table className='table' id='payments'>
                                <thead>
                                    <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                                        <th style={{textAlign:"start"}}>Status</th>
                                        <th style={{textAlign:"start"}}>Reference</th>
                                        <th style={{textAlign:"start"}}>Amount_Paid</th>
                                        <th style={{textAlign:"start"}}>Loan_#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {payments.payments ?
                                            <>
                                                {payments.payments.map(payment => {
                                                    return (
                                                    <tr key={payment.id}>
                                                        <td style={{verticalAlign:"middle"}}>{payment.status} {payment.fail_reason}</td>
                                                        <td style={{verticalAlign:"middle"}}>{payment.reference}</td>
                                                        <td style={{verticalAlign:"middle"}}>{payment.amount_paid}</td>
                                                        <td style={{verticalAlign:"middle"}}>{payment.payment_loanid}</td>
                                                    </tr>
                                                    )
                                                })}
                                            </>
                                        : 
                                            <>
                                                <tr>
                                                    <td style={{textAlign:'center'}}>No Data</td>
                                                </tr>
                                            </>
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainTable;