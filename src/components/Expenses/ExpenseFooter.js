import React from 'react';

const ExpenseFooter = ({expenses, totalCount, nextPageNumber, loadMoreClients}) => {
    return (
        <>
            {nextPageNumber === null ?
                <div className="all-data-loaded" style={{padding:"1rem 0"}}>
                    <i class="uil uil-exclamation-triangle"></i> 
                    <span>All expenses have been loaded</span>
                </div> :
                <div className="load-more-container card-body view_expenses">
                    <p className="load-more-container-left">
                        Showing {expenses.length} of {totalCount} expenses.
                    </p>
                    <button className="btn btn-info" onClick={loadMoreClients}>Load More</button>
                </div>
            }
        </>
    );
}

export default ExpenseFooter;