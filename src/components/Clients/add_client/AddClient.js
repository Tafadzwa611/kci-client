import React, { useState } from 'react';
import Individual from './individual/Individual';
import Company from './company/Company';

const AddClient = ({setMainTab}) => {
  const [clientType, setClientType] = useState('individual');

  return (
    <>
      {(clientType==='individual') ?
        <Individual clientType={clientType} setClientType={setClientType} setMainTab={setMainTab}/> :
        <Company clientType={clientType} setClientType={setClientType} setMainTab={setMainTab}/>
      }
    </>
  )
}

export default AddClient;