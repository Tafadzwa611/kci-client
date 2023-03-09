import React from 'react';

const Footer = ({
    nextPageNumber,
    loadMoreGroups,
    loadingMore
  }) => {
    return (
        <div className="footer-container font-12 text-light">
            {nextPageNumber === null ?
            <div className="text" style={{border:"none"}}>
                <i className="uil uil-exclamation-triangle"></i> 
                <span>All groups have been loaded</span>
            </div>:
            <LoadMoreButton loadMoreGroups={loadMoreGroups} loadingMore={loadingMore} />
            }
        </div>
    );
}

const LoadMoreButton = ({
    loadMoreGroups,
    loadingMore
  }) => {
    const styles = loadingMore ? {pointerEvents: 'none', opacity: '0.7'} : {};
    return (
      <div className='load-btn' style={{border:"none"}}>
          <button className="btn btn-olive" style={styles} name='moreGroups' onClick={loadMoreGroups}>
            {loadingMore ? 'Please wait..' : 'View More Groups'}
          </button>
      </div>
    )
  }

export default Footer;