import React from 'react';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import Filter from './Filter';

const TopBorrowers = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Top Borrowers Report</h5>

                <Filter />
                <Header />
                <Table />
                <Footer />
            </div>
        </div>
    );
}

export default TopBorrowers;