import React from 'react';
import Loan from './Loan';

const LoansList = () => {

    var loans = [
        {full_name:'Tafadzwa Kuno',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'1'},
        {full_name:'Tatenda Gudyanga',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Open', id:'2'},
        {full_name:'Victor Kuno',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Over Paid', id:'3'},
        {full_name:'Tavonga Gudyanga',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Defaulted', id:'4'},
        {full_name:'Lawful Gudyanga',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Written Off', id:'5'},
        {full_name:'James Chisada',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Processing', id:'6'},
        {full_name:'Tawanda mangwarira',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Arrears', id:'7'},
        {full_name:'Nyasha Hope',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'8'},
        {full_name:'Joseph Mazambara',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'9'},
        {full_name:'Divine Chikukutu',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Rejected', id:'10'},
        // {full_name:'Tadiwa Majoko',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'11'},
        // {full_name:'Nomsa Chipise',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'12'},
        // {full_name:'Tatenda Kuno',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'13'},
        // {full_name:'Grace Mabunu',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'14'},
        // {full_name:'Steve Harvey',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'15'},
        // {full_name:'Michael Ballack',  loan_number:'THEO87898H', principal:'15000', interest_rate:'55', repayment_cycle:'Monthly', loan_duration:'1 Month', date_added:'07/12/21', amount_due:'250000', amount_paid:'250000', balance:'0', status:'Fully Paid', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Client</th>
                        <th style={{textAlign:"start"}}>Loan_Number</th>
                        <th style={{textAlign:"start"}}>Principal</th>
                        <th style={{textAlign:"start"}}>Interest_Rate</th>
                        <th style={{textAlign:"start"}}>Repayment_Cycle</th>
                        <th style={{textAlign:"start"}}>Loan_Duration</th>
                        <th style={{textAlign:"start"}}>Date_Created</th>
                        <th style={{textAlign:"start"}}>Principal_Amount_Due</th>
                        <th style={{textAlign:"start"}}>Amount_Due_At_Maturity</th>
                        <th style={{textAlign:"start"}}>Amount_Paid</th>
                        <th style={{textAlign:"start"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <Loan 
                            key={loan.id} 
                            full_name={loan.full_name}
                            loan_number={loan.loan_number}
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

export default LoansList;