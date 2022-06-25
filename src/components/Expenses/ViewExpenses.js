import React from 'react';
import ExpenseList from './ExpenseList';
import Filter from './Filter';


const ViewExpenses = () => {

    return (
        <div className="font-12">
            <div className="card">
                <Filter/>
            </div>
            <div className="card">
                <ExpenseList />
                <div className="load-more-container card-body view_expenses">
                    <p className="load-more-container-left">
                        Showing 10 of 1200
                    </p>
                    <button className="btn btn-info">Load More</button>
                </div>
            </div>

        </div>
    );
}

export default ViewExpenses;