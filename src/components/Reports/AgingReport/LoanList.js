import React from 'react';
import Loan from './Loan';

const LoanList = () => {

    var loans = [
        {client:'Tafadzwa Kuno',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Arrears', id:'1'},
        {client:'Tatenda Gudyanga',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Arrears', id:'2'},
        {client:'Victor Kuno',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Arrears', id:'3'},
        {client:'Tavonga Gudyanga',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Arrears', id:'4'},
        {client:'Lawful Gudyanga',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'5'},
        {client:'James Chisada',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'6'},
        {client:'Tawanda mangwarira',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'7'},
        {client:'Nyasha Hope',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'8'},
        {client:'Joseph Mazambara',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'9'},
        {client:'Divine Chikukutu',  loan_number:'THEO87898H', days_in_arrears:'10', total_principal_due:'55', total_interest_due:'100', total_fees_due:'200', released:'07/12/21', total_penalty_due:'250000', overdue_balance:'250000', status:'Defaulted', id:'10'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Loan_Number</th>
                        <th style={{textAlign:"start"}}>Released</th>
                        <th style={{textAlign:"start"}}>Client</th>
                        <th style={{textAlign:"start"}}>Days_in_Arrears</th>
                        <th style={{textAlign:"start"}}>Total_Principal_Due</th>
                        <th style={{textAlign:"start"}}>Total_Interest_Due</th>
                        <th style={{textAlign:"start"}}>Total_Fees_Due</th>
                        <th style={{textAlign:"start"}}>Total_Penalty_Due</th>
                        <th style={{textAlign:"start"}}>Overdue_Balance</th>
                        <th style={{textAlign:"start"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <Loan 
                            key={loan.id} 
                            loan_number={loan.loan_number}
                            client={loan.client}
                            days_in_arrears={loan.days_in_arrears} 
                            total_principal_due={loan.total_principal_due}
                            total_interest_due={loan.total_interest_due}
                            total_fees_due={loan.total_fees_due} 
                            released={loan.released}
                            total_penalty_due={loan.total_penalty_due}
                            overdue_balance={loan.overdue_balance} 
                            status={loan.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LoanList;