import React from 'react';
import RefundsList from './RefundsList';
import Filter from './Filter';


const ViewRefunds = () => {

    return (
        <div className="font-12 slide">
            <div className="card">
                <Filter/>
            </div>
            <div className="card">
                <RefundsList />
                <div className="load-more-container card-body refunds">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewRefunds;