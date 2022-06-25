import React from 'react';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import Filter from './Filter';

const ClientsReport = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Clients Report</h5>
                <Filter />
                <Header />
                <Table />
                <Footer />
            </div>
        </div>
    );
}

export default ClientsReport;