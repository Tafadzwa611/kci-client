import React from 'react';
import ClientLoanList from './ClientLoanList';

const ViewClientLoans = () => {

    return (
        <div style={{marginTop:"1rem"}}>
            <ClientLoanList />
            <div className="load-more-container card-body clientloans">
                <p className="load-more-container-left">
                    Showing 10 of 1200
                </p>
                <button className="btn btn-info">More</button>
            </div>

        </div>
    );
}

export default ViewClientLoans;