import React, {useState} from 'react';
import Filter from './Filter';
import TrialBalanceTable from './TrialBalanceTable';

function TrialBalance({loggedInUser}) {
    const [params, setParams] = useState(null);
    const [trialBalanceData, setTrialBalanceData] = useState(null);
    const [intValues, setIntValues] = useState([])

    return (
        <>
            <Filter setTrialBalanceData={setTrialBalanceData} setParams={setParams} setIntValues={setIntValues}/>
            <div style={{paddingTop: '2rem'}}></div>
            {trialBalanceData &&
                <TrialBalanceTable
                    trialBalance={trialBalanceData} 
                    loggedInUser={loggedInUser}
                    intValues={intValues}
                />
            }
        </>
    )
}

export default TrialBalance;