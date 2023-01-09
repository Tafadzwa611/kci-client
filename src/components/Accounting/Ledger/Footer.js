import React from 'react';

function Footer({
  nextPageNumber,
  loadMore,
  loadingMore
}) {
  return (
    <div className='card-footer clearfix text-center'>
      {nextPageNumber === null ?
        <h6 className='float-central'>
          <i className='fas fa-exclamation-triangle text-warning'></i> All transactions have been loaded.
        </h6> :
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
      <a style={styles} href='#' className='btn btn-sm btn-secondary float-right' name='moreAccounts' onClick={loadMore}>
        {loadingMore ? <div><i className='fa fa-spinner fa-spin'></i> Please wait..</div> : 'View More Journals'}
      </a>
    </div>
  )
}

export default Footer;