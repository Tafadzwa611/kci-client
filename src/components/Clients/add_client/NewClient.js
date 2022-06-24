
import React from 'react';

const NewClient =({clientType, setClientType, setTab}) => {

    return (

        <div className="text-light">
            <div className="row">
                <div className="radio">
                    <label className="form-label"><b>Client Type</b></label>
                </div>
                <div className="radio-container font-13" style={{rowGap:"20px"}}>
                    <label><input type='radio' name='client_type' value='individual' checked={clientType==='individual'} onChange={(e) => setClientType(e.target.value)}/> Individual</label>
                    <label><input type='radio' name='client_type' value='corporate' checked={clientType==='corporate'} onChange={(e) => setClientType(e.target.value)}/> Company/Co-operative </label>
                </div>
            </div>

            <div className="load-more-container">
                <label className="form-label"></label>
                {clientType==='individual' ? <button onClick={e => setTab('info')} type='button' className='btn btn-info'>Next</button>:
                <button onClick={e => setTab('cinfo')} type='button' className='btn btn-info'>Next</button>}
            </div>

        </div>
    )
}

export default NewClient;