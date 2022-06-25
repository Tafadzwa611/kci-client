import React from 'react';
import DefaultsAndArrearsLoan from './DefaultsAndArrearsLoan';

const DefaultsAndArrearsList = () => {

    var defaultedloans = [
        {full_name:'Tafadzwa Kuno',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'1'},
        {full_name:'Tatenda Gudyanga',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'2'},
        {full_name:'Victor Kuno',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'3'},
        {full_name:'Tavonga Gudyanga',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'4'},
        {full_name:'Lawful Gudyanga',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'5'},
        {full_name:'James Chisada',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'6'},
        {full_name:'Tawanda mangwarira',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'7'},
        {full_name:'Nyasha Hope',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'8'},
        {full_name:'Joseph Mazambara',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'9'},
        {full_name:'Divine Chikukutu',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'10'},
        // {full_name:'Tadiwa Majoko',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'11'},
        // {full_name:'Nomsa Chipise',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'12'},
        // {full_name:'Tatenda Kuno',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'13'},
        // {full_name:'Grace Mabunu',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'14'},
        // {full_name:'Steve Harvey',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'15'},
        // {full_name:'Michael Ballack',  loan_number:'THEO87898H', branch:'Main Branch', days_past_due:'15', last_payment_date:'07/12/21',disbursement_date:'07/12/21', installment_due:'250000', principal_due:'250000', pending_due:'0', status:'Defaulted', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Client</th>
                        <th style={{textAlign:"start"}}>Loan_Number</th>
                        <th style={{textAlign:"start"}}>Branch</th>
                        <th style={{textAlign:"start"}}>Disbursement_Date</th>
                        <th style={{textAlign:"start"}}>Last_Payment_Date</th>
                        <th style={{textAlign:"start"}}>Days_Past_Due</th>
                        <th style={{textAlign:"start"}}>Installment_Due</th>
                        <th style={{textAlign:"start"}}>Principal_Due</th>
                        <th style={{textAlign:"start"}}>Pending_Due</th>
                        <th style={{textAlign:"start"}}>Status</th>
                        <th style={{textAlign:"start"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {defaultedloans.map(loan => (
                        <DefaultsAndArrearsLoan   
                            key={loan.id} 
                            full_name={loan.full_name}
                            loan_number={loan.loan_number}
                            branch={loan.branch} 
                            disbursement_date={loan.disbursement_date} 
                            last_payment_date={loan.last_payment_date}
                            days_past_due={loan.days_past_due}
                            installment_due={loan.installment_due} 
                            principal_due={loan.principal_due} 
                            pending_due={loan.pending_due}
                            status={loan.status}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DefaultsAndArrearsList;