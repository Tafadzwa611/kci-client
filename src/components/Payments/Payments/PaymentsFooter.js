import React from 'react';

const PaymentsFooter = ({payments, totalCount, nextPageNumber, loadMoreClients, loadingMore}) => {
    return (
        <>
            {nextPageNumber === null ?
                <div className="all-data-loaded text-light" style={{padding:"1rem 0"}}>
                    <i className="uil uil-exclamation-triangle"></i> 
                    <span>All payments have been loaded</span>
                </div> :
                <div className="load-more-container card-body view_expenses text-light">
                    <p className="load-more-container-left">
                        Showing {payments.length} of {totalCount} payments.
                    </p>
                    {loadingMore ? 
                        <button className="btn btn-info" style={{opacity:"0.7", cursor:"none"}}>Please wait...</button>:
                        <button className="btn btn-info" onClick={loadMoreClients}>Load More</button>
                    }
                </div>
            }
        </>
    );
}

export default PaymentsFooter;