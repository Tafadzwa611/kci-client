import React, {useState} from 'react';
import Filter from './Filter';
import DebtorsListTable from './DebtorsListTable';
import Summary from './Summary';

function DebtorsList() {
    const [params, setParams] = useState(null);
    const [report, setReport] = useState(null);

    return (
        <div>
            <Filter setReport={setReport} setParams={setParams}/>
            {report && (
                <div className='tab-content font-12' style={{marginTop: '3rem'}}>
                    {report ? (
                        <DebtorsListTable report={report} setReport={setReport} params={params}/>
                    ) : (
                        <Summary report={report}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default DebtorsList;