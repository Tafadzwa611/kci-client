import React, {useState} from 'react';
import Filter from './Filter';
import DebtorsListTable from './DebtorsListTable';

function DebtorsList() {
    const [params, setParams] = useState(null);
    const [report, setReport] = useState(null);

    return (
        <div>
            <Filter setReport={setReport} setParams={setParams}/>
            {report && (
                <div className='tab-content font-12' style={{marginTop: '3rem'}}>
                    <DebtorsListTable report={report} setReport={setReport} params={params}/>
                </div>
            )}
        </div>
    )
}

export default DebtorsList;