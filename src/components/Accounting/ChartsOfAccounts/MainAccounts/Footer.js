import React from 'react';

const Footer = ({mainaccounts, totalCount, nextPageNumber, loadMoreAccounts, loadingMore}) => {
    return (
        <>
            {nextPageNumber === null ?
                <div className="all-data-loaded text-light" style={{padding:"1rem 0"}}>
                    <i className="uil uil-exclamation-triangle"></i> 
                    <span>All main accounts have been loaded</span>
                </div> :
                <div className="load-more-container card-body view_expenses text-light" style={{padding:"1.5rem 0 0"}}>
                    <p className="load-more-container-left">
                        Showing {mainaccounts.length} of {totalCount} main accounts.
                    </p>
                    {loadingMore ? 
                        <button className="btn btn-info" style={{opacity:"0.7", cursor:"none"}}>Please wait...</button>:
                        <button className="btn btn-info" onClick={loadMoreAccounts}>Load More</button>
                    }
                </div>
            }
        </>
    );
}

export default Footer;