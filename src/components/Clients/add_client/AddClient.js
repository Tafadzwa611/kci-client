import React, { useState } from 'react';
import Individual from './individual/Individual';
import Company from './company/Company';

const AddClient = () => {

    const [clientType, setClientType] = useState('individual');

    return (
        <div className="card">
            <div className="card-body">
                <div className="row" style={{margin:"0 0 20px"}}>
                    <label className="form-label"></label>
                    <label className="form-title">[ Add Client ]</label>
                </div>
                {(clientType==='individual') ? <Individual clientType={clientType} setClientType={setClientType}/> : <Company clientType={clientType} setClientType={setClientType}/>}
            </div>
        </div>
    )
}

export default AddClient;