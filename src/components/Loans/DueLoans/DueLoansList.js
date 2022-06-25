import React from 'react';
import DueLoan from './DueLoan';

const DueLoansList = () => {

    var dueloans = [
        {full_name:'Tafadzwa Kuno',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Over Paid', id:'1'},
        {full_name:'Tatenda Gudyanga',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'2'},
        {full_name:'Victor Kuno',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'3'},
        {full_name:'Tavonga Gudyanga',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Arrears', id:'4'},
        {full_name:'Lawful Gudyanga',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Arrears', id:'5'},
        {full_name:'James Chisada',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'6'},
        {full_name:'Tawanda mangwarira',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'7'},
        {full_name:'Nyasha Hope',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'8'},
        {full_name:'Joseph Mazambara',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Fully Paid', id:'9'},
        {full_name:'Divine Chikukutu',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'10'},
        // {full_name:'Tadiwa Majoko',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'11'},
        // {full_name:'Nomsa Chipise',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'12'},
        // {full_name:'Tatenda Kuno',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'13'},
        // {full_name:'Grace Mabunu',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'14'},
        // {full_name:'Steve Harvey',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'15'},
        // {full_name:'Michael Ballack',  loan_number:'THEO87898H', payment_date:'03/25/22', installment_due:'4000', amount_paid:'0', status:'Open', id:'16'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Client</th>
                        <th style={{textAlign:"start"}}>Loan_Number</th>
                        <th style={{textAlign:"start"}}>Payment_Date</th>
                        <th style={{textAlign:"start"}}>Installment_Due</th>
                        <th style={{textAlign:"start"}}>Pending_Due</th>
                        <th style={{textAlign:"start"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dueloans.map(loan => (
                        <DueLoan 
                            key={loan.id} 
                            full_name={loan.full_name}
                            loan_number={loan.loan_number}
                            payment_date={loan.payment_date} 
                            installment_due={loan.installment_due}
                            amount_paid={loan.amount_paid}
                            status={loan.status} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DueLoansList;