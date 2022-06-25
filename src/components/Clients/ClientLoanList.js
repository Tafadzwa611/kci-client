import React from 'react';
import ClientLoans from './ClientLoans';

const ClientLoanList = () => {

    var clientloans = [
        {loan_number:'1000000000001',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'1'},
        {loan_number:'1000000000002',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'2'},
        {loan_number:'1000000000003',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'3'},
        {loan_number:'1000000000004',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Open', id:'4'},
        {loan_number:'1000000000005',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'5'},
        {loan_number:'1000000000006',  released:'12/12/21', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Defaulted', id:'6'},
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Loan_Number</th>
                        <th style={{textAlign:"start"}}>Released</th>
                        <th style={{textAlign:"start"}}>First_Repayment_Date</th>
                        <th style={{textAlign:"start"}}>Maturity</th>
                        <th style={{textAlign:"start"}}>Repayment</th>
                        <th style={{textAlign:"start"}}>Principal</th>
                        <th style={{textAlign:"start"}}>Interest_Rate</th>
                        <th style={{textAlign:"start"}}>Amount_Due</th>
                        <th style={{textAlign:"start"}}>Amount_Paid</th>
                        <th style={{textAlign:"start"}}>Balance</th>
                        <th style={{textAlign:"start"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clientloans.map(loan => (
                        <ClientLoans 
                            key={loan.id} 
                            loan_number={loan.loan_number}
                            released={loan.released}
                            principal={loan.principal} 
                            interest_rate={loan.interest_rate}
                            repayment_cycle={loan.repayment_cycle}
                            loan_duration={loan.loan_duration} 
                            date_added={loan.date_added}
                            amount_due={loan.amount_due}
                            amount_paid={loan.amount_paid} 
                            balance={loan.balance}
                            status={loan.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientLoanList;