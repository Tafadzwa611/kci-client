import React from 'react';
import Filter from './Filter';
import ReportList from './ReportList';

function BatchApproval() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0
      }}
    >
      <Filter />
      <div style={{ paddingTop: '17px' }}></div>

      <div
        className='row'
        style={{
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          margin: 0
        }}
      >
        <div
          className='col-12'
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            paddingLeft: 0,
            paddingRight: 0
          }}
        >
          <ReportList />
        </div>
      </div>
    </div>
  );
}

export default BatchApproval;