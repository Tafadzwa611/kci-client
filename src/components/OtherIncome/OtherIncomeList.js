import React from 'react';
import OtherIncome from './OtherIncome';

const OtherIncomeList = (props) => {
    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", padding:"1.5rem", width:"100%"}}>
                <div style={{textAlign:"center", width:"16.66%"}}>Other_Income_Type</div>
                <div style={{textAlign:"center", width:"16.66%"}}>Other_Income_Name</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Other_Income_Date</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Date_Created</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Other_Income_Amount</div>
                <div style={{textAlign:"center", width:"16.67%"}}>Action</div>
            </div>
            <div>
                {props.otherincomes.map((other) => (
                    <OtherIncome other={other} key={other.id} setOtherIncomes={props.setOtherIncomes}/>
                ))}
            </div>
        </div>
    );
}

export default OtherIncomeList;