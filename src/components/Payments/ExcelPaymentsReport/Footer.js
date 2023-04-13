import React from 'react';

function Footer({
  nextPageNumber,
  loadMore,
  loadingMore
}) {
  return (
    <div className='card-footer clearfix text-center'>
      {nextPageNumber === null ?
        <p className='float-central-loaded'>
          <i className='fas fa-exclamation-triangle text-warning'></i> 
          <span>All payments have been loaded.</span>
        </p> :
        <LoadMoreButton loadMore={loadMore} loadingMore={loadingMore}/>
      }
    </div>
  )
}

const LoadMoreButton = ({
  loadMore,
  loadingMore
}) => {
  const styles = loadingMore ? {pointerEvents: 'none', opacity: '0.7'} : {};
  return (
    <div className='card-tools'>
      <a style={styles} href='#' className='btn btn-default' name='moreAccounts' onClick={loadMore}>
        {loadingMore ? <div><i className='fa fa-spinner fa-spin'></i> Please wait..</div> : 'View More Payments'}
      </a>
    </div>
  )
}

export default Footer;
