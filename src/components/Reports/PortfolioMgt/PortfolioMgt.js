import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';

const PortfolioMgt = () => {
    const [report, setReport] = useState(null);

    return (
        <div>
            <Filter setReport={setReport}/>
            {report && <Table report={report}/>}
        </div>
    )
}

export default PortfolioMgt;