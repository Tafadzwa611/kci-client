import React, {useState} from 'react';
import Filter from './Filter';
import Display from './Display';

function BalanceSheet({loggedInUser}) {
    const [params, setParams] = useState(null);
    const [balanceSheetData, setbalanceSheetData] = useState(null);
    const [intValues, setIntValues] = useState([])

    return (
        <>
            <Filter setbalanceSheetData={setbalanceSheetData} setParams={setParams} setIntValues={setIntValues}/>
            <div style={{paddingTop: '2rem'}}></div>
            {balanceSheetData &&
                <Display
                    report={balanceSheetData} 
                    loggedInUser={loggedInUser}
                    intValues={intValues}
                    currencyIso={balanceSheetData.currency}
                />
            }
        </>
    )
}

export default BalanceSheet;