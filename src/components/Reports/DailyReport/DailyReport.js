import React from 'react';
import Filter from './Filter'
import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const DailyReport = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Daily Report</h5>

                <Filter />
                <Header />
                <Table />
                <Footer />
            </div>
        </div>
    );
}

export default DailyReport;