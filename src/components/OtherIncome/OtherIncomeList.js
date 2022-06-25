import React from 'react';
import OtherIncome from './OtherIncome';

const OtherIncomeList = () => {

    var otherincomes = [
        {other_income_type:'Sundry',  other_income_name:'GTEL PHONE', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'1'},
        {other_income_type:'Sundry',  other_income_name:'nokia handsets', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'2'},
        {other_income_type:'Rentals From Properties',  other_income_name:'PRINTER', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'3'},
        {other_income_type:'Rentals From Properties',  other_income_name:'COMPUTER', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'4'},
        {other_income_type:'Sundry',  other_income_name:'COMPUTER', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'5'},
        {other_income_type:'Sundry',  other_income_name:'COMPUTER', date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'6'},
        {other_income_type:'Rentals From Properties',  other_income_name:'COMPUTER',  date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'7'},
        {other_income_type:'Rentals From Properties',  other_income_name:'COMPUTER',  date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'8'},
        {other_income_type:'Rentals From Properties',  other_income_name:'COMPUTER',  date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'9'},
        {other_income_type:'Rentals From Properties',  other_income_name:'COMPUTER',  date_added:'07/12/21', other_income_amount:'ZWL 1000', reference:'None', id:'10'}
    ];

    return (
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Income_Type</th>
                        <th style={{textAlign:"start"}}>Income_Name</th>
                        <th style={{textAlign:"start"}}>Date_Created</th>
                        <th style={{textAlign:"start"}}>Income_Amount</th>
                        <th style={{textAlign:"start"}}>Description</th>
                        <th style={{textAlign:"start"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {otherincomes.map(other_income => (
                        <OtherIncome 
                            key={other_income.id} 
                            other_income_type={other_income.other_income_type}
                            other_income_name={other_income.other_income_name}
                            date_added={other_income.date_added} 
                            other_income_amount={other_income.other_income_amount}
                            reference={other_income.reference}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OtherIncomeList;