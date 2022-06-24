import React from 'react';
import LoansReportHeader from './LoansReportHeader';
import LoansReportTable from './LoansReportTable';
import LoansReportFooter from './LoansReportFooter';
import Filter from './Filter';

const LoansReport = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Loans Report</h5>

                <Filter />
                <LoansReportHeader />
                <LoansReportTable />
                <LoansReportFooter />
            </div>
        </div>
    );
}

export default LoansReport;