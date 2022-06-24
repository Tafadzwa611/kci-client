import React from 'react';
import DueLoansList from './DueLoansList';
import Filter from './Filter';


const ViewDueLoans = () => {

    return (
        <div className="font-12 slide">
            <div className="card">
                <Filter/>
            </div>
            <div className="card">
                <DueLoansList />
                <div className="load-more-container card-body due_loans">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewDueLoans;