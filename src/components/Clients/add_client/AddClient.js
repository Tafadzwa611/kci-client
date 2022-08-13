import React, { useState } from 'react';
import Individual from './individual/Individual';
import Company from './company/Company';

const AddClient = () => {

    const [clientType, setClientType] = useState('individual');

    return (
        <>
            {(clientType==='individual') ? <Individual clientType={clientType} setClientType={setClientType}/> : <Company clientType={clientType} setClientType={setClientType}/>}
        </>
    )
}

export default AddClient;