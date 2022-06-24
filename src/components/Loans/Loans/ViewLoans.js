import React from 'react';
import LoansList from './LoansList';
import Filter from './Filter';


const ViewLoans = () => {

    return (
        <div className="font-12 slide">
            <div className="card">
                <Filter/>
            </div>
            <div className="card">
                <LoansList />
                <div className="load-more-container card-body loans_table">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewLoans;