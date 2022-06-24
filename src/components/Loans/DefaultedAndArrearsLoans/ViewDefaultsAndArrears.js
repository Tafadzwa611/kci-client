import React from 'react';
import DefaultsAndArrearsList from './DefaultsAndArrearsList';
import Filter from './Filter';


const ViewDefaultsAndArrears = () => {

    return (
        <div className="font-12 slide">
            <div className="card">
                <Filter/>
            </div>
            <div className="card">
                <DefaultsAndArrearsList />
                <div className="load-more-container card-body defaults_arrears_loans">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>
        </div>
    );
}

export default ViewDefaultsAndArrears;