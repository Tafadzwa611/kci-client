import React from 'react';
import PaymentList from './PaymentList';
import Filter from './Filter';


const ViewPayments = () => {

    return (
        <div className="font-12 slide">

            <div className="card">
                <Filter />
            </div>
            <div className="card">
                <PaymentList />
                <div className="load-more-container card-body view_payments">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewPayments;