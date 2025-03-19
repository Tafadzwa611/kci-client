import React, { useState } from 'react';
import Filter from './Filter';
import LoansGrantedTable from './LoansGrantedTable';
import LoansGrantedSummaryTable from './LoansGrantedSummaryTable';

function LoansGranted() {
    const [params, setParams] = useState(null);
    const [report, setReport] = useState(null);

    return (
        <div>
            <Filter setReport={setReport} setParams={setParams}/>
            {report && (
                <div className='tab-content font-12' style={{marginTop: '3rem'}}>
                    {report.level === 'Detailed' ? (
                        <LoansGrantedTable report={report} setReport={setReport} params={params}/>
                    ) : (
                        <LoansGrantedSummaryTable report={report} setReport={setReport} params={params}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default LoansGranted;