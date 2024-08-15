import React from 'react';
import Filter from './Filter';
import ReportList from './ReportList';

function BatchApproval() {
  return (
    <div>
      <Filter/>
      <div style={{paddingTop: '17px'}}></div>
      <div className='row'>
        <div className='col-12'>
          <ReportList />
        </div>
      </div>
    </div>
  )
}

export default BatchApproval;