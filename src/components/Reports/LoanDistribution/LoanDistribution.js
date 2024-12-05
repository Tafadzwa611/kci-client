import React, {useState} from 'react';
import Filter from './Filter';

const LoanDistribution = () => {
    const [report, setReport] = useState(null);

    return (
        <div>
            <Filter setReport={setReport}/>
        </div>
    )
}

export default LoanDistribution;