import React from 'react';
import MonthlyHeader from './MonthlyHeader';
import MonthlyTable from './MonthlyTable';
import MonthlyFooter from './MonthlyFooter';
import Filter from './Filter';

const MonthlyReport = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Monthly Report</h5>

                <Filter />
                <MonthlyHeader />
                <MonthlyTable />
                <MonthlyFooter />
            </div>
        </div>
    );
}

export default MonthlyReport;