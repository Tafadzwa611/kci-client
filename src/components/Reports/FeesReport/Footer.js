import React from 'react';

const Footer = ({ nextPageNumber, loadMoreLoans, loadingMore }) => {
    return (
        <div className="footer-container font-12">
            {nextPageNumber.current === null ?
            <div className="text" style={{border:"none"}}>
                <i className="uil uil-exclamation-triangle"></i> 
                <span>All laons have been loaded.</span>
            </div>:
            <LoadMoreButton loadMoreLoans={loadMoreLoans} loadingMore={loadingMore} />
            }
        </div>
    );
}

const LoadMoreButton = ({loadMoreLoans, loadingMore}) => {
    const styles = loadingMore ? {pointerEvents: 'none', opacity: '0.7'} : {};
    return (
      <div className='load-btn' style={{border:"none"}}>
          <button className="btn btn-olive" style={styles} name='moreClients' onClick={loadMoreLoans}>
            {loadingMore ? 'Please wait..' : 'View More Fees'}
          </button>
      </div>
    )
  }

export default Footer;

