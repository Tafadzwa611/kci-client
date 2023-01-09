import React from 'react';

function TableHeader({numberOfTxnsLoaded, totalTxnCount}) {
  return (
      <div className='row' style={{justifyContent:"flex-end", marginBottom:"1rem"}}>
        <div>
          Showing {numberOfTxnsLoaded} of {totalTxnCount} transactions.<br/>
        </div>
      </div>
  )
}

export default TableHeader;