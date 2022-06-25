import React from 'react';
import Refund from './Refund';

const RefundsList = () => {

    var refunds = [
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'1'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'2'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'3'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'4'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'5'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'6'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'7'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'8'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'9'},
        {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'10'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'11'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'12'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'13'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'14'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'15'},
        // {loan_number:'THEO87898H', refund_date:'07/12/21',  refund_amount:'15000', refunded_by:'Tamuka Mutinhima', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start", paddingLeft:"20px"}}>Loan ID</th>
                        <th style={{textAlign:"start"}}>Refund Amount</th>
                        <th style={{textAlign:"start"}}>Refund Date</th>
                        <th style={{textAlign:"start"}}>Refunded By</th>
                    </tr>
                </thead>
                <tbody>
                    {refunds.map(loan => (
                        <Refund 
                            key={loan.id} 
                            loan_number={loan.loan_number}
                            refund_date={loan.refund_date}
                            refund_amount={loan.refund_amount} 
                            refunded_by={loan.refunded_by}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RefundsList;