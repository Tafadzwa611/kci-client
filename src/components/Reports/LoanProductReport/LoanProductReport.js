import React from 'react';
import DateRange from './DateRange';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const LoanProductReport = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Loan Product Report</h5>

                <DateRange />
                <Header />
                <Table />
                <Footer />
            </div>
        </div>
    );
}

export default LoanProductReport;