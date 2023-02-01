import React from 'react';

const Footer = ({ nextPageNumber, loadMore, loadingMore }) => {
    return (
        <div className="footer-container font-12 text-light">
            {nextPageNumber === null ?
            <div className="text" style={{border:"none"}}>
                <i className="uil uil-exclamation-triangle"></i> 
                <span>All payments have been loaded.</span>
            </div>:
            <LoadMoreButton loadMore={loadMore} loadingMore={loadingMore}/>
            }
        </div>
    );
}

const LoadMoreButton = ({loadMore, loadingMore}) => {
    const styles = loadingMore ? {pointerEvents: 'none', opacity: '0.7'} : {};
    return (
      <div className='load-btn' style={{border:"none"}}>
          <button className="btn btn-olive" style={styles} name='moreAccounts' onClick={loadMore}>
            {loadingMore ? 'Please wait..' : 'View More Payments'}
          </button>
      </div>
    )
  }

export default Footer;