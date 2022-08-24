import React from 'react';
import DateRange from './DateRange';
import Table from './Table';
const AgingReport = () => {
    return (
        <>
            <div className="callout callout-info" style={{marginTop:"20px"}}>
                The Aging Report shows the days in arrears of the overdue amount until today. Overdue 
                loans are classified into four categories and their total due amounts is given. 
            </div>
            <DateRange />
            <Table />
        </>
    );
}

export default AgingReport;