import React, {useState} from 'react';
import Table from './Table';
import DateRange from './DateRange';

const SubAccounts = () => {
    const [subaccounts, setSubAccounts] = useState([])
    const [selectedSubAccID, setSelectedSubAccID] = useState(null)
    const [params, setParams] = useState(null);
    
    return (
        <>
            <DateRange 
                setSubAccounts={setSubAccounts}
                setParams={setParams}
            />
            <Table 
                subaccounts={subaccounts}
                selectedSubAccID={selectedSubAccID}
                setSelectedSubAccID={setSelectedSubAccID}
            />
        </>
    )
}

export default SubAccounts;