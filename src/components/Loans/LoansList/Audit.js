import React from 'react';
import { Fetcher } from '../../../common';

function Audit({loanId}) {
  return (
    <Fetcher urls={[`/loansapi/loan_audit/${loanId}/`]}>
      {({data}) => (
        data[0].map(log => (
          <div key={log.id}  style={{marginBottom:'1rem'}}>
            <div className='bloc-tabs'>User: {log.user}</div>
            <div className='bloc-tabs'>Timestamp: {log.timestamp}</div>
            <div className='bloc-tabs'>Action Type: {log.action_type}</div>
          </div>
        ))
      )}
    </Fetcher>
  )
}

export default Audit;