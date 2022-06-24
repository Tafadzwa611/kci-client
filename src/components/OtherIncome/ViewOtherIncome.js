import React from 'react';
import OtherIncomeList from './OtherIncomeList';
import Filter from './Filter';


const ViewOtherIncome = () => {

    return (
        <div className="font-12">

            <div className="card">
                <Filter />
            </div>
            <div className="card">
                <OtherIncomeList />
                <div className="load-more-container card-body view_otherincome">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewOtherIncome;