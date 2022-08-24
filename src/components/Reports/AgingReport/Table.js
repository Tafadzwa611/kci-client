import React from 'react';
import LoanList from './LoanList';


const Table = () => {

    return (
        <div style={{marginTop:"40px", border:"none", padding:"0"}} className="aging_report">
            <LoanList />
            <div className="load-more-container card-body" style={{borderTop:"1px solid #eef2f7"}}>
                <p className="load-more-container-left">
                    Showing 10 of 1200
                </p>
                <button className="btn btn-info">Load More</button>
            </div>

        </div>
    );
}

export default Table;
