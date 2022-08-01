import React from 'react';

const Footer = ({
    nextPageNumber,
    loadMoreJournals,
    loadingMore
  }) => {
    return (
        <div className="footer-container font-12">
            {nextPageNumber === null ?
            <div className="text" style={{border:"none"}}>
                <i class="uil uil-exclamation-triangle"></i> 
                <span>All journals have been loaded</span>
            </div>:
            <LoadMoreButton loadMoreJournals={loadMoreJournals} loadingMore={loadingMore}/>
            }
        </div>
    );
}

const LoadMoreButton = ({
    loadMoreJournals,
    loadingMore
  }) => {
    const styles = loadingMore ? {pointerEvents: 'none', opacity: '0.7'} : {};
    return (
      <div className='load-btn'>
          <button className="btn btn-olive" style={styles} name='moreAccounts' onClick={loadMoreJournals}>
            {loadingMore ? 'Please wait..' : 'View More Journals'}
          </button>
      </div>
    )
  }

export default Footer;